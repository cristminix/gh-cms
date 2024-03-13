
import {EntitySchema} from "typeorm"  
import WebTheme from "../models/WebTheme.js"      

const WebThemeSchema = new EntitySchema({
    name: "WebTheme",
    target: WebTheme,
    columns: {
        id : {
            type : "int", 
			primary : true, 
			generated : true, 

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
    } 
       
    
})



export default WebThemeSchema
    