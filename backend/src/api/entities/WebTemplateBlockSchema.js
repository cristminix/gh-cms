
import {EntitySchema} from "typeorm"  
import WebTemplateBlock from "../models/WebTemplateBlock.js"      

const WebTemplateBlockSchema = new EntitySchema({
    name: "WebTemplateBlock",
    target: WebTemplateBlock,
    columns: {
        id : {
            type : "int", 
			primary : true, 
			generated : true, 

        },
		templateId : {
            type : "int", 

        },
		blockId : {
            type : "int", 

        },
    } 
       
    
})



export default WebTemplateBlockSchema
    