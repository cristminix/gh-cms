import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"


class WebSiteSettingRouter extends AuthenticatedRouter {
    
    datasource = null
    mWebSiteSetting = null
    router = null
    uploader = null
    logger = null

    constructor(datasource, appConfig, logger) {
        super(datasource, appConfig, logger)
        this.appConfig = appConfig
        this.logger = logger
        this.mWebSiteSetting = datasource.factory('MWebSiteSetting', true)
        this.router = express.Router()
        this.uploader = multer()
       
        this.initRouter()
    }

    async getState(req, res) {
        let { limit, page } = req.query
        page = parseInt(page) || null
        const results = await this.mWebSiteSetting.getState(limit, page)
        return res.send(results)
    }
    async getList(req, res){
        const {page,limit,order_by,order_dir} = req.query
        const results = await this.mWebSiteSetting.getList(page,limit,order_by,order_dir)
        return res.send(results)
    }    

    /* Route logic for handling GET /web-site-setting/:id */
    async get(req,res){
        let id  = req.params.id
        const websitesetting = await this.mWebSiteSetting.getByPk(id)
        return res.send({
            data: websitesetting 
        })
    } 
    /* Route logic for handling POST /web-site-setting/create */
    async create(req,res){

            const validationErrors = validationResult(req)
        let errorValidations = validationErrors.array()
        const errors = [...errorValidations]
        if (errors.length > 0) {
            return res.status(422).json({ errors })
        }
        

        let { name, slug, theme, companyId, setAsDefault }= req.body
        try {
            const  websitesetting = await this.mWebSiteSetting.create(name, slug, theme, companyId, setAsDefault)
            return res.send({ data: websitesetting })
        }catch(e){
            return res.send({ data: e.toString() })
        }
    }
     /* Route logic for handling POST '/web-site-setting/update */
     async update(req,res){

            const validationErrors = validationResult(req)
        let errorValidations = validationErrors.array()
        const errors = [...errorValidations]
        if (errors.length > 0) {
            return res.status(422).json({ errors })
        }
                
        let id = null
        if(req.body.id){
            id= req.body.id
        }
        if(!id){
            id= req.params.id
        }
        const existingRec = await  this.mWebSiteSetting.getByPk(id)
        if (existingRec) {
            const { name, slug, theme, companyId, setAsDefault } = req.body
            const updatedData = { name, slug, theme, companyId, setAsDefault }
            const  websitesetting = await this.mWebSiteSetting.update(id,updatedData)
            return res.send({data: websitesetting, message: "Record updated",success:true})
        }else{
            return res.send({ success: false, message: "Record not found" })
        }
        
    }
    /* Route logic for handling POST '/web-site-setting/delete */
    async delete(req, res){
        let id = null
        if(req.body.id){
            id= req.body.id
        }
        if(!id){
            id= req.params.id
        }
        
        const existingRec = await  this.mWebSiteSetting.getByPk(id)

        if (existingRec) {
            const  websitesetting = await this.mWebSiteSetting.delete(id)
            return res.send({data: websitesetting,success: true, message: "Record deleted"})
        } else {
            return res.send({ success: false, message: "Record not found" })
        }
    }    
    initRouter(){
     
        this.router.get('/web-site-settings', 
            (req, res, next) => this.authenticateToken(req, res, next),
            (req, res) => this.getList(req, res))

        this.router.get("/web-site-setting/states",
                (req, res, next) => this.authenticateToken(req, res, next),
                (req, res) => this.getState(req, res))
        
        this.router.get('/web-site-setting/:id', 
            (req, res, next) => this.authenticateToken(req, res, next),
        
            (req, res) => this.get(req, res))
          
        this.router.post('/web-site-setting/create',
            (req, res, next) => this.authenticateToken(req, res, next),
 
 
            this.uploader.none(),
 
            check("name", "name is required").not().isEmpty(),
            check("slug", "slug is required").not().isEmpty(),
            check("theme", "theme is required").not().isEmpty(),
            check("companyId", "companyId is required").not().isEmpty(),
            check("setAsDefault", "setAsDefault is required").not().isEmpty(),
            (req, res) => this.create(req,res))

        this.router.put('/web-site-setting/update/:id?',
            (req, res, next) => this.authenticateToken(req, res, next),
 
 
            this.uploader.none(),
 
            check("name", "name is required").not().isEmpty(),
            check("slug", "slug is required").not().isEmpty(),
            check("theme", "theme is required").not().isEmpty(),
            check("companyId", "companyId is required").not().isEmpty(),
            check("setAsDefault", "setAsDefault is required").not().isEmpty(),
            (req, res) => this.update(req,res))

        this.router.delete('/web-site-setting/delete/:id?',
            (req, res, next) => this.authenticateToken(req, res, next),
 
            (req, res) => this.delete(req,res))
    }
    getRouter(){
        return this.router
    }
}

export default WebSiteSettingRouter
