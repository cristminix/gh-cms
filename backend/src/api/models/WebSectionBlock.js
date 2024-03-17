
import {calculateOffset, calculateTotalPages} from "../libs/utils.js"

class WebSectionBlock {
    constructor(id, sectionId, blockId){
        this.id = id
		this.sectionId = sectionId
		this.blockId = blockId
    }
}
export class WebSectionBlockValidation {
    model=null
    constructor(model){
        this.model = model
    }
    
}
export class MWebSectionBlock{
    ds=null
    manager=null
    
    constructor(ds){
        this.ds = ds
        this.manager = ds.manager
    }

    async create(sectionId,blockId){
        const websectionblock = new WebSectionBlock()
        websectionblock.sectionId = sectionId
		websectionblock.blockId = blockId

        let record = null

        try{
            record = await this.manager.save(websectionblock)
        }catch(err){
            console.log(err)

        }
        return record
    }

    async getByPk(pk){
        let id = pk
        let record = null
        try{
            const websectionblock = await this.manager.findOne(WebSectionBlock, {where:{id}})

            record = websectionblock
        }catch(e){
            console.error(e)
        }

        return record
    }

    async update(pk, row){
        let id = pk
        let record = null
        try{
            const websectionblock = await this.manager.findOne(WebSectionBlock, {where:{id}})
            if(websectionblock){
                this.manager.merge(WebSectionBlock, websectionblock, row)
                
                record = await this.manager.save(websectionblock )
            }
        
        }catch(e){
            console.error(e)
        }
        return record
    }

    async delete(pk){
        let id = pk
        let record = null
        try{
            const websectionblock = await this.manager.findOne(WebSectionBlock, {where:{id}})
            if(websectionblock){
                record = await this.manager.remove(websectionblock )
            }
        
        }catch(e){
            console.error(e)
        }
        return record
    }

    async getList(page=1, limit=5, order_by='id', order_dir='asc', filter=null){
        if(!limit){
            limit = 5
        }
        
        if(!page){
            page = 1
        }

        if(!order_by){
            order_by='id'
        }
        if(order_dir){
            order_dir = order_dir.toLowerCase()

        }
        if(!['asc','desc'].includes(order_dir)){
            order_dir='asc'
        }
        try {
            const total_records =  await this.manager.count(WebSectionBlock)
        
            const total_pages = calculateTotalPages(total_records, limit) 
            const offset = calculateOffset(page, limit)
            
            
            let option = {
                skip : offset,
                take : limit,
                order: {}
            }
            option.order[order_by] = order_dir
            if(typeof filter == 'object'){
                option = Object.assign(option,filter)
            }
    
            const websectionblocks =  await this.manager.find(WebSectionBlock, option)
            const records = websectionblocks
            
            return { page, limit, order_by, order_dir, records, total_pages, total_records}
    
        }catch(e){
            console.error(e)
            // res.send(e)
    
        }
        return { page, limit, order_by, order_dir, records:[], total_pages:0, total_records:0}

    }

}
export default WebSectionBlock
    