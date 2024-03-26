
import {EntitySchema} from "typeorm"  
import WebContactPerson from "../models/WebContactPerson.js"      

const WebContactPersonSchema = new EntitySchema({
    name: "WebContactPerson",
    target: WebContactPerson,
    columns: {
        id : {
            type : "int", 
			primary : true, 
			generated : true, 

        },
		siteId : {
            type : "int", 

        },
		name : {
            type : "varchar", 
			length : 225, 

        },
		shortName : {
            type : "varchar", 
			length : 100, 
			nullable : true, 

        },
		kind : {
            type : "varchar", 
			length : 50, 

        },
		contactDetail : {
            type : "varchar", 
			length : 200, 

        },
		enabled : {
            type : "int", 
			nullable : true, 

        },
    } 
       
    
})



export default WebContactPersonSchema
    