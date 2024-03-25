import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"

class WebBlockFeatureRouter extends AuthenticatedRouter {
  datasource = null
  mWebBlockFeature = null
  router = null
  uploader = null
  logger = null

  constructor(datasource, appConfig, logger) {
    super(datasource, appConfig, logger)
    this.appConfig = appConfig
    this.logger = logger
    this.mWebBlockFeature = datasource.factory("MWebBlockFeature", true)
    this.router = express.Router()
    this.uploader = multer()

    this.initRouter()
  }

  async getState(req, res) {
    let { limit, page } = req.query
    let { blockId } = req.params
    page = parseInt(page) || null
    const results = await this.mWebBlockFeature.getState(blockId, limit, page)
    return res.send(results)
  }
  async getList(req, res) {
    const { page, limit, order_by, order_dir, blockId } = req.query
    let filter = null
    if (blockId) {
      filter = { where: { blockId } }
    }
    const results = await this.mWebBlockFeature.getList(page, limit, order_by, order_dir, filter)
    return res.send(results)
  }

  /* Route logic for handling GET /web-block-feature/:id */
  async get(req, res) {
    let id = req.params.id
    const webblockfeature = await this.mWebBlockFeature.getByPk(id)
    return res.send({
      data: webblockfeature,
    })
  }
  /* Route logic for handling POST /web-block-feature/create */
  async create(req, res) {
    const validationErrors = validationResult(req)
    let errorValidations = validationErrors.array()
    const errors = [...errorValidations]
    if (errors.length > 0) {
      return res.status(422).json({ errors })
    }

    let { blockId, name, description, kind, content, path_, order, enabled } = req.body

    try {
      const webblockfeature = await this.mWebBlockFeature.create(
        blockId,
        name,
        description,
        kind,
        content,
        path_,
        order,
        enabled,
      )
      return res.send({ data: webblockfeature })
    } catch (e) {
      return res.send({ data: e.toString() })
    }
  }
  /* Route logic for handling POST '/web-block-feature/update */
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
    const existingRec = await this.mWebBlockFeature.getByPk(id)
    if (existingRec) {
      const { blockId, name, description, kind, content, path_, order, enabled } = req.body
      const updatedData = { blockId, name, description, kind, content, path_, order, enabled }
      const webblockfeature = await this.mWebBlockFeature.update(id, updatedData)
      return res.send({ data: webblockfeature, message: "Record updated", success: true })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  /* Route logic for handling POST '/web-block-feature/delete */
  async delete(req, res) {
    let id = null
    if (req.body.id) {
      id = req.body.id
    }
    if (!id) {
      id = req.params.id
    }

    const existingRec = await this.mWebBlockFeature.getByPk(id)

    if (existingRec) {
      const webblockfeature = await this.mWebBlockFeature.delete(id)
      return res.send({ data: webblockfeature, success: true, message: "Record deleted" })
    } else {
      return res.send({ success: false, message: "Record not found" })
    }
  }
  initRouter() {
    this.router.get(
      "/web-block-features",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getList(req, res),
    )

    this.router.get(
      "/web-block-feature/states/:blockId",
      (req, res, next) => this.authenticateToken(req, res, next),
      (req, res) => this.getState(req, res),
    )

    this.router.get(
      "/web-block-feature/:id",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.get(req, res),
    )

    this.router.post(
      "/web-block-feature/create",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.none(),

      check("blockId", "blockId is required").not().isEmpty(),
      check("name", "name is required").not().isEmpty(),
      // check("description", "description is required").not().isEmpty(),
      check("kind", "kind is required").not().isEmpty(),
      // check("content", "content is required").not().isEmpty(),
      // check("path_", "path_ is required").not().isEmpty(),
      // check("order", "order is required").not().isEmpty(),
      // check("enabled", "enabled is required").not().isEmpty(),
      (req, res) => this.create(req, res),
    )

    this.router.put(
      "/web-block-feature/update/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      this.uploader.none(),

      check("blockId", "blockId is required").not().isEmpty(),
      check("name", "name is required").not().isEmpty(),
      // check("description", "description is required").not().isEmpty(),
      check("kind", "kind is required").not().isEmpty(),
      // check("content", "content is required").not().isEmpty(),
      // check("path_", "path_ is required").not().isEmpty(),
      // check("order", "order is required").not().isEmpty(),
      // check("enabled", "enabled is required").not().isEmpty(),
      (req, res) => this.update(req, res),
    )

    this.router.delete(
      "/web-block-feature/delete/:id?",
      (req, res, next) => this.authenticateToken(req, res, next),

      (req, res) => this.delete(req, res),
    )
  }
  getRouter() {
    return this.router
  }
}

export default WebBlockFeatureRouter
