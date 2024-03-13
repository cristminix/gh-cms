import fs from "fs"
import path from "path"
import { writeFile, camelToDashCase, excludeFields, jsonParseFile } from "./lib.mjs"

const createRouteFile = async (config, table_name, target_dir) => {
  const ctl = camelToDashCase(config.model)

  const outputFilename = `${ctl}.js`
  const outputPath = `${target_dir}/${outputFilename}`
  const routeConfigJson = `${target_dir}/config.json`

  // if(fs.existsSync(outputPath)){
  //     console.error(`${outputPath} already exists, please delete it first `)
  //     return
  // }
  const modelInstanceName = config.model.toLowerCase()
  let modelInstanceAssignmentBuffer = ""
  let requiredFields = excludeFields([config.pk], config.fields)

  if (config.nullable) {
    requiredFields = excludeFields(config.nullable, requiredFields)
  }
  if (config.generated) {
    requiredFields = excludeFields(config.generated, requiredFields)
  }
  requiredFields.map((f, index) => {
    modelInstanceAssignmentBuffer += `${index > 0 ? "\t\t" : ""}${modelInstanceName}.${f} = ${f}\n`
  })

  const outputContentBuffer =
    `

import express from "express"
import multer from "multer"
import fs from "fs"
import serveIndex from "serve-index"
import "reflect-metadata"
import path from "path"
// import slugify from'slugify'
import { getFileExtensionFromMimeType, validateImageFile } from "../../fn.js"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"

class ${config.model}Router  extends AuthenticatedRouter {
    datasource = null
    m${config.model} = null
    router = null
    uploader = null
    logger = null
    //thumbnailDir = null
    constructor(datasource, appConfig, logger) {
        super(datasource, appConfig, logger)
        this.appConfig = appConfig
        this.logger = logger
        this.m${config.model} = datasource.factory('M${config.model}', true)
        this.router = express.Router()
        // this.thumbnailDir = appConfig.get("module.thumbnailDir")
        this.uploader = multer()
        // this.uploader = multer({
        //   dest: this.thumbnailDir,
        // })
        this.initRouter()
    }
    // validateImageFile(fieldname, files) {
    //     let errors = validateImageFile(fieldname, files, this.logger, 4)
    //     return errors
    //   }
    // async getState(req, res) {
    //     let { limit, page } = req.query
    //     page = parseInt(page) || null
    //     const results = await this.mYtUpload.getState(limit, page)
    //     return res.send(results)
    //   }
    getRouter(){
        return this.router
    }
    async getList(req, res){
        const {page,limit,order_by,order_dir} = req.query
        const results = await this.m${config.model}.getList(page,limit,order_by,order_dir)
        return res.send(results)
    }
    async get(req,res){
        // Route logic for handling GET '/${ctl}/:${config.pk}'
        let ${config.pk}  = req.params.id
        const  ${modelInstanceName} = await this.m${config.model}.getByPk(id)
        return res.send({data:${modelInstanceName}})
    }

    async create(req,res){
        // Route logic for handling POST '/${ctl}/create'
        const validationErrors = validationResult(req)
        const [file] = req.files
        // console.log(req.files)
        let errorThumbnails = [] // this.validateImageFile("thumbnail", req.files)
        let errorValidations = validationErrors.array()
        const errors = [...errorValidations, ...errorThumbnails]
        if (errors.length > 0) {
        // in every situation, only this part of code is going to be executed
        return res.status(422).json({ errors })
        }
        /*
        if (file) {
            const ext = getFileExtensionFromMimeType(file.mimetype)
            const baseName = path.basename(file.path)
            thumbnail = ` +
    "`${baseName}.${ext}`" +
    `
            const oldFilePath = file.path
            const newFilePath = ` +
    "`${this.thumbnailDir}/${thumbnail}`" +
    `
            fs.rename(oldFilePath, newFilePath, (err) => {
              if (err) {
                this.logger.info("Error renaming file:", err)
              } else {
                this.logger.info("File renamed successfully!")
              }
            })
          }
      
        */
        let {${requiredFields.join(", ")}} = req.body
        try {
            const  ${modelInstanceName} = await this.m${config.model}.create(${requiredFields.join(", ")})
            return res.send({data: ${modelInstanceName}})
        }catch(e){
            return res.send({ data: e.toString() })
        }
    }

    async update(req,res){
        // Route logic for handling POST '/${ctl}/update'
        const validationErrors = validationResult(req)
        
        let errors = validationErrors.array()
        
        /*const [file] = req.files
        // console.log(req.files)
        if (file) {
          let errorThumbnails = this.validateImageFile("thumbnail", req.files)
          errors = [...errors, ...errorThumbnails]
        }
        */
        // errors = [...errors,...]
        if (errors.length > 0) {
          // in every situation, only this part of code is going to be executed
          return res.status(422).json({ errors })
        }
        let ${config.pk} 
        if(req.body.${config.pk}){
            ${config.pk} = req.body.${config.pk}
        }
        if(!${config.pk}){
            ${config.pk} = req.params.${config.pk}
        }
        const existingRec = await  this.m${config.model}.getByPk(id)
        if (existingRec) {
            /*
        this.logger.info(req.files)
        const [file] = req.files
        let { thumbnail } = existingRec
        let fileUpdated = false
        if (file) {
            fileUpdated = true
            const ext = getFileExtensionFromMimeType(file.mimetype)
            const baseName = path.basename(file.path)
            const oldThumbnail = existingRec.thumbnail
            thumbnail = ` +
    "`${baseName}.${ext}`" +
    `
            const oldFilePath = file.path
            const newFilePath = ` +
    "`${this.thumbnailDir}/${thumbnail}`" +
    `
            fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
                this.logger.info("Error renaming file:", err)
            } else {
                this.logger.info("File renamed successfully!")
                const oldThumbnailPath = ` +
    "`${this.thumbnailDir}/${oldThumbnail}`" +
    `

                fs.unlink(oldThumbnailPath, (err) => {
                if (err) {
                    this.logger.info("Error deleting file:", err)
                } else {
                    this.logger.info("File deleted successfully!")
                }
                })
            }
            })
        */
            const {${requiredFields.join(", ")}} = req.body
            const updatedData = {${requiredFields.join(", ")}}
        
            const  ${modelInstanceName} = await this.m${config.model}.update(${config.pk},updatedData)
            return res.send({data: ${modelInstanceName}, message: "Record updated",success:true})
        }else{
            return res.send({ success: false, message: "Record not found" })
        }
        
    }
    async delete(req, res){
        // Route logic for handling POST '/${ctl}/delete'
        let ${config.pk} 
        if(req.body.${config.pk}){
            ${config.pk} = req.body.${config.pk}
        }
        if(!${config.pk}){
            ${config.pk} = req.params.${config.pk}
        }
        
        console.log(${config.pk})
        const existingRec = await  this.m${config.model}.getByPk(id)

        // this.logger.info(id)
        if (existingRec) {
        const  ${modelInstanceName} = await this.m${config.model}.delete(${config.pk})
        /*
        const oldThumbnailPath = ` +
    "`${this.thumbnailDir}/${existingRec.thumbnail}`" +
    `

        fs.unlink(oldThumbnailPath, (err) => {
            if (err) {
            this.logger.info("Error deleting file:", err)
            } else {
            this.logger.info("File deleted successfully!")
            }
        })
        */
        return res.send({data: ${modelInstanceName},success: true, message: "Record deleted"})
        } else {
        return res.send({ success: false, message: "Record not found" })
        }
        
        
        
    }
    initRouter(){
        /*
        const staticPath = path.join(this.appConfig.get("basepath"), this.thumbnailDir)

        this.router.use("/${ctl}s/thumbnails", express.static(staticPath)) // Serve static files
        this.router.use("/${ctl}s/thumbnails", serveIndex(staticPath, { icons: true }))
        */
        this.router.get('/${ctl}s', async (req, res, next) => {
            this.authenticateToken(req, res, next)
          },
          async (req, res) => await this.getList(req, res)
        )
        /*
        this.router.get(
            "${ctl}s",
            async (req, res, next) => {
              this.authenticateToken(req, res, next)
            },
            async (req, res) => await this.getState(req, res)
          )
        */
        this.router.get('/${ctl}/:${config.pk}', async (req, res, next) => {
            this.authenticateToken(req, res, next)
          },async (req, res) => await this.get(req, res))
          
        this.router.post('/${ctl}/create',
        async (req, res, next) => {
            this.authenticateToken(req, res, next)
          },
          this.uploader.none(),
          /*this.uploader.array("thumbnail"),
          // formValidation
          check("title", "title field is required").not().isEmpty(),
          check("description", "description field is required").not().isEmpty(),
          */
        async (req, res) => await this.create(req,res))

        this.router.put('/${ctl}/update/:${config.pk}?',
        async (req, res, next) => {
            this.authenticateToken(req, res, next)
          },
          this.uploader.none(),
          /*this.uploader.array("thumbnail"),
          // formValidation
          check("title", "title field is required").not().isEmpty(),
          check("description", "description field is required").not().isEmpty(),
          */
        async (req, res) => await this.update(req, res))

        this.router.delete('/${ctl}/delete/:${config.pk}?',
        async (req, res, next) => {
            this.authenticateToken(req, res, next)
        },
        async (req, res) => await this.delete(req,res))
    }
}

export default ${config.model}Router
    `
  await writeFile(outputPath, outputContentBuffer, `create route ${config.model} on ${target_dir}`)

  const routeConfig = await jsonParseFile(routeConfigJson, null, "", null, true)
  if (routeConfig) {
    console.log(`updating route config on ${routeConfigJson}`)
    if (routeConfig.availables) {
      routeConfig.availables[ctl] = {
        routePath: `/api/cms/${ctl}`,
        routes: {
          list: {
            path: "{routePath}s",
            authenticated: false,
            groups: [],
            method: "get",
            controller: "getList",
            queryStrings: {
              order_by: {
                type: "string",
                defaultValue: "id",
              },
              order_dir: {
                type: "string",
                defaultValue: "asc",
              },
              limit: {
                type: "int",
                defaultValue: 5,
              },
              page: {
                type: "int",
                defaultValue: 1,
              },
            },
          },
          create: {
            path: "{routePath}/create",
            authenticated: false,
            groups: [],
            method: "post",
            controller: "create",
          },
          update: {
            path: "{routePath}/update",
            authenticated: false,
            groups: [],
            method: "post",
            controller: "update",
            queryStrings: {
              id: {
                type: "int",
                required: true,
              },
            },
          },
          delete: {
            path: "{routePath}/delete",
            authenticated: false,
            groups: [],
            method: "post",
            controller: "delete",
            postData: {
              id: {
                type: "int",
                required: true,
              },
            },
          },
        },
      }
      await writeFile(routeConfigJson, JSON.stringify(routeConfig, null, 2), `updating route config ${routeConfigJson}`)
    } else {
      console.error(`invalid route config on ${routeConfigJson}`)
      process.exit(1)
    }
  } else {
    console.error(`unable to update route config on ${routeConfigJson}`)
    process.exit(1)
  }
}

const createModelAPIRouteV3 = async (table_name, target_dir, json_path) => {
  let config = await jsonParseFile(json_path, table_name, "table", "schema")
  await createRouteFile(config, table_name, target_dir)
}
createModelAPIRouteV3.HELP = `createModelAPIRouteV3 <table_name> <target_dir> [model_entities.json]`
export default createModelAPIRouteV3
