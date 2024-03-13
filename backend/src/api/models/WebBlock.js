
import {calculateOffset, calculateTotalPages} from "../libs/utils.js"

class WebBlock {
    constructor(id, templateId, name, slug, description, kind, previewImage, path){
        this.id = id
		this.templateId = templateId
		this.name = name
		this.slug = slug
		this.description = description
		this.kind = kind
		this.previewImage = previewImage
		this.path = path
    }
}
export class WebBlockValidation {
    model=null
    constructor(model){
        this.model = model
    }
    
}
export class MWebBlock{
    ds=null
    manager=null
    
    constructor(ds){
        this.ds = ds
        this.manager = ds.manager
    }

    async create(templateId,name,slug,kind,path){
        const webblock = new WebBlock()
        webblock.templateId = templateId
		webblock.name = name
		webblock.slug = slug
		webblock.kind = kind
		webblock.path = path

        let record = null

        try{
            record = await this.manager.save(webblock)
        }catch(err){
            console.log(err)

        }
        return record
    }

    async getByPk(pk){
        let id = pk
        let record = null
        try{
            const webblock = await this.manager.findOne(WebBlock, {where:{id}})

            record = webblock
        }catch(e){
            console.error(e)
        }

        return record
    }

    async update(pk, row){
        let id = pk
        let record = null
        try{
            const webblock = await this.manager.findOne(WebBlock, {where:{id}})
            if(webblock){
                this.manager.merge(WebBlock, webblock, row)
                
                record = await this.manager.save(webblock )
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
            const webblock = await this.manager.findOne(WebBlock, {where:{id}})
            if(webblock){
                record = await this.manager.remove(webblock )
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
            const total_records =  await this.manager.count(WebBlock)
        
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
    
            const webblocks =  await this.manager.find(WebBlock, option)
            const records = webblocks
            
            return { page, limit, order_by, order_dir, records, total_pages, total_records}
    
        }catch(e){
            console.error(e)
            // res.send(e)
    
        }
        return { page, limit, order_by, order_dir, records:[], total_pages:0, total_records:0}

    }

}
export default WebBlock
    