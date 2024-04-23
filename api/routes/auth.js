import express from "express"
import { generateAccessToken } from "../libs/fn.js"
import multer from "multer"
class AuthRouter {
  datasource = null
  mCmsUser = null
  router = null
  appConfig = null
  logger = null
  multer = null
  constructor(datasource, appConfig, logger) {
    this.datasource = datasource
    this.appConfig = appConfig
    this.logger = logger
    this.multer = multer()
    this.mCmsUser = datasource.factory('MCmsUser', true)

    this.router = express.Router()
    this.initRouter()
  }
  getRouter() {
    return this.router
  }

  async generateToken(req, res) {
    let { appId } = req.body
    const TOKEN_SECRET = this.appConfig.get("auth.TOKEN_SECRET")
    const allowedIdentities = this.appConfig.get("auth.allowedIdentities")
    if (allowedIdentities.includes(appId)) {
      const token = generateAccessToken(appId, TOKEN_SECRET)
      return res.send({ appId, token })
    }
    return res.send({ appId, token: null })
  }
  async login(req, res){
    let success = false
    let { appId,username,password } = req.body
    let token = null
    let result = await this.mCmsUser.login(username,password)
    if(result){
       token = generateAccessToken(username, password)

    }

    res.send({
      token,
      result,
      success,
      username,
      password
    })

  }
  initRouter() {
    // console.log("initRouter")
    this.router.post("/auth/generateToken", this.multer.none(), async (req, res) => await this.generateToken(req, res))
    this.router.post("/auth/login", this.multer.none(), async (req, res) => await this.login(req, res))
  }
}

export default AuthRouter
