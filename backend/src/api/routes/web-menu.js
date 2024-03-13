import express from "express"
import multer from "multer"
import fs from "fs"
import serveIndex from "serve-index"
import "reflect-metadata"
import path from "path"
// import slugify from'slugify'
import { getFileExtensionFromMimeType, validateImageFile } from "../../fn.js"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"

class WebMenuRouter extends AuthenticatedRouter {
  datasource = null
  mWebMenu = null
  router = null
  uploader = null
  logger = null
  //thumbnailDir = null
  constructor(datasource, appConfig, logger) {
    super(datasource, appConfig, logger)
    this.appConfig = appConfig
    this.logger = logger
    this.mWebMenu = datasource.factory("MWebMenu", true)
    this.router = express.Router()
    // this.thumbnailDir = appConfig.get("module.thumbnailDir")
    // this.uploader = multer({
    //   dest: this.thumbnailDir,
    // })
    this.initRouter()
  }
  // validateImageFile(fieldname, files) {
  //     let errors = validateImageFile(fieldname, files, this.logger, 4)
  //     return errors
  //   }
  // async getState(req, res) {
  //     let { limit, page } = req.query
  //     page = parseInt(page) || null
  //     const results = await this.mYtUpload.getState(limit, page)
  //     return res.send(results)
  //   }
  getRouter() {
    return this.router
  }
  async getList(req, res) {
    const { page, limit, order_by, order_dir } = req.query
    const results = await this.mWebMenu.getList(page, limit, order_by, order_dir)
    return res.send(results)
  }
  async get(req, res) {
    // Route logic for handling GET '/web-menu/:id'
    let id = req.params.id
    const webmenu = await this.mWebMenu.getByPk(id)
    return res.send({ data: webmenu })
  }

  async create(req, res) {
    // Route logic for handling POST '/web-menu/create'
    const validationErrors = validationResult(req)
    const [file] = req.files
    // console.log(req.files)
    let errorThumbnails = [] // this.validateImageFile("thumbnail", req.files)
    let errorValidations = validationErrors.array()
    const errors = [...errorValidations, ...errorThumbnails]
    if (errors.length > 0) {
      // in every situation, only this part of code is going to be executed
      return res.status(422).json({ errors })
    }
    /*
        if (file) {
            const ext = getFileExtensionFromMimeType(file.mimetype)
            const baseName = path.basename(file.path)
            thumbnail = `${baseName}.${ext}`
            const oldFilePath = file.path
            const newFilePath = `${this.thumbnailDir}/${thumbnail}`
            fs.rename(oldFilePath, newFilePath, (err) => {
              if (err) {
                this.logger.info("Error renaming file:", err)
              } else {
                this.logger.info("File renamed successfully!")
              }
            })
          }
      
        */
    let { title, slug, link, target, parent } = req.body
    try {
      const webmenu = await this.mWebMenu.create(title, slug, link, target, parent)
      return res.send({ data: webmenu })
    } catch (e) {
      return res.send({ data: e.toString() })
    }
  }

  async update(req, res) {
    // Route logic for handling POST '/web-menu/update'
    const validationErrors = validationResult(req)

    let errors = validationErrors.array()

    /*const [file] = req.files
        // console.log(req.files)
        if (file) {
          let errorThumbnails = this.validateImageFile("thumbnail", req.files)
          errors = [...errors, ...errorThumbnails]
        }
        */
    // errors = [...errors,...]
    if (errors.length > 0) {
      // in every situation, only this part of code is going to be executed
      return res.status(422).json({ errors })
    }
    let id
    if (req.body.id) {
      id = req.body.id
    }
    if (!id) {
      id = req.params.id
    }
    const existingRec = await this.mWebMenu.getByPk(id)
    if (existingRec) {
      /*
        this.logger.info(req.files)
        const [file] = req.files
        let { thumbnail } = existingRec
        let fileUpdated = false
        if (file) {
            fileUpdated = true
            const ext = getFileExtensionFromMimeType(file.mimetype)
            const baseName = path.basename(file.path)
            const oldThumbnail = existingRec.thumbnail
            thumbnail = `${baseName}.${ext}`
            const oldFilePath = file.path
            const newFilePath = `${this.thumbnailDir}/${thumbnail}`
            fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
                this.logger.info("Error renaming file:", err)
            } else {
                this.logger.info("File renamed successfully!")
                const oldThumbnailPath = `${this.thumbnailDir}/${oldThumbnail}`

                fs.unlink(oldThumbnailPath, (err) => {
                if (err) {
                    this.logger.info("Error deleting file:", err)
                } else {
                    this.logger.info("File deleted successfully!")
                }
                })
            }
            })
        */
      const { title, slug, link, target, parent } = req.body
      const updatedData = { title, slug, link, target, parent }

      const webmenu = await this.mWebMenu.update(id, updatedData)
      return res.send({ data: webmenu, message: "Record updated", success: true })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  async delete(req, res) {
    // Route logic for handling POST '/web-menu/delete'
    let id
    if (req.body.id) {
      id = req.body.id
    }
    if (!id) {
      id = req.params.id
    }

    console.log(id)
    const existingRec = await this.mWebMenu.getByPk(id)

    // this.logger.info(id)
    if (existingRec) {
      const webmenu = await this.mWebMenu.delete(id)
      const oldThumbnailPath = `${this.thumbnailDir}/${existingRec.thumbnail}`

      fs.unlink(oldThumbnailPath, (err) => {
        if (err) {
          this.logger.info("Error deleting file:", err)
        } else {
          this.logger.info("File deleted successfully!")
        }
      })
      return res.send({ data: webmenu, success: true, message: "Record deleted" })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  initRouter() {
    /*
        const staticPath = path.join(this.appConfig.get("basepath"), this.thumbnailDir)

        this.router.use("/web-menus/thumbnails", express.static(staticPath)) // Serve static files
        this.router.use("/web-menus/thumbnails", serveIndex(staticPath, { icons: true }))
        */
    this.router.get(
      "/web-menus",
      async (req, res, next) => {
        this.authenticateToken(req, res, next)
      },
      async (req, res) => await this.getList(req, res)
    )
    /*
        this.router.get(
            "web-menus",
            async (req, res, next) => {
              this.authenticateToken(req, res, next)
            },
            async (req, res) => await this.getState(req, res)
          )
        */
    this.router.get(
      "/web-menu/:id",
      async (req, res, next) => {
        this.authenticateToken(req, res, next)
      },
      async (req, res) => await this.get(req, res)
    )
    this.router.post(
      "/web-menu/create",
      async (req, res, next) => {
        this.authenticateToken(req, res, next)
      },
      /*this.uploader.array("thumbnail"),
          // formValidation
          check("title", "title field is required").not().isEmpty(),
          check("description", "description field is required").not().isEmpty(),
          */
      async (req, res) => await this.create(req, res)
    )
    this.router.post(
      "/web-menu/update/:id?",
      async (req, res, next) => {
        this.authenticateToken(req, res, next)
      },
      /*this.uploader.array("thumbnail"),
          // formValidation
          check("title", "title field is required").not().isEmpty(),
          check("description", "description field is required").not().isEmpty(),
          */
      async (req, res) => await this.update(req, res)
    )
    this.router.post(
      "/web-menu/delete/:id?",
      async (req, res, next) => {
        this.authenticateToken(req, res, next)
      },
      async (req, res) => await this.delete(req, res)
    )
  }
}

export default WebMenuRouter
