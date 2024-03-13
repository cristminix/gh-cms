
import {EntitySchema} from "typeorm"  
import WebCompany from "../models/WebCompany.js"      

const WebCompanySchema = new EntitySchema({
    name: "WebCompany",
    target: WebCompany,
    columns: {
        id : {
            type : "int", 
			primary : true, 
			generated : true, 

        },
		name : {
            type : "varchar", 
			length : 500, 

        },
		fullName : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		shortName : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		address : {
            type : "varchar", 
			length : 500, 

        },
		altAddress : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		shortAddress : {
            type : "varchar", 
			length : 500, 

        },
		slug : {
            type : "varchar", 
			length : 500, 

        },
		phone : {
            type : "varchar", 
			length : 500, 

        },
		altPhone : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		mobile : {
            type : "varchar", 
			length : 500, 

        },
		altMobile : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		email : {
            type : "varchar", 
			length : 500, 

        },
		altEmail : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		ig : {
            type : "varchar", 
			length : 500, 

        },
		fb : {
            type : "varchar", 
			length : 500, 

        },
		twitter : {
            type : "varchar", 
			length : 500, 

        },
		youtube : {
            type : "varchar", 
			length : 500, 

        },
		website : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		logo : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		logoSm : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		logoMd : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		logoXl : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
    } 
       
    
})



export default WebCompanySchema
    