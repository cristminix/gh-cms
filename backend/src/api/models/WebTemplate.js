
import {calculateOffset, calculateTotalPages} from "../libs/utils.js"

class WebTemplate {
    constructor(id, themeId, name, slug, description, previewImage, path){
        this.id = id
		this.themeId = themeId
		this.name = name
		this.slug = slug
		this.description = description
		this.previewImage = previewImage
		this.path = path
    }
}
export class WebTemplateValidation {
    model=null
    constructor(model){
        this.model = model
    }
    
}
export class MWebTemplate{
    ds=null
    manager=null
    
    constructor(ds){
        this.ds = ds
        this.manager = ds.manager
    }

    async create(themeId,name,slug,path){
        const webtemplate = new WebTemplate()
        webtemplate.themeId = themeId
		webtemplate.name = name
		webtemplate.slug = slug
		webtemplate.path = path

        let record = null

        try{
            record = await this.manager.save(webtemplate)
        }catch(err){
            console.log(err)

        }
        return record
    }

    async getByPk(pk){
        let id = pk
        let record = null
        try{
            const webtemplate = await this.manager.findOne(WebTemplate, {where:{id}})

            record = webtemplate
        }catch(e){
            console.error(e)
        }

        return record
    }

    async update(pk, row){
        let id = pk
        let record = null
        try{
            const webtemplate = await this.manager.findOne(WebTemplate, {where:{id}})
            if(webtemplate){
                this.manager.merge(WebTemplate, webtemplate, row)
                
                record = await this.manager.save(webtemplate )
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
            const webtemplate = await this.manager.findOne(WebTemplate, {where:{id}})
            if(webtemplate){
                record = await this.manager.remove(webtemplate )
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
            const total_records =  await this.manager.count(WebTemplate)
        
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
    
            const webtemplates =  await this.manager.find(WebTemplate, option)
            const records = webtemplates
            
            return { page, limit, order_by, order_dir, records, total_pages, total_records}
    
        }catch(e){
            console.error(e)
            // res.send(e)
    
        }
        return { page, limit, order_by, order_dir, records:[], total_pages:0, total_records:0}

    }

}
export default WebTemplate
    