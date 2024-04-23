import jwt from "jsonwebtoken"

class AuthenticatedRouter {
  appConfig = null
  logger = null
  datasource = null
  mCmsUser = null
  constructor(datasource, appConfig, logger) {
    this.appConfig = appConfig
    this.logger = logger
    this.datasource = datasource
    this.mCmsUser = datasource.factory("MCmsUser", true)

    // console.log("AuthenticatedRouter", appConfig)
  }
  async authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    let token = authHeader && authHeader.split(" ")[1]
    const TOKEN_SECRET = this.appConfig.get("auth.TOKEN_SECRET")

    if (token == null) return res.sendStatus(401)
    if (token.match(/^u\d\-/)) {
      const tokenSplit = token.split("-")
      const uid = tokenSplit[0].replace("u", "")
      token = tokenSplit[1]
      // const { passwd, username } = await this.mCmsUser.getByPk(uid, true)
      // console.log(token, uid, passwd, username)
      jwt.verify(token, TOKEN_SECRET, (err, name) => {
        if (err) {
          this.logger.info(err)
          console.log(err)
          return res.sendStatus(403)
        }
        // console.log(name)
        // req.name = username

        next()
      })
    } else {
      // console.log(this.appConfig)
      jwt.verify(token, TOKEN_SECRET, (err, name) => {
        if (err) {
          this.logger.info(err)

          return res.sendStatus(403)
        }
        // console.log(name)
        req.name = name

        next()
      })
    }
  }
}

export default AuthenticatedRouter
