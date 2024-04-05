import express from "express"
import fs from "fs"
import serveIndex from "serve-index"
import "reflect-metadata"
import path from "path"
import { createEnvironment, createFilesystemLoader, createFilter, createFunction } from "twing"
import { camelToSnake, snakeToCamel, slugify, twigAddFilter, twigAddFunction } from "../libs/utils.js"
import { crc32 } from "crc"
import blocksToHtml from "editorjs-render"
import { readingTime } from "../../lib/shared/fn.js"
import TimeAgo from "javascript-time-ago"
import id from "javascript-time-ago/locale/id" //with { type: "json" }

TimeAgo.addDefaultLocale(id)

class WebRouter {
  datasource = null
  mUser = null
  router = null
  appConfig = null
  logger = null
  mWebMenu = null
  mWebSiteSetting = null
  mWebCompany = null
  mWebContactPerson = null
  mWebTemplate = null
  mWebTemplateBlock = null
  mWebSectionBlock = null
  mWebBlock = null
  mWebBlockFeature = null
  mWebPage = null
  constructor(datasource, appConfig, logger) {
    this.datasource = datasource
    this.appConfig = appConfig
    this.router = express.Router()
    this.mWebMenu = datasource.factory("MWebMenu", true)
    this.mWebSiteSetting = datasource.factory("MWebSiteSetting", true)
    this.mWebCompany = datasource.factory("MWebCompany", true)
    this.mWebContactPerson = datasource.factory("MWebContactPerson", true)
    this.mWebTemplate = datasource.factory("MWebTemplate", true)
    this.mWebTemplateBlock = datasource.factory("MWebTemplateBlock", true)
    this.mWebSectionBlock = datasource.factory("MWebSectionBlock", true)
    this.mWebBlock = datasource.factory("MWebBlock", true)
    this.mWebBlockFeature = datasource.factory("MWebBlockFeature", true)
    this.mWebPage = datasource.factory("MWebPage", true)

    this.initRouter()
  }
  getRouter() {
    return this.router
  }
  getData() {
    return "Hello Cruel world"
  }
  async setImportAttributes(req, res) {
    // const { path } = req.params
    const { key, value, path, target } = req.query
    const importAttributesJsonPath = this.appConfig.get("importAttributesJsonPath")
    let json = {}
    let jsonStr = ""
    if (fs.existsSync(importAttributesJsonPath)) {
      jsonStr = fs.readFileSync(importAttributesJsonPath)
      // try {
      //   json = JSON.parse(jsonStr)
      // } catch (e) {}
    }
    json[path] = {
      [key]: value,
      target,
    }
    let fileCrc = crc32(jsonStr).toString(16)
    const newJsonStr = JSON.stringify(json)
    const bufferCrc = crc32(newJsonStr).toString(16)
    let continueWriteFile = bufferCrc != fileCrc
    if (continueWriteFile) {
      fs.writeFileSync(importAttributesJsonPath, newJsonStr)
    }
    res.send({
      importAttributesJsonPath,
      json,
    })
  }
  async tplFunc(req, res) {
    const { fn } = req.params
    const { limit, page, order_by, order_dir, blockId, tplPath, slug } = req.query
    const websiteSetting = await this.mWebSiteSetting.getDefault()
    let data
    if (fn === "web_menu_get_list") {
      data = await this.mWebMenu.getList(limit, page)
    } else if (fn === "web_contact_person_get_list") {
      data = await this.mWebContactPerson.getList(limit, page, order_by, order_dir, {
        where: { siteId: websiteSetting.id },
      })
    } else if (fn === "web_get_company") {
      data = await await this.mWebCompany.getByPk(websiteSetting.companyId)
    } else if (fn === "web_block_feature_by_tpl_path") {
      const block = await this.mWebBlock.getByPath(tplPath)
      if (block) {
        data = await this.mWebBlockFeature.getList(limit, page, order_by, order_dir, {
          where: { blockId: block.id },
        })
        console.log(data)
      }
    } else if (fn === "web_page_get_list") {
      data = await await this.mWebPage.getList(limit, page, order_by, order_dir)
    } else if (fn === "web_get_page") {
      data = await await this.mWebPage.getBySlug(slug)
    }
    res.send(data)
  }
  async arrayLoader(req, res) {
    // loader.addPath("./themes/default/templates/")
    //   loader.addPath(`./themes/${websiteSetting.theme}/templates/`)
    const websiteSetting = await this.mWebSiteSetting.getDefault()

    let { template } = req.params
    if (!template) {
      template = "homepage"
    }
    const tpl = await this.mWebTemplate.getBySlug(template, true)
    const tpls = {
      [tpl.path]: fs.readFileSync(`./themes/${websiteSetting.theme}/templates/${tpl.path}`, "utf8"),
    }
    const defaultSections = {
      "html-open.twig": "",
      "html-header-open.twig": "",
      "html-meta.twig": "",
      "html-font.twig": "",
      "html-stylesheet.twig": "",
      "html-header-close.twig": "",
      "html-body-open.twig": "",
      "html-script.twig": "",
      "html-body-close.twig": "",
      "html-close.twig": "",
    }
    const tplSections = {}
    const tmpSections = await this.mWebBlock.getSectionsByTemplateId(tpl.id, true)

    tmpSections.forEach((section) => {
      tplSections[`./sections/${section.path}`] = fs.readFileSync(
        `./themes/${websiteSetting.theme}/templates/sections/${section.path}`,
        "utf8",
      )
    })

    const tplBlocks = {}
    const tmpBlocks = await this.mWebBlock.getList(tpl.id, 1, 100, "id", "asc", "block", null)
    tmpBlocks.records.forEach((block) => {
      tplBlocks[`../blocks/${block.path}`] = fs.readFileSync(
        `./themes/${websiteSetting.theme}/templates/blocks/${block.path}`,
        "utf8",
      )
    })
    return res.send({
      tpls: { ...tpls, ...defaultSections, ...tplSections, ...tplBlocks },
    })
  }
  async homepage(req, res, defaultTemplate) {
    let { template, block, slug } = req.params
    if (defaultTemplate) {
      template = defaultTemplate
    }
    // PREPARE SITE DATA
    const websiteSetting = await this.mWebSiteSetting.getDefault()
    const page = {
      title: "",
      meta: {
        description: "This is a simple website.",
        author: "Author",
        keywords: "keyword1, keyword2",
      },
    }

    if (websiteSetting) {
      console.log(websiteSetting)
      const siteData = {
        setting: websiteSetting,
        page,
        slug,
      }
      let loader = createFilesystemLoader(fs)
      loader.addPath("./themes/default/templates/")
      loader.addPath(`./themes/${websiteSetting.theme}/templates/`)
      loader.addPath(`./themes/${websiteSetting.theme}/templates/sections/`)
      loader.addPath(`./themes/${websiteSetting.theme}/templates/blocks/`)
      let environment = createEnvironment(loader)
      twigAddFilter(environment, "slugify", slugify)

      twigAddFunction(
        environment,
        "web_menu_get_list",
        (limit, page) => this.mWebMenu.getList(limit, page),
        ["limit", "page"],
        true,
      )
      twigAddFunction(environment, "reading_time", (text) => readingTime(text), ["text"], false)
      twigAddFunction(
        environment,
        "time_ago",
        (text) => {
          try {
            const timeAgo = new TimeAgo("id-ID")
            return timeAgo.format(new Date(text))
          } catch (e) {
            return "n.a"
          }
        },
        ["text"],
        false,
      )
      twigAddFunction(
        environment,
        "blocks_to_html",
        (blocks) => {
          if (typeof blocks === "string") {
            try {
              blocks = JSON.parse(blocks)
              blocks = blocks.blocks
              console.log(blocks)
            } catch (e) {
              blocks = []
            }
          }
          return blocksToHtml(blocks)
        },
        ["blocks"],
        false,
      )
      twigAddFunction(environment, "web_get_page", (slug) => this.mWebPage.getBySlug(slug), ["slug"], true)
      twigAddFunction(
        environment,
        "web_page_get_list",
        (limit, page) => this.mWebPage.getList(limit, page),
        ["limit", "page"],
        true,
      )
      twigAddFunction(
        environment,
        "web_contact_person_get_list",
        (limit, page) =>
          this.mWebContactPerson.getList(limit, page, "id", "asc", {
            siteId: websiteSetting.id,
          }),
        ["limit", "page"],
        true,
      )
      twigAddFunction(
        environment,
        "web_get_company",
        async () => {
          const company = await this.mWebCompany.getByPk(websiteSetting.companyId)
          const fixUrlProps = ["logo", "logoSm", "logoMd", "logoLg", "logoXl"]
          Object.keys(company).forEach((key) => {
            if (fixUrlProps.includes(key)) {
              const rgxThemeUrl = new RegExp("{themeUrl}", "g")
              const rgxThemeUrl2 = new RegExp("{themeUrl}/", "g")
              if (rgxThemeUrl.test(company[key])) {
                company[key] = company[key].replace(rgxThemeUrl, `/themes/${websiteSetting.theme}`)
              }
              if (rgxThemeUrl2.test(company[key])) {
                company[key] = company[key].replace(rgxThemeUrl2, `/themes/${websiteSetting.theme}`)
              }
            }
          })
          return company
        },
        [],
        true,
      )
      twigAddFunction(environment, "page_title", (title) => (page.title = title), ["title"])
      twigAddFunction(
        environment,
        "dark",
        (path) => {
          const paths = path.split("/")
          paths[paths.length - 1] = `dark-${paths[paths.length - 1]}`
          return paths.join("/")
        },
        ["path"],
      )
      twigAddFunction(environment, "theme_url", (path) => `/themes/${websiteSetting.theme}/${path}`, ["url"])
      twigAddFunction(environment, "base_url", (path) => `/${path}`, ["url"])
      twigAddFunction(environment, "set_meta_description", (description) => (page.meta.description = description), [
        "description",
      ])
      twigAddFunction(environment, "set_meta_keywords", (keywords) => (page.meta.keywords = keywords), ["keywords"])

      let templatePath = `${template ? template : "homepage"}.twig`
      let activeTemplateName = templatePath
      environment
        .render(activeTemplateName, siteData)
        .then((output) => {
          res.end(output)
        })
        .catch((e) => {
          res.end(e.toString())
        })
    } else {
      res.end("No website setting found as default")
    }
  }

  initRouter() {
    const staticPath = path.join(this.appConfig.get("basepath"), "themes")
    const storagePath = path.join(this.appConfig.get("basepath"), "storage")
    this.router.use("/themes", express.static(staticPath)) // Serve static files
    this.router.use("/storage", express.static(storagePath)) // Serve static files
    this.router.use("/themes", serveIndex(staticPath, { icons: true }))
    this.router.use("/storage", serveIndex(storagePath, { icons: true }))
    this.router.get("/web/setImportAttributes", async (req, res) => await this.setImportAttributes(req, res))

    this.router.get("/web/arrayLoader/:template", async (req, res) => await this.arrayLoader(req, res))
    this.router.get("/web/tplFunc/:fn", async (req, res) => await this.tplFunc(req, res))

    this.router.get("/", async (req, res) => await this.homepage(req, res, "homepage"))
    this.router.get("/profile", async (req, res) => await this.homepage(req, res, "profile"))
    this.router.get("/berita", async (req, res) => await this.homepage(req, res, "berita"))
    this.router.get("/lembaga", async (req, res) => await this.homepage(req, res, "lembaga"))
    this.router.get("/kegiatan", async (req, res) => await this.homepage(req, res, "kegiatan"))
    this.router.get("/pendaftaran", async (req, res) => await this.homepage(req, res, "pendaftaran"))
    this.router.get("/kontak", async (req, res) => await this.homepage(req, res, "kontak"))
    this.router.get("/lihat-berita/:block/:slug?", async (req, res) => await this.homepage(req, res, "lihat-berita"))
  }
}

export default WebRouter
