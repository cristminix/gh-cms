import express from "express"
import { generateAccessToken } from "../../fn.js"
import fs from "fs"
import multer from "multer"
import serveIndex from "serve-index"
import "reflect-metadata"
import path from "path"
class ConfigRouter {
  datasource = null
  mUser = null
  router = null
  appConfig = null
  logger = null
  multer = null
  constructor(datasource, appConfig, logger) {
    this.datasource = datasource
    this.appConfig = appConfig
    this.logger = logger
    this.multer = multer()
    this.router = express.Router()
    this.initRouter()
  }
  getRouter() {
    return this.router
  }

  async saveMenu(req, res) {
    let { menus } = req.body
    const menuPath = path.resolve("../frontend/src/cp/global/installer/data/side-menu.json")
    // console.log(fs.existsSync(menuPath))
    try {
      const realMenu = JSON.parse(menus)
      fs.writeFileSync(menuPath, JSON.stringify(realMenu, null, 2))
      return res.send({ menus: realMenu })
    } catch (err) {
      return res.send({ error: err.toString() })
    }
    // return res.send({ error: true })
  }

  initRouter() {
    // console.log("initRouter")
    const staticPath = path.join(this.appConfig.get("basepath"), "storage")
    this.router.use("/config/storage", express.static(staticPath)) // Serve static files
    this.router.use("/config/storage", serveIndex(staticPath, { icons: true }))

    this.router.post("/config/saveMenu", this.multer.none(), async (req, res) => await this.saveMenu(req, res))
  }
}

export default ConfigRouter
