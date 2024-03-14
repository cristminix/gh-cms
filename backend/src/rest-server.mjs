#!/usr/local/bin/node
import path from "path"
import express from "express"
import http from "http"
import os from "os"
import bodyParser from "body-parser"
import fs from "fs"
import "reflect-metadata"
import cors from "cors"
import bunyan from "bunyan-sfdx-no-dtrace"
import RequestLogger from "bunyan-request-logger"
import { DS } from "./api/data-source/index.js"
import routers from "./api/routes/routers.js"
import AppConfig from "./api/AppConfig.js"
import twing from "twing"
import livereload from "livereload"
import connectLiveReload from "connect-livereload"
// console.log(twing)
const { createEnvironment, createArrayLoader, createFilesystemLoader } = twing
// import { TwingExtensionStringLoader } from 'twing-extension-string-loader'
// import TwingEnvironment from 'twing'
let BASEPATH = "."
const DEFAULT_LOG_PATH = os.tmpdir()
// const ENV = {
//     BASEPATH,LOGPATH,CMS_DB_ENGINE,CMS_DB_LOCATION
// }

const main = async () => {
  const appConfig = AppConfig.getInstance()
  await appConfig.load()
  appConfig.set("app.basepath", BASEPATH)
  const loggerConfig = {
    name: "llfetcher-native",
    streams: [
      {
        type: "rotating-file",
        path: path.resolve(`${appConfig.get("logDir")}/gh-cms-rest-server.log`),
        count: 7,
        period: "1w", // Others: 1h, 1w, 1m, 1y. See https://github.com/trentm/node-bunyan#stream-type-rotating-file
      },
    ],
    level: "debug",
    // format: ':method :url :status-code'
  }
  const LOG = bunyan.createLogger(loggerConfig)
  const HTTP_LOG = RequestLogger(loggerConfig).requestLogger()

  const app = express()
  const datasource = new DS(appConfig.get("db.engine"), appConfig.get("db.location"), LOG)
  let ds = null

  app.use(cors())
  app.use(HTTP_LOG)
  app.use(bodyParser.urlencoded({ extended: true }))

  // LOG.info("Memulai gh-cms rest server.")
  // console.log(fs.existsSync(`./templates/index.twig`))
  const liveReloadServer = livereload.createServer()
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/")
      liveReloadServer.refresh("/twig")
    }, 50)
  })
  app.use(connectLiveReload())
  app.set("views", path.join(".", "src/cms/templates/pug/default/"))
  app.set("view engine", "pug")
  app.use(express.static(path.join(".", "public")))
  app.get("/", (req, res) => {
    res.render("template")
  })
  app.get("/twig", function (req, res) {
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
    loader.addPath("./src/cms/templates/twig/default/")
    // loader.addPath("./src/cms/templates/twig/default/sections/")
    let environment = createEnvironment(loader)
    environment
      .render("template.twig", siteData)
      .then((output) => {
        res.end(output)
      })
      .catch((e) => {
        res.end(e.toString())
      })
  })

  app.get("/name/:name", function (req, res) {
    environment.render("index.twig", req.params).then((output) => {
      res.end(output)
    })
  })
  ds = datasource.initialize()
  if (ds) {
    ds.then((f) => {
      LOG.info("Database connected")
      routers.attach(app, datasource, appConfig, LOG)
    }).catch((e) => {
      LOG.error("Database not connected")
    })
  } else {
    LOG.error("Failed to initialize sqlite database")
  }

  http.createServer(app).listen(appConfig.get("port"))
  // process.exit(0 )
}

main()
