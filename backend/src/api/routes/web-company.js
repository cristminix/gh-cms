import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"


class WebCompanyRouter extends AuthenticatedRouter {
    
    datasource = null
    mWebCompany = null
    router = null
    uploader = null
    logger = null

    constructor(datasource, appConfig, logger) {
        super(datasource, appConfig, logger)
        this.appConfig = appConfig
        this.logger = logger
        this.mWebCompany = datasource.factory('MWebCompany', true)
        this.router = express.Router()
        this.uploader = multer()
       
        this.initRouter()
    }

    async getState(req, res) {
        let { limit, page } = req.query
        page = parseInt(page) || null
        const results = await this.mWebCompany.getState(limit, page)
        return res.send(results)
    }
    async getList(req, res){
        const {page,limit,order_by,order_dir} = req.query
        const results = await this.mWebCompany.getList(page,limit,order_by,order_dir)
        return res.send(results)
    }    

    /* Route logic for handling GET /web-company/:id */
    async get(req,res){
        let id  = req.params.id
        const webcompany = await this.mWebCompany.getByPk(id)
        return res.send({
            data: webcompany 
        })
    } 
    /* Route logic for handling POST /web-company/create */
    async create(req,res){

            const validationErrors = validationResult(req)
        let errorValidations = validationErrors.array()
        const errors = [...errorValidations]
        if (errors.length > 0) {
            return res.status(422).json({ errors })
        }
        

        let { name, address, shortAddress, slug, phone, mobile, email, ig, fb, twitter, youtube }= req.body
        try {
            const  webcompany = await this.mWebCompany.create(name, address, shortAddress, slug, phone, mobile, email, ig, fb, twitter, youtube)
            return res.send({ data: webcompany })
        }catch(e){
            return res.send({ data: e.toString() })
        }
    }
     /* Route logic for handling POST '/web-company/update */
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
        const existingRec = await  this.mWebCompany.getByPk(id)
        if (existingRec) {
            const { name, address, shortAddress, slug, phone, mobile, email, ig, fb, twitter, youtube } = req.body
            const updatedData = { name, address, shortAddress, slug, phone, mobile, email, ig, fb, twitter, youtube }
            const  webcompany = await this.mWebCompany.update(id,updatedData)
            return res.send({data: webcompany, message: "Record updated",success:true})
        }else{
            return res.send({ success: false, message: "Record not found" })
        }
        
    }
    /* Route logic for handling POST '/web-company/delete */
    async delete(req, res){
        let id = null
        if(req.body.id){
            id= req.body.id
        }
        if(!id){
            id= req.params.id
        }
        
        const existingRec = await  this.mWebCompany.getByPk(id)

        if (existingRec) {
            const  webcompany = await this.mWebCompany.delete(id)
            return res.send({data: webcompany,success: true, message: "Record deleted"})
        } else {
            return res.send({ success: false, message: "Record not found" })
        }
    }    
    initRouter(){
     
        this.router.get('/web-companys', 
            (req, res, next) => this.authenticateToken(req, res, next),
            (req, res) => this.getList(req, res))

        this.router.get("/web-company/states",
                (req, res, next) => this.authenticateToken(req, res, next),
                (req, res) => this.getState(req, res))
        
        this.router.get('/web-company/:id', 
            (req, res, next) => this.authenticateToken(req, res, next),
        
            (req, res) => this.get(req, res))
          
        this.router.post('/web-company/create',
            (req, res, next) => this.authenticateToken(req, res, next),
 
 
            this.uploader.none(),
 
            check("name", "name is required").not().isEmpty(),
            check("address", "address is required").not().isEmpty(),
            check("shortAddress", "shortAddress is required").not().isEmpty(),
            check("slug", "slug is required").not().isEmpty(),
            check("phone", "phone is required").not().isEmpty(),
            check("mobile", "mobile is required").not().isEmpty(),
            check("email", "email is required").not().isEmpty(),
            check("ig", "ig is required").not().isEmpty(),
            check("fb", "fb is required").not().isEmpty(),
            check("twitter", "twitter is required").not().isEmpty(),
            check("youtube", "youtube is required").not().isEmpty(),
            (req, res) => this.create(req,res))

        this.router.put('/web-company/update/:id?',
            (req, res, next) => this.authenticateToken(req, res, next),
 
 
            this.uploader.none(),
 
            check("name", "name is required").not().isEmpty(),
            check("address", "address is required").not().isEmpty(),
            check("shortAddress", "shortAddress is required").not().isEmpty(),
            check("slug", "slug is required").not().isEmpty(),
            check("phone", "phone is required").not().isEmpty(),
            check("mobile", "mobile is required").not().isEmpty(),
            check("email", "email is required").not().isEmpty(),
            check("ig", "ig is required").not().isEmpty(),
            check("fb", "fb is required").not().isEmpty(),
            check("twitter", "twitter is required").not().isEmpty(),
            check("youtube", "youtube is required").not().isEmpty(),
            (req, res) => this.update(req,res))

        this.router.delete('/web-company/delete/:id?',
            (req, res, next) => this.authenticateToken(req, res, next),
 
            (req, res) => this.delete(req,res))
    }
    getRouter(){
        return this.router
    }
}

export default WebCompanyRouter
