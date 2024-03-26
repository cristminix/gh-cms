import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"

class CmsUserGroupRouter extends AuthenticatedRouter {
  datasource = null
  mCmsUserGroup = null
  router = null
  uploader = null
  logger = null

  constructor(datasource, appConfig, logger) {
    super(datasource, appConfig, logger)
    this.appConfig = appConfig
    this.logger = logger
    this.mCmsUserGroup = datasource.factory("MCmsUserGroup", true)
    this.router = express.Router()
    this.uploader = multer()

    this.initRouter()
  }

  async getState(req, res) {
    let { limit, page } = req.query
    page = parseInt(page) || null
    const results = await this.mCmsUserGroup.getState(limit, page)
    return res.send(results)
  }
  async getList(req, res) {
    const { page, limit, order_by, order_dir } = req.query
    const results = await this.mCmsUserGroup.getList(page, limit, order_by, order_dir)
    return res.send(results)
  }

  /* Route logic for handling GET /cms-user-group/:id */
  async get(req, res) {
    let id = req.params.id
    const cmsusergroup = await this.mCmsUserGroup.getByPk(id)
    return res.send({
      data: cmsusergroup,
    })
  }
  /* Route logic for handling POST /cms-user-group/create */
  async create(req, res) {
    const validationErrors = validationResult(req)
    let errorValidations = validationErrors.array()
    const errors = [...errorValidations]
    if (errors.length > 0) {
      return res.status(422).json({ errors })
    }

    let { name, slug, description, privileges } = req.body
    try {
      const cmsusergroup = await this.mCmsUserGroup.create(name, slug, description, privileges)
      return res.send({ data: cmsusergroup })
    } catch (e) {
      return res.send({ data: e.toString() })
    }
  }
  /* Route logic for handling POST '/cms-user-group/update */
  async update(req, res) {
    const validationErrors = validationResult(req)
    let errorValidations = validationErrors.array()
    const errors = [...errorValidations]
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
    const existingRec = await this.mCmsUserGroup.getByPk(id)
    if (existingRec) {
      const { name, slug, description, privileges } = req.body
      const updatedData = { name, slug, description, privileges }
      const cmsusergroup = await this.mCmsUserGroup.update(id, updatedData)
      return res.send({ data: cmsusergroup, message: "Record updated", success: true })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  /* Route logic for handling POST '/cms-user-group/delete */
  async delete(req, res) {
    let id = null
    if (req.body.id) {
      id = req.body.id
    }
    if (!id) {
      id = req.params.id
    }

    const existingRec = await this.mCmsUserGroup.getByPk(id)

    if (existingRec) {
      const cmsusergroup = await this.mCmsUserGroup.delete(id)
      return res.send({ data: cmsusergroup, success: true, message: "Record deleted" })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  async getDropdown(req, res) {
    const results = await this.mCmsUserGroup.getList(1, 100, "name", "asc")
    // console.log(results)
    if (Array.isArray(results.records)) {
      const data = results.records.map((item) => {
        return {
          text: item.name,
          value: item.id,
        }
      })
      return res.send({ data })
    }
    return res.send({ data: [] })
  }
  initRouter() {
    this.router.get(
      "/cms-user-groups",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getList(req, res),
    )
    this.router.get("/cms-user-group/dropdown", (req, res) => this.getDropdown(req, res))

    this.router.get(
      "/cms-user-group/states",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getState(req, res),
    )

    this.router.get(
      "/cms-user-group/:id",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.get(req, res),
    )

    this.router.post(
      "/cms-user-group/create",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.none(),

      check("name", "name is required").not().isEmpty(),
      check("slug", "slug is required").not().isEmpty(),
      (req, res) => this.create(req, res),
    )

    this.router.put(
      "/cms-user-group/update/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.none(),

      check("name", "name is required").not().isEmpty(),
      check("slug", "slug is required").not().isEmpty(),
      (req, res) => this.update(req, res),
    )

    this.router.delete(
      "/cms-user-group/delete/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.delete(req, res),
    )
  }
  getRouter() {
    return this.router
  }
}

export default CmsUserGroupRouter
