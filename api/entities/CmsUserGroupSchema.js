
import {EntitySchema} from "typeorm"  
import CmsUserGroup from "../models/CmsUserGroup.js"      

const CmsUserGroupSchema = new EntitySchema({
    name: "CmsUserGroup",
    target: CmsUserGroup,
    columns: {
        id : {
            type : "int", 
			primary : true, 
			generated : true, 

        },
		name : {
            type : "varchar", 
			length : 20, 

        },
		slug : {
            type : "varchar", 
			length : 20, 

        },
		description : {
            type : "varchar", 
			length : 100, 
			nullable : true, 

        },
		privileges : {
            type : "text", 
			nullable : true, 

        },
    } 
       
    
})



export default CmsUserGroupSchema
    