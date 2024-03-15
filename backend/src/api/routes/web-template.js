import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import serveIndex from "serve-index"
import "reflect-metadata"
import { getFileExtensionFromMimeType, validateImageFile } from "../../fn.js"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"

class WebTemplateRouter extends AuthenticatedRouter {
  datasource = null
  mWebTemplate = null
  router = null
  uploader = null
  logger = null
  previewImageDir = null

  constructor(datasource, appConfig, logger) {
    super(datasource, appConfig, logger)
    this.appConfig = appConfig
    this.logger = logger
    this.mWebTemplate = datasource.factory("MWebTemplate", true)
    this.router = express.Router()
    this.previewImageDir = appConfig.get("module.previewImageDir")
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
    const results = await this.mWebTemplate.getState(limit, page)
    return res.send(results)
  }
  async getList(req, res) {
    const { page, limit, order_by, order_dir } = req.query
    const results = await this.mWebTemplate.getList(page, limit, order_by, order_dir)
    return res.send(results)
  }

  /* Route logic for handling GET /web-template/:id */
  async get(req, res) {
    let id = req.params.id
    const webtemplate = await this.mWebTemplate.getByPk(id)
    return res.send({
      data: webtemplate,
    })
  }
  /* Route logic for handling POST /web-template/create */
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

    let { themeId, name, slug, description } = req.body
    const path_ = req.body.path
    try {
      const webtemplate = await this.mWebTemplate.create(themeId, name, description, slug, path_, previewImage)
      return res.send({ data: webtemplate })
    } catch (e) {
      return res.send({ data: e.toString() })
    }
  }
  /* Route logic for handling POST '/web-template/update */
  async update(req, res) {
    const [file] = req.files
    let previewImage = null

    const validationErrors = validationResult(req)
    let error_previewImages = []
    if (file) {
      error_previewImages = this.validateImageFile("previewImage", req.files)
    }
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
    const existingRec = await this.mWebTemplate.getByPk(id)
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
      const { themeId, name, slug, description } = req.body
      const path_ = req.body.path
      const updatedData = { themeId, name, slug, description }
      if (path_) {
        updatedData.path = path_
      }
      if (fileUpdated) {
        updatedData.previewImage = previewImage
      }
      const webtemplate = await this.mWebTemplate.update(id, updatedData)
      return res.send({ data: webtemplate, message: "Record updated", success: true })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  /* Route logic for handling POST '/web-template/delete */
  async delete(req, res) {
    let id = null
    if (req.body.id) {
      id = req.body.id
    }
    if (!id) {
      id = req.params.id
    }

    const existingRec = await this.mWebTemplate.getByPk(id)

    if (existingRec) {
      const webtemplate = await this.mWebTemplate.delete(id)

      const old_previewImage = `${this.previewImageDir}/${existingRec.previewImage}`

      fs.unlink(old_previewImage, (err) => {
        if (err) {
          this.logger.info("Error deleting file:", err)
        } else {
          this.logger.info("File deleted successfully!")
        }
      })
      return res.send({ data: webtemplate, success: true, message: "Record deleted" })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  initRouter() {
    const staticPath = path.join(this.appConfig.get("basepath"), this.previewImageDir)
    this.router.use("/web-template/previews", express.static(staticPath))
    this.router.use("/web-template/previews", serveIndex(staticPath, { icons: true }))

    this.router.get(
      "/web-templates",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getList(req, res)
    )

    this.router.get(
      "/web-template/states",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getState(req, res)
    )

    this.router.get(
      "/web-template/:id",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.get(req, res)
    )

    this.router.post(
      "/web-template/create",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.array("previewImage"),

      check("themeId", "themeId is required").not().isEmpty(),
      check("name", "name is required").not().isEmpty(),
      check("slug", "slug is required").not().isEmpty(),
      check("path", "path is required").not().isEmpty(),
      (req, res) => this.create(req, res)
    )

    this.router.put(
      "/web-template/update/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.array("previewImage"),

      check("themeId", "themeId is required").not().isEmpty(),
      check("name", "name is required").not().isEmpty(),
      check("slug", "slug is required").not().isEmpty(),
      check("path", "path is required").not().isEmpty(),
      (req, res) => this.update(req, res)
    )

    this.router.delete(
      "/web-template/delete/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.delete(req, res)
    )
  }
  getRouter() {
    return this.router
  }
}

export default WebTemplateRouter
