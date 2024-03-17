
import {calculateOffset, calculateTotalPages} from "../libs/utils.js"

class WebTemplateBlock {
    constructor(id, templateId, blockId){
        this.id = id
		this.templateId = templateId
		this.blockId = blockId
    }
}
export class WebTemplateBlockValidation {
    model=null
    constructor(model){
        this.model = model
    }
    
}
export class MWebTemplateBlock{
    ds=null
    manager=null
    
    constructor(ds){
        this.ds = ds
        this.manager = ds.manager
    }

    async create(templateId,blockId){
        const webtemplateblock = new WebTemplateBlock()
        webtemplateblock.templateId = templateId
		webtemplateblock.blockId = blockId

        let record = null

        try{
            record = await this.manager.save(webtemplateblock)
        }catch(err){
            console.log(err)

        }
        return record
    }

    async getByPk(pk){
        let id = pk
        let record = null
        try{
            const webtemplateblock = await this.manager.findOne(WebTemplateBlock, {where:{id}})

            record = webtemplateblock
        }catch(e){
            console.error(e)
        }

        return record
    }

    async update(pk, row){
        let id = pk
        let record = null
        try{
            const webtemplateblock = await this.manager.findOne(WebTemplateBlock, {where:{id}})
            if(webtemplateblock){
                this.manager.merge(WebTemplateBlock, webtemplateblock, row)
                
                record = await this.manager.save(webtemplateblock )
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
            const webtemplateblock = await this.manager.findOne(WebTemplateBlock, {where:{id}})
            if(webtemplateblock){
                record = await this.manager.remove(webtemplateblock )
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
            const total_records =  await this.manager.count(WebTemplateBlock)
        
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
    
            const webtemplateblocks =  await this.manager.find(WebTemplateBlock, option)
            const records = webtemplateblocks
            
            return { page, limit, order_by, order_dir, records, total_pages, total_records}
    
        }catch(e){
            console.error(e)
            // res.send(e)
    
        }
        return { page, limit, order_by, order_dir, records:[], total_pages:0, total_records:0}

    }

}
export default WebTemplateBlock
    