import { calculateOffset, calculateTotalPages } from "../libs/utils.js"

class WebSiteSetting {
  constructor(id, name, slug, theme, companyId, setAsDefault) {
    this.id = id
    this.name = name
    this.slug = slug
    this.theme = theme
    // this.templateId = templateId
    this.companyId = companyId
    this.setAsDefault = setAsDefault
  }
}
export class WebSiteSettingValidation {
  model = null
  constructor(model) {
    this.model = model
  }
}
export class MWebSiteSetting {
  ds = null
  manager = null

  constructor(ds) {
    this.ds = ds
    this.manager = ds.manager
  }

  async create(name, slug, theme, companyId, setAsDefault) {
    const websitesetting = new WebSiteSetting()
    websitesetting.name = name
    websitesetting.slug = slug
    websitesetting.theme = theme
    // websitesetting.templateId = templateId
    websitesetting.companyId = companyId
    websitesetting.setAsDefault = setAsDefault

    let record = null

    try {
      record = await this.manager.save(websitesetting)
    } catch (err) {
      console.log(err)
    }
    return record
  }

  async getByPk(pk) {
    let id = pk
    let record = null
    try {
      const websitesetting = await this.manager.findOne(WebSiteSetting, { where: { id } })

      record = websitesetting
    } catch (e) {
      console.error(e)
    }

    return record
  }
  async getDefault() {
    let record = null
    try {
      const websitesetting = await this.manager.findOne(WebSiteSetting, { where: { setAsDefault: 1 } })

      record = websitesetting
    } catch (e) {
      console.error(e)
    }

    return record
  }
  async update(pk, row) {
    let id = pk
    let record = null
    try {
      const websitesetting = await this.manager.findOne(WebSiteSetting, { where: { id } })
      if (websitesetting) {
        this.manager.merge(WebSiteSetting, websitesetting, row)

        record = await this.manager.save(websitesetting)
      }
    } catch (e) {
      console.error(e)
    }
    return record
  }

  async delete(pk) {
    let id = pk
    let record = null
    try {
      const websitesetting = await this.manager.findOne(WebSiteSetting, { where: { id } })
      if (websitesetting) {
        record = await this.manager.remove(websitesetting)
      }
    } catch (e) {
      console.error(e)
    }
    return record
  }

  async getList(page = 1, limit = 5, order_by = "id", order_dir = "asc", filter = null) {
    if (!limit) {
      limit = 5
    }

    if (!page) {
      page = 1
    }

    if (!order_by) {
      order_by = "id"
    }
    if (order_dir) {
      order_dir = order_dir.toLowerCase()
    }
    if (!["asc", "desc"].includes(order_dir)) {
      order_dir = "asc"
    }
    try {
      const total_records = await this.manager.count(WebSiteSetting)

      const total_pages = calculateTotalPages(total_records, limit)
      const offset = calculateOffset(page, limit)

      let option = {
        skip: offset,
        take: limit,
        order: {},
      }
      option.order[order_by] = order_dir
      if (typeof filter == "object") {
        option = Object.assign(option, filter)
      }

      const websitesettings = await this.manager.find(WebSiteSetting, option)
      const records = websitesettings

      return { page, limit, order_by, order_dir, records, total_pages, total_records }
    } catch (e) {
      console.error(e)
      // res.send(e)
    }
    return { page, limit, order_by, order_dir, records: [], total_pages: 0, total_records: 0 }
  }
}
export default WebSiteSetting
