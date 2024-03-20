import express from "express"
import fs from "fs"
import serveIndex from "serve-index"
import "reflect-metadata"
import path from "path"
import { createEnvironment, createFilesystemLoader, createFilter, createFunction } from "twing"
import { camelToSnake, snakeToCamel, slugify, twigAddFilter, twigAddFunction } from "../libs/utils.js"

class WebRouter {
  datasource = null
  mUser = null
  router = null
  appConfig = null
  logger = null
  mWebMenu = null
  mWebSiteSetting = null
  mWebCompany = null
  constructor(datasource, appConfig, logger) {
    this.datasource = datasource
    this.appConfig = appConfig
    this.router = express.Router()
    this.mWebMenu = datasource.factory("MWebMenu", true)
    this.mWebSiteSetting = datasource.factory("MWebSiteSetting", true)
    this.mWebCompany = datasource.factory("MWebCompany", true)
    this.initRouter()
  }
  getRouter() {
    return this.router
  }
  getData() {
    return "Hello Cruel world"
  }
  async homepage(req, res) {
    const { template } = req.params
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
      }
      let loader = createFilesystemLoader(fs)
      loader.addPath("./themes/default/templates/")
      loader.addPath(`./themes/${websiteSetting.theme}/templates/`)
      let environment = createEnvironment(loader)
      twigAddFilter(environment, "slugify", slugify)

      twigAddFunction(
        environment,
        "web_menu_get_list",
        (limit, page) => this.mWebMenu.getList(limit, page),
        ["limit", "page"],
        true
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
              if (rgxThemeUrl.test(company[key])) {
                company[key] = company[key].replace(rgxThemeUrl, `/themes/${websiteSetting.theme}`)
              }
            }
          })
          return company
        },
        [],
        true
      )
      twigAddFunction(environment, "page_title", (title) => (page.title = title), ["title"])
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
    this.router.use("/themes", express.static(staticPath)) // Serve static files
    this.router.use("/themes", serveIndex(staticPath, { icons: true }))

    this.router.get("/:template?", async (req, res) => await this.homepage(req, res))
  }
}

export default WebRouter
