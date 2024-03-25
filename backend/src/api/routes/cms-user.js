import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"


class CmsUserRouter extends AuthenticatedRouter {
    
    datasource = null
    mCmsUser = null
    router = null
    uploader = null
    logger = null

    constructor(datasource, appConfig, logger) {
        super(datasource, appConfig, logger)
        this.appConfig = appConfig
        this.logger = logger
        this.mCmsUser = datasource.factory('MCmsUser', true)
        this.router = express.Router()
        this.uploader = multer()
       
        this.initRouter()
    }

    async getState(req, res) {
        let { limit, page } = req.query
        page = parseInt(page) || null
        const results = await this.mCmsUser.getState(limit, page)
        return res.send(results)
    }
    async getList(req, res){
        const {page,limit,order_by,order_dir} = req.query
        const results = await this.mCmsUser.getList(page,limit,order_by,order_dir)
        return res.send(results)
    }    

    /* Route logic for handling GET /cms-user/:id */
    async get(req,res){
        let id  = req.params.id
        const cmsuser = await this.mCmsUser.getByPk(id)
        return res.send({
            data: cmsuser 
        })
    } 
    /* Route logic for handling POST /cms-user/create */
    async create(req,res){

            const validationErrors = validationResult(req)
        let errorValidations = validationErrors.array()
        const errors = [...errorValidations]
        if (errors.length > 0) {
            return res.status(422).json({ errors })
        }
        

        let { username, email, firstName }= req.body
        try {
            const  cmsuser = await this.mCmsUser.create(username, email, firstName)
            return res.send({ data: cmsuser })
        }catch(e){
            return res.send({ data: e.toString() })
        }
    }
     /* Route logic for handling POST '/cms-user/update */
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
        const existingRec = await  this.mCmsUser.getByPk(id)
        if (existingRec) {
            const { username, email, firstName } = req.body
            const updatedData = { username, email, firstName }
            const  cmsuser = await this.mCmsUser.update(id,updatedData)
            return res.send({data: cmsuser, message: "Record updated",success:true})
        }else{
            return res.send({ success: false, message: "Record not found" })
        }
        
    }
    /* Route logic for handling POST '/cms-user/delete */
    async delete(req, res){
        let id = null
        if(req.body.id){
            id= req.body.id
        }
        if(!id){
            id= req.params.id
        }
        
        const existingRec = await  this.mCmsUser.getByPk(id)

        if (existingRec) {
            const  cmsuser = await this.mCmsUser.delete(id)
            return res.send({data: cmsuser,success: true, message: "Record deleted"})
        } else {
            return res.send({ success: false, message: "Record not found" })
        }
    }    
    initRouter(){
     
        this.router.get('/cms-users', 
            (req, res, next) => this.authenticateToken(req, res, next),
            (req, res) => this.getList(req, res))

        this.router.get("/cms-user/states",
                (req, res, next) => this.authenticateToken(req, res, next),
                (req, res) => this.getState(req, res))
        
        this.router.get('/cms-user/:id', 
            (req, res, next) => this.authenticateToken(req, res, next),
        
            (req, res) => this.get(req, res))
          
        this.router.post('/cms-user/create',
            (req, res, next) => this.authenticateToken(req, res, next),
 
 
            this.uploader.none(),
 
            check("username", "username is required").not().isEmpty(),
            check("email", "email is required").not().isEmpty(),
            check("firstName", "firstName is required").not().isEmpty(),
            (req, res) => this.create(req,res))

        this.router.put('/cms-user/update/:id?',
            (req, res, next) => this.authenticateToken(req, res, next),
 
 
            this.uploader.none(),
 
            check("username", "username is required").not().isEmpty(),
            check("email", "email is required").not().isEmpty(),
            check("firstName", "firstName is required").not().isEmpty(),
            (req, res) => this.update(req,res))

        this.router.delete('/cms-user/delete/:id?',
            (req, res, next) => this.authenticateToken(req, res, next),
 
            (req, res) => this.delete(req,res))
    }
    getRouter(){
        return this.router
    }
}

export default CmsUserRouter
