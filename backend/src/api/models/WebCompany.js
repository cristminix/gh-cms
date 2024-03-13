
import {calculateOffset, calculateTotalPages} from "../libs/utils.js"

class WebCompany {
    constructor(id, name, fullName, shortName, address, altAddress, shortAddress, slug, phone, altPhone, mobile, altMobile, email, altEmail, ig, fb, twitter, youtube, website, logo, logoSm, logoMd, logoXl){
        this.id = id
		this.name = name
		this.fullName = fullName
		this.shortName = shortName
		this.address = address
		this.altAddress = altAddress
		this.shortAddress = shortAddress
		this.slug = slug
		this.phone = phone
		this.altPhone = altPhone
		this.mobile = mobile
		this.altMobile = altMobile
		this.email = email
		this.altEmail = altEmail
		this.ig = ig
		this.fb = fb
		this.twitter = twitter
		this.youtube = youtube
		this.website = website
		this.logo = logo
		this.logoSm = logoSm
		this.logoMd = logoMd
		this.logoXl = logoXl
    }
}
export class WebCompanyValidation {
    model=null
    constructor(model){
        this.model = model
    }
    
}
export class MWebCompany{
    ds=null
    manager=null
    
    constructor(ds){
        this.ds = ds
        this.manager = ds.manager
    }

    async create(name,address,shortAddress,slug,phone,mobile,email,ig,fb,twitter,youtube){
        const webcompany = new WebCompany()
        webcompany.name = name
		webcompany.address = address
		webcompany.shortAddress = shortAddress
		webcompany.slug = slug
		webcompany.phone = phone
		webcompany.mobile = mobile
		webcompany.email = email
		webcompany.ig = ig
		webcompany.fb = fb
		webcompany.twitter = twitter
		webcompany.youtube = youtube

        let record = null

        try{
            record = await this.manager.save(webcompany)
        }catch(err){
            console.log(err)

        }
        return record
    }

    async getByPk(pk){
        let id = pk
        let record = null
        try{
            const webcompany = await this.manager.findOne(WebCompany, {where:{id}})

            record = webcompany
        }catch(e){
            console.error(e)
        }

        return record
    }

    async update(pk, row){
        let id = pk
        let record = null
        try{
            const webcompany = await this.manager.findOne(WebCompany, {where:{id}})
            if(webcompany){
                this.manager.merge(WebCompany, webcompany, row)
                
                record = await this.manager.save(webcompany )
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
            const webcompany = await this.manager.findOne(WebCompany, {where:{id}})
            if(webcompany){
                record = await this.manager.remove(webcompany )
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
            const total_records =  await this.manager.count(WebCompany)
        
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
    
            const webcompanys =  await this.manager.find(WebCompany, option)
            const records = webcompanys
            
            return { page, limit, order_by, order_dir, records, total_pages, total_records}
    
        }catch(e){
            console.error(e)
            // res.send(e)
    
        }
        return { page, limit, order_by, order_dir, records:[], total_pages:0, total_records:0}

    }

}
export default WebCompany
    