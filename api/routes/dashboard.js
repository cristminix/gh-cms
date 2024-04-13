class DashboardRouter {
  datasource = null
  router = null
  constructor(datasource) {
    this.datasource = datasource
    this.router = express.Router()
    this.initRouter()
  }
  getRouter() {
    return this.router
  }
  initRouter() {
    this.router.get("/dashboard", this.getDashboard)
  }
}
