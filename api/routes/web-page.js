import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import serveIndex from "serve-index"
import "reflect-metadata"
import { getFileExtensionFromMimeType, validateImageFile } from "../libs/fn.js"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"

class WebPageRouter extends AuthenticatedRouter {
  datasource = null
  mWebPage = null
  router = null
  uploader = null
  logger = null
  coverImageDir = null

  constructor(datasource, appConfig, logger) {
    super(datasource, appConfig, logger)
    this.appConfig = appConfig
    this.logger = logger
    this.mWebPage = datasource.factory("MWebPage", true)
    this.router = express.Router()
    this.coverImageDir = appConfig.get("module.coverImageDir")
    this.uploader = multer({
      dest: this.coverImageDir,
    })

    this.initRouter()
  }
  /* uploadField is not required */
  validateImageFile(fieldname, files) {
    let errors = []
    if (Array.isArray(files)) {
      if (files.length > 0) {
        errors = validateImageFile(fieldname, files, this.logger, 4)
      }
    }
    return errors
  }

  async getState(req, res) {
    let { limit, page } = req.query
    page = parseInt(page) || null
    const results = await this.mWebPage.getState(limit, page)
    return res.send(results)
  }
  async getList(req, res) {
    const { page, limit, order_by, order_dir } = req.query
    const results = await this.mWebPage.getList(page, limit, order_by, order_dir)
    return res.send(results)
  }

  /* Route logic for handling GET /web-page/:id */
  async get(req, res) {
    let id = req.params.id
    const webpage = await this.mWebPage.getByPk(id)
    return res.send({
      data: webpage,
    })
  }
  /* Route logic for handling POST /web-page/create */
  async create(req, res) {
    const [file] = req.files
    let coverImage = null

    const validationErrors = validationResult(req)
    let error_coverImages = this.validateImageFile("coverImage", req.files)
    let errorValidations = validationErrors.array()
    const errors = [...errorValidations, ...error_coverImages]
    if (errors.length > 0) {
      return res.status(422).json({ errors })
    }

    if (file) {
      const ext = getFileExtensionFromMimeType(file.mimetype)
      const baseName = path.basename(file.path)
      coverImage = `${baseName}.${ext}`
      const oldFilePath = file.path
      const newFilePath = `${this.coverImageDir}/${coverImage}`
      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
          this.logger.info("Error renaming file:", err)
        } else {
          this.logger.info("File renamed successfully!")
        }
      })
    }

    let {
      blocks,
      title,
      slug,
      description,
      authors,
      highlight,
      content,
      kind,
      status,
      visibility,
      dateCreated,
      dateUpdated,
      datePublished,
    } = req.body
    try {
      const webpage = await this.mWebPage.create(
        title,
        slug,
        description,
        authors,
        highlight,

        content,
        kind,
        status,
        visibility,
        dateCreated,
        dateUpdated,
        datePublished,
        coverImage,
        blocks,
      )
      return res.send({ data: webpage })
    } catch (e) {
      return res.send({ data: e.toString() })
    }
  }
  /* Route logic for handling POST '/web-page/update */
  async update(req, res) {
    const [file] = req.files
    let coverImage = null

    const validationErrors = validationResult(req)
    let error_coverImages = []
    if (file) {
      error_coverImages = this.validateImageFile("coverImage", req.files)
    }
    let errorValidations = validationErrors.array()
    const errors = [...errorValidations, ...error_coverImages]
    if (errors.length > 0) {
      return res.status(422).json({ errors })
    }

    let id = null
    if (req.body.id) {
      id = req.body.id
    }
    if (!id) {
      id = req.params.id
    }
    const existingRec = await this.mWebPage.getByPk(id)
    if (existingRec) {
      coverImage = existingRec.coverImage
      let fileUpdated = false
      if (file) {
        fileUpdated = true
        const ext = getFileExtensionFromMimeType(file.mimetype)
        const baseName = path.basename(file.path)
        const old_coverImage = existingRec.coverImage
        coverImage = `${baseName}.${ext}`
        const oldFilePath = file.path
        const newFilePath = `${this.coverImageDir}/${coverImage}`
        fs.rename(oldFilePath, newFilePath, (err) => {
          if (err) {
            this.logger.info("Error renaming file:", err)
          } else {
            this.logger.info("File renamed successfully!")
            const old_coverImagePath = `${this.coverImageDir}/${old_coverImage}`

            fs.unlink(old_coverImagePath, (err) => {
              if (err) {
                this.logger.info("Error deleting file:", err)
              } else {
                this.logger.info("File deleted successfully!")
              }
            })
          }
        })
      }
      const {
        blocks,
        title,
        slug,
        description,
        highlight,
        authors,
        content,
        kind,
        status,
        visibility,
        dateCreated,
        dateUpdated,
        datePublished,
      } = req.body
      const updatedData = {
        blocks,
        title,
        slug,
        description,
        authors,
        highlight,
        content,
        kind,
        status,
        visibility,
        dateCreated,
        dateUpdated,
        datePublished,
      }
      if (fileUpdated) {
        updatedData.coverImage = coverImage
      }
      const webpage = await this.mWebPage.update(id, updatedData)
      return res.send({ data: webpage, message: "Record updated", success: true })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  /* Route logic for handling POST '/web-page/delete */
  async delete(req, res) {
    let id = null
    if (req.body.id) {
      id = req.body.id
    }
    if (!id) {
      id = req.params.id
    }

    const existingRec = await this.mWebPage.getByPk(id)

    if (existingRec) {
      const webpage = await this.mWebPage.delete(id)

      const old_coverImage = `${this.coverImageDir}/${existingRec.coverImage}`

      fs.unlink(old_coverImage, (err) => {
        if (err) {
          this.logger.info("Error deleting file:", err)
        } else {
          this.logger.info("File deleted successfully!")
        }
      })
      return res.send({ data: webpage, success: true, message: "Record deleted" })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  initRouter() {
    const staticPath = path.join(this.appConfig.get("basepath"), this.coverImageDir)
    this.router.use("/web-page/covers", express.static(staticPath))
    this.router.use("/web-page/covers", serveIndex(staticPath, { icons: true }))

    this.router.get(
      "/web-pages",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getList(req, res),
    )

    this.router.get(
      "/web-page/states",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getState(req, res),
    )

    this.router.get(
      "/web-page/:id",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.get(req, res),
    )

    this.router.post(
      "/web-page/create",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.array("coverImage"),

      check("title", "Title is required").not().isEmpty(),
      check("slug", "Slug is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("authors", "Authors is required").not().isEmpty(),
      // check("content", "content is required").not().isEmpty(),
      check("kind", "Kind is required").not().isEmpty(),
      check("status", "Status is required").not().isEmpty(),
      check("visibility", "Visibility is required").not().isEmpty(),
      // check("dateCreated", "dateCreated is required").not().isEmpty(),
      // check("dateUpdated", "dateUpdated is required").not().isEmpty(),
      // check("datePublished", "datePublished is required").not().isEmpty(),
      (req, res) => this.create(req, res),
    )

    this.router.put(
      "/web-page/update/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.array("coverImage"),

      check("title", "Title is required").not().isEmpty(),
      check("slug", "Slug is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("authors", "Authors is required").not().isEmpty(),
      // check("content", "content is required").not().isEmpty(),
      check("kind", "Kind is required").not().isEmpty(),
      check("status", "Status is required").not().isEmpty(),
      check("visibility", "Visibility is required").not().isEmpty(),
      // check("dateCreated", "dateCreated is required").not().isEmpty(),
      // check("dateUpdated", "dateUpdated is required").not().isEmpty(),
      // check("datePublished", "datePublished is required").not().isEmpty(),
      (req, res) => this.update(req, res),
    )

    this.router.delete(
      "/web-page/delete/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.delete(req, res),
    )
  }
  getRouter() {
    return this.router
  }
}

export default WebPageRouter
