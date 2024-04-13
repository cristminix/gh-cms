### Adding a API Route

- create router class on the `api/routes` directory

```
# Minimal code for ruter class

class DashboardRouter {
    datasource = null
    router = null
    constructor(datasource){
        this.datasource = datasource
        this.router = express.Router()
        this.initRouter()
    }
    getRouter(){
        return this.router
    }
    getDashboard(req,res){
        return res.send({json:{}})
    }
    initRouter(){
        # this route path will be /cms/api/dashboard/all
        this.router.get('/dashboard/all',  (req, res) => this.getDashboard(req, res))
    }
}

export default DashboardRouter

```

- add router class definition the `api/routes/config.json`, inside `avalables` keys, routes items definition only for documentation use only, actual logic will be implemented inside the router class itself

```

{
  "availables": {
    "dashboard": {
      "routes": {
        "all": {
          "path": "{routePath}/all"
        }
      }
    },
...
}

```
