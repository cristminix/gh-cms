import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"

class WebContactPersonRouter extends AuthenticatedRouter {
  datasource = null
  mWebContactPerson = null
  router = null
  uploader = null
  logger = null

  constructor(datasource, appConfig, logger) {
    super(datasource, appConfig, logger)
    this.appConfig = appConfig
    this.logger = logger
    this.mWebContactPerson = datasource.factory("MWebContactPerson", true)
    this.router = express.Router()
    this.uploader = multer()

    this.initRouter()
  }

  async getState(req, res) {
    let { limit, page } = req.query
    page = parseInt(page) || null
    const results = await this.mWebContactPerson.getState(limit, page)
    return res.send(results)
  }
  async getList(req, res) {
    const { page, limit, order_by, order_dir } = req.query
    const results = await this.mWebContactPerson.getList(page, limit, order_by, order_dir)
    return res.send(results)
  }

  /* Route logic for handling GET /web-contact-person/:id */
  async get(req, res) {
    let id = req.params.id
    const webcontactperson = await this.mWebContactPerson.getByPk(id)
    return res.send({
      data: webcontactperson,
    })
  }
  /* Route logic for handling POST /web-contact-person/create */
  async create(req, res) {
    const validationErrors = validationResult(req)
    let errorValidations = validationErrors.array()
    const errors = [...errorValidations]
    if (errors.length > 0) {
      return res.status(422).json({ errors })
    }

    let { siteId, name, kind, contactDetail, enabled } = req.body
    try {
      const webcontactperson = await this.mWebContactPerson.create(siteId, name, kind, contactDetail, enabled)
      return res.send({ data: webcontactperson })
    } catch (e) {
      return res.send({ data: e.toString() })
    }
  }
  /* Route logic for handling POST '/web-contact-person/update */
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
    const existingRec = await this.mWebContactPerson.getByPk(id)
    if (existingRec) {
      const { siteId, name, kind, contactDetail, enabled } = req.body
      const updatedData = { siteId, name, kind, contactDetail, enabled }
      const webcontactperson = await this.mWebContactPerson.update(id, updatedData)
      return res.send({ data: webcontactperson, message: "Record updated", success: true })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  /* Route logic for handling POST '/web-contact-person/delete */
  async delete(req, res) {
    let id = null
    if (req.body.id) {
      id = req.body.id
    }
    if (!id) {
      id = req.params.id
    }

    const existingRec = await this.mWebContactPerson.getByPk(id)

    if (existingRec) {
      const webcontactperson = await this.mWebContactPerson.delete(id)
      return res.send({ data: webcontactperson, success: true, message: "Record deleted" })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  initRouter() {
    this.router.get(
      "/web-contact-persons",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getList(req, res),
    )

    this.router.get(
      "/web-contact-person/states",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getState(req, res),
    )

    this.router.get(
      "/web-contact-person/:id",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.get(req, res),
    )

    this.router.post(
      "/web-contact-person/create",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.none(),

      check("siteId", "siteId is required").not().isEmpty(),
      check("name", "name is required").not().isEmpty(),
      check("kind", "kind is required").not().isEmpty(),
      check("contactDetail", "contactDetail is required").not().isEmpty(),
      (req, res) => this.create(req, res),
    )

    this.router.put(
      "/web-contact-person/update/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.none(),

      check("siteId", "siteId is required").not().isEmpty(),
      check("name", "name is required").not().isEmpty(),
      check("kind", "kind is required").not().isEmpty(),
      check("contactDetail", "contactDetail is required").not().isEmpty(),
      (req, res) => this.update(req, res),
    )

    this.router.delete(
      "/web-contact-person/delete/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.delete(req, res),
    )
  }
  getRouter() {
    return this.router
  }
}

export default WebContactPersonRouter
