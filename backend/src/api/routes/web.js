import express from "express"
import fs from "fs"
import { createEnvironment, createFilesystemLoader } from "twing"
class ManualRouter {
  datasource = null
  mUser = null
  router = null
  appConfig = null
  logger = null
  constructor(datasource, appConfig, logger) {
    this.datasource = datasource
    this.appConfig = appConfig
    this.router = express.Router()
    this.initRouter()
  }
  getRouter() {
    return this.router
  }

  async homepage(req, res) {
    const siteData = {
      name: "This is my",
      title: "Hello World",
      description: "This is a simple website.",
      author: "Author",
      keywords: "keyword1, keyword2",
      url: "http://localhost:3000",
      image: "http://localhost:3000/images/image.jpg",
      twitter: "@author",
      content: "Main content",
    }
    let loader = createFilesystemLoader(fs)
    loader.addPath("./themes/default/templates/")
    loader.addPath("./themes/green-ponpes/templates/")
    // loader.addPath("./themes/default/green-ponpes/templates/")
    // loader.addPath("./src/cms/templates/twig/default/sections/")
    let environment = createEnvironment(loader)

    let activeTemplateName = "homepage.twig"
    environment
      .render(activeTemplateName, siteData)
      .then((output) => {
        res.end(output)
      })
      .catch((e) => {
        res.end(e.toString())
      })
  }

  initRouter() {
    this.router.get("/", async (req, res) => await this.homepage(req, res))
  }
}

export default ManualRouter
