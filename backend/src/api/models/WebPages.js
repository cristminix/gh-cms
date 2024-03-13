
import {calculateOffset, calculateTotalPages} from "../libs/utils.js"

class WebPages {
    constructor(id, templateId, categories, tags, title, description, authors, highlight, thumbnail, content, kind, path, status, visibility, dateCreated, dateUpdated, datePublished, relatedPages, relatedPosts){
        this.id = id
		this.templateId = templateId
		this.categories = categories
		this.tags = tags
		this.title = title
		this.description = description
		this.authors = authors
		this.highlight = highlight
		this.thumbnail = thumbnail
		this.content = content
		this.kind = kind
		this.path = path
		this.status = status
		this.visibility = visibility
		this.dateCreated = dateCreated
		this.dateUpdated = dateUpdated
		this.datePublished = datePublished
		this.relatedPages = relatedPages
		this.relatedPosts = relatedPosts
    }
}
export class WebPagesValidation {
    model=null
    constructor(model){
        this.model = model
    }
    
}
export class MWebPages{
    ds=null
    manager=null
    
    constructor(ds){
        this.ds = ds
        this.manager = ds.manager
    }

    async create(templateId,title,description,authors,content,kind,status,visibility,dateCreated,dateUpdated,datePublished){
        const webpages = new WebPages()
        webpages.templateId = templateId
		webpages.title = title
		webpages.description = description
		webpages.authors = authors
		webpages.content = content
		webpages.kind = kind
		webpages.status = status
		webpages.visibility = visibility
		webpages.dateCreated = dateCreated
		webpages.dateUpdated = dateUpdated
		webpages.datePublished = datePublished

        let record = null

        try{
            record = await this.manager.save(webpages)
        }catch(err){
            console.log(err)

        }
        return record
    }

    async getByPk(pk){
        let id = pk
        let record = null
        try{
            const webpages = await this.manager.findOne(WebPages, {where:{id}})

            record = webpages
        }catch(e){
            console.error(e)
        }

        return record
    }

    async update(pk, row){
        let id = pk
        let record = null
        try{
            const webpages = await this.manager.findOne(WebPages, {where:{id}})
            if(webpages){
                this.manager.merge(WebPages, webpages, row)
                
                record = await this.manager.save(webpages )
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
            const webpages = await this.manager.findOne(WebPages, {where:{id}})
            if(webpages){
                record = await this.manager.remove(webpages )
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
            const total_records =  await this.manager.count(WebPages)
        
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
    
            const webpagess =  await this.manager.find(WebPages, option)
            const records = webpagess
            
            return { page, limit, order_by, order_dir, records, total_pages, total_records}
    
        }catch(e){
            console.error(e)
            // res.send(e)
    
        }
        return { page, limit, order_by, order_dir, records:[], total_pages:0, total_records:0}

    }

}
export default WebPages
    