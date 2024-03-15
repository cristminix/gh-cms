import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import serveIndex from "serve-index"
import "reflect-metadata"
import { getFileExtensionFromMimeType, validateImageFile } from "../../fn.js"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"

class WebPagesRouter extends AuthenticatedRouter {
  datasource = null
  mWebPages = null
  router = null
  uploader = null
  logger = null
  previewImageDir = null

  constructor(datasource, appConfig, logger) {
    super(datasource, appConfig, logger)
    this.appConfig = appConfig
    this.logger = logger
    this.mWebPages = datasource.factory("MWebPages", true)
    this.router = express.Router()
    this.previewImageDir = ""
    this.uploader = multer({
      dest: this.previewImageDir,
    })

    this.initRouter()
  }
  validateImageFile(fieldname, files) {
    let errors = validateImageFile(fieldname, files, this.logger, 4)
    return errors
  }

  async getState(req, res) {
    let { limit, page } = req.query
    page = parseInt(page) || null
    const results = await this.mWebPages.getState(limit, page)
    return res.send(results)
  }
  async getList(req, res) {
    const { page, limit, order_by, order_dir } = req.query
    const results = await this.mWebPages.getList(page, limit, order_by, order_dir)
    return res.send(results)
  }

  /* Route logic for handling GET /web-pages/:id */
  async get(req, res) {
    let id = req.params.id
    const webpages = await this.mWebPages.getByPk(id)
    return res.send({
      row: webpages,
    })
  }
  /* Route logic for handling POST /web-pages/create */
  async create(req, res) {
    const [file] = req.files
    let previewImage = null

    const validationErrors = validationResult(req)
    let error_previewImages = this.validateImageFile("previewImage", req.files)
    let errorValidations = validationErrors.array()
    const errors = [...errorValidations, ...error_previewImages]
    if (errors.length > 0) {
      return res.status(422).json({ errors })
    }

    if (file) {
      const ext = getFileExtensionFromMimeType(file.mimetype)
      const baseName = path.basename(file.path)
      previewImage = `${baseName}.${ext}`
      const oldFilePath = file.path
      const newFilePath = `${this.previewImageDir}/${previewImage}`
      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
          this.logger.info("Error renaming file:", err)
        } else {
          this.logger.info("File renamed successfully!")
        }
      })
    }

    let {
      templateId,
      title,
      description,
      authors,
      content,
      kind,
      status,
      visibility,
      dateCreated,
      dateUpdated,
      datePublished,
    } = req.body
    try {
      const webpages = await this.mWebPages.create(
        templateId,
        title,
        description,
        authors,
        content,
        kind,
        status,
        visibility,
        dateCreated,
        dateUpdated,
        datePublished,
        previewImage
      )
      return res.send({ data: webpages })
    } catch (e) {
      return res.send({ data: e.toString() })
    }
  }
  /* Route logic for handling POST '/web-pages/update */
  async update(req, res) {
    const [file] = req.files
    let previewImage = null

    const validationErrors = validationResult(req)
    let error_previewImages = this.validateImageFile("previewImage", req.files)
    let errorValidations = validationErrors.array()
    const errors = [...errorValidations, ...error_previewImages]
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
    const existingRec = await this.mWebPages.getByPk(id)
    if (existingRec) {
      previewImage = existingRec.previewImage
      let fileUpdated = false
      if (file) {
        fileUpdated = true
        const ext = getFileExtensionFromMimeType(file.mimetype)
        const baseName = path.basename(file.path)
        const old_previewImage = existingRec.previewImage
        previewImage = `${baseName}.${ext}`
        const oldFilePath = file.path
        const newFilePath = `${this.previewImageDir}/${previewImage}`
        fs.rename(oldFilePath, newFilePath, (err) => {
          if (err) {
            this.logger.info("Error renaming file:", err)
          } else {
            this.logger.info("File renamed successfully!")
            const old_previewImagePath = `${thispreviewImageDir}/${old_previewImage}`

            fs.unlink(old_previewImagePath, (err) => {
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
        templateId,
        title,
        description,
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
        templateId,
        title,
        description,
        authors,
        content,
        kind,
        status,
        visibility,
        dateCreated,
        dateUpdated,
        datePublished,
      }
      if (fileUpdated) {
        updatedData.previewImage = previewImage
      }
      const webpages = await this.mWebPages.update(id, updatedData)
      return res.send({ data: webpages, message: "Record updated", success: true })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  /* Route logic for handling POST '/web-pages/delete */
  async delete(req, res) {
    let id = null
    if (req.body.id) {
      id = req.body.id
    }
    if (!id) {
      id = req.params.id
    }

    const existingRec = await this.mWebPages.getByPk(id)

    if (existingRec) {
      const webpages = await this.mWebPages.delete(id)

      const old_previewImage = `${this.previewImageDir}/${existingRec.previewImage}`

      fs.unlink(old_previewImage, (err) => {
        if (err) {
          this.logger.info("Error deleting file:", err)
        } else {
          this.logger.info("File deleted successfully!")
        }
      })
      return res.send({ data: webpages, success: true, message: "Record deleted" })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  initRouter() {
    // const staticPath = path.join(this.appConfig.get("basepath"), '')
    // this.router.use("/", express.static(staticPath))
    // this.router.use("/", serveIndex(staticPath, { icons: true }) )

    this.router.get(
      "/web-pagess",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getList(req, res)
    )

    this.router.get(
      "web-pages/states",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getState(req, res)
    )

    this.router.get(
      "/web-pages/:id",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.get(req, res)
    )

    this.router.post(
      "/web-pages/create",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.array("previewImage"),

      check("templateId", "templateId is required").not().isEmpty(),
      check("title", "title is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
      check("authors", "authors is required").not().isEmpty(),
      check("content", "content is required").not().isEmpty(),
      check("kind", "kind is required").not().isEmpty(),
      check("status", "status is required").not().isEmpty(),
      check("visibility", "visibility is required").not().isEmpty(),
      check("dateCreated", "dateCreated is required").not().isEmpty(),
      check("dateUpdated", "dateUpdated is required").not().isEmpty(),
      check("datePublished", "datePublished is required").not().isEmpty(),
      (req, res) => this.create(req, res)
    )

    this.router.put(
      "/web-pages/update/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.array("previewImage"),

      check("templateId", "templateId is required").not().isEmpty(),
      check("title", "title is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
      check("authors", "authors is required").not().isEmpty(),
      check("content", "content is required").not().isEmpty(),
      check("kind", "kind is required").not().isEmpty(),
      check("status", "status is required").not().isEmpty(),
      check("visibility", "visibility is required").not().isEmpty(),
      check("dateCreated", "dateCreated is required").not().isEmpty(),
      check("dateUpdated", "dateUpdated is required").not().isEmpty(),
      check("datePublished", "datePublished is required").not().isEmpty(),
      (req, res) => this.update(req, res)
    )

    this.router.delete(
      "/web-pages/delete/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.delete(req, res)
    )
  }
  getRouter() {
    return this.router
  }
}

export default WebPagesRouter
