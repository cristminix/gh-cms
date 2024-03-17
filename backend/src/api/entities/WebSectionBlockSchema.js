
import {EntitySchema} from "typeorm"  
import WebSectionBlock from "../models/WebSectionBlock.js"      

const WebSectionBlockSchema = new EntitySchema({
    name: "WebSectionBlock",
    target: WebSectionBlock,
    columns: {
        id : {
            type : "int", 
			primary : true, 
			generated : true, 

        },
		sectionId : {
            type : "int", 

        },
		blockId : {
            type : "int", 

        },
    } 
       
    
})



export default WebSectionBlockSchema
    