import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"
import { check, validationResult, checkSchema } from "express-validator"
import AuthenticatedRouter from "./AuthenticatedRouter.js"


class UserRouter extends AuthenticatedRouter {
    
    datasource = null
    mUser = null
    router = null
    uploader = null
    logger = null

    constructor(datasource, appConfig, logger) {
        super(datasource, appConfig, logger)
        this.appConfig = appConfig
        this.logger = logger
        this.mUser = datasource.factory('MUser', true)
        this.router = express.Router()
        this.uploader = multer()
       
        this.initRouter()
    }

    async getState(req, res) {
        let { limit, page } = req.query
        page = parseInt(page) || null
        const results = await this.mUser.getState(limit, page)
        return res.send(results)
    }
    async getList(req, res){
        const {page,limit,order_by,order_dir} = req.query
        const results = await this.mUser.getList(page,limit,order_by,order_dir)
        return res.send(results)
    }    

    /* Route logic for handling GET /user/:id */
    async get(req,res){
        let id  = req.params.id
        const user = await this.mUser.getByPk(id)
        return res.send({
            data: user 
        })
    } 
    /* Route logic for handling POST /user/create */
    async create(req,res){

            const validationErrors = validationResult(req)
        let errorValidations = validationErrors.array()
        const errors = [...errorValidations]
        if (errors.length > 0) {
            return res.status(422).json({ errors })
        }
        

        let { username, email, firstName }= req.body
        try {
            const  user = await this.mUser.create(username, email, firstName)
            return res.send({ data: user })
        }catch(e){
            return res.send({ data: e.toString() })
        }
    }
     /* Route logic for handling POST '/user/update */
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
        const existingRec = await  this.mUser.getByPk(id)
        if (existingRec) {
            const { username, email, firstName } = req.body
            const updatedData = { username, email, firstName }
            const  user = await this.mUser.update(id,updatedData)
            return res.send({data: user, message: "Record updated",success:true})
        }else{
            return res.send({ success: false, message: "Record not found" })
        }
        
    }
    /* Route logic for handling POST '/user/delete */
    async delete(req, res){
        let id = null
        if(req.body.id){
            id= req.body.id
        }
        if(!id){
            id= req.params.id
        }
        
        const existingRec = await  this.mUser.getByPk(id)

        if (existingRec) {
            const  user = await this.mUser.delete(id)
            return res.send({data: user,success: true, message: "Record deleted"})
        } else {
            return res.send({ success: false, message: "Record not found" })
        }
    }    
    initRouter(){
     
        this.router.get('/users', 
            (req, res, next) => this.authenticateToken(req, res, next),
            (req, res) => this.getList(req, res))

        this.router.get("/user/states",
                (req, res, next) => this.authenticateToken(req, res, next),
                (req, res) => this.getState(req, res))
        
        this.router.get('/user/:id', 
            (req, res, next) => this.authenticateToken(req, res, next),
        
            (req, res) => this.get(req, res))
          
        this.router.post('/user/create',
            (req, res, next) => this.authenticateToken(req, res, next),
 
 
            this.uploader.none(),
 
            check("username", "username is required").not().isEmpty(),
            check("email", "email is required").not().isEmpty(),
            check("firstName", "firstName is required").not().isEmpty(),
            (req, res) => this.create(req,res))

        this.router.put('/user/update/:id?',
            (req, res, next) => this.authenticateToken(req, res, next),
 
 
            this.uploader.none(),
 
            check("username", "username is required").not().isEmpty(),
            check("email", "email is required").not().isEmpty(),
            check("firstName", "firstName is required").not().isEmpty(),
            (req, res) => this.update(req,res))

        this.router.delete('/user/delete/:id?',
            (req, res, next) => this.authenticateToken(req, res, next),
 
            (req, res) => this.delete(req,res))
    }
    getRouter(){
        return this.router
    }
}

export default UserRouter
