import express from "express"
import { generateAccessToken } from "../../fn.js"
import fs from "fs"
import multer from "multer"
import serveIndex from "serve-index"
import "reflect-metadata"
import path from "path"
import WebTemplate from "../models/WebTemplate.js"
import WebTheme from "../models/WebTheme.js"
import { TemplateGenerator } from "../libs/template-generator.js"

class ConfigRouter {
  datasource = null
  mUser = null
  router = null
  appConfig = null
  logger = null
  multer = null
  mWebTemplate = null
  mWebTemplateBlock = null
  mWebSectionBlock = null
  mWebBlock = null
  generator = null
  constructor(datasource, appConfig, logger) {
    this.datasource = datasource
    this.appConfig = appConfig
    this.logger = logger
    this.multer = multer()
    this.router = express.Router()
    this.mWebTheme = datasource.factory("MWebTheme", true)
    this.mWebTemplate = datasource.factory("MWebTemplate", true)
    this.mWebBlock = datasource.factory("MWebBlock", true)
    this.mWebTemplateBlock = datasource.factory("MWebTemplateBlock", true)
    this.mWebSectionBlock = datasource.factory("MWebSectionBlock", true)
    this.generator = new TemplateGenerator(appConfig, this)

    this.initRouter()
  }
  getRouter() {
    return this.router
  }
  async getThemeDir(themeId) {
    const theme = await this.mWebTheme.get(themeId)
    if (theme) {
      return path.join(this.appConfig.get("basepath"), "src/cms/themes", theme.name)
    }
    return null
  }
  async initTargetDir(dir, filePath, content = null) {
    const basePath = this.appConfig.get("basepath")

    const tDir = path.resolve(`${basePath}/${dir}`)
    const tPath = path.resolve(`${basePath}/${filePath}`)
    if (!fs.existsSync(tDir)) {
      fs.mkdirSync(tDir, { recursive: true })
    }
    if (!fs.existsSync(tPath)) {
      fs.writeFileSync(tPath, `{# ${tPath} #}\n`)
    }
    if (content) {
      fs.writeFileSync(tPath, content)
    }
  }
  async generate(req, res) {
    let { type, pk } = req.params
    let { content } = req.body
    console.log({ type, pk })
    let output = null
    let success = false
    if (type == "template") {
      ;[output, success] = await this.generator.generateTemplate(pk)
    } else if (type == "section") {
      ;[output, success] = await this.generator.generateSection(pk)
    } else if (type == "block") {
      ;[output, success] = await this.generator.generateBlock(pk)
    }
    res.send({ success, data: output })
  }
  async saveFile(req, res) {
    let { type, pk } = req.params
    let { content } = req.body
    console.log({ type, pk })
    let record = null
    let success = false
    if (type == "template") {
      const template = await this.mWebTemplate.getByPk(pk, true)
      if (template) {
        this.initTargetDir(template.templateDir, template.templatePath, content)

        record = template
        success = true
      }
    } else if (type == "section") {
      const section = await this.mWebBlock.getByPk(pk, true, "section")
      if (section) {
        this.initTargetDir(section.sectionDir, section.sectionPath, content)
        record = section
        success = true
      }
    } else if (type == "block") {
      const block = await this.mWebBlock.getByPk(pk, true, "block")
      if (block) {
        this.initTargetDir(block.blockDir, block.blockPath, content)
        record = block
        success = true
      }
    }
    res.send({ success, data: record })
  }
  async getFile(req, res) {
    let { type, pk } = req.params
    console.log({ type, pk })
    let record = null
    let success = false
    if (type == "template") {
      const template = await this.mWebTemplate.getByPk(pk, true)
      if (template) {
        this.initTargetDir(template.templateDir, template.templatePath)
        record = template
        success = true
      }
    } else if (type == "section") {
      const section = await this.mWebBlock.getByPk(pk, true, "section")
      if (section) {
        this.initTargetDir(section.sectionDir, section.sectionPath)
        record = section
        success = true
      }
    } else if (type == "block") {
      const block = await this.mWebBlock.getByPk(pk, true, "block")
      if (block) {
        this.initTargetDir(block.blockDir, block.blockPath)
        record = block
        success = true
      }
    }
    res.send({ success, data: record })
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
    const staticPath = path.join(this.appConfig.get("basepath"), "themes")
    this.router.use("/themes", express.static(staticPath)) // Serve static files
    this.router.use("/themes", serveIndex(staticPath, { icons: true }))

    this.router.get(
      "/code-editor/getFile/:type/:pk",
      this.multer.none(),
      async (req, res) => await this.getFile(req, res)
    )

    this.router.post(
      "/code-editor/saveFile/:type/:pk",
      this.multer.none(),
      async (req, res) => await this.saveFile(req, res)
    )
    this.router.post(
      "/code-editor/generate/:type/:pk",
      this.multer.none(),
      async (req, res) => await this.generate(req, res)
    )
  }
}

export default ConfigRouter
