
import {EntitySchema} from "typeorm"  
import WebTemplate from "../models/WebTemplate.js"      

const WebTemplateSchema = new EntitySchema({
    name: "WebTemplate",
    target: WebTemplate,
    columns: {
        id : {
            type : "int", 
			primary : true, 
			generated : true, 

        },
		themeId : {
            type : "int", 

        },
		name : {
            type : "varchar", 
			length : 225, 

        },
		slug : {
            type : "varchar", 
			length : 500, 

        },
		description : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		previewImage : {
            type : "varchar", 
			length : 500, 
			nullable : true, 

        },
		path : {
            type : "varchar", 
			length : 500, 

        },
    } 
       
    
})



export default WebTemplateSchema
    