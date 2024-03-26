import { calculateOffset, calculateTotalPages } from "../libs/utils.js"

class WebMenu {
  constructor(id, title, slug, link, target, parent, hidden, hasChild, order) {
    this.id = id
    this.title = title
    this.slug = slug
    this.link = link
    this.target = target
    this.parent = parent
    this.hidden = hidden
    this.hasChild = hasChild
    this.order = order
  }
}
export class WebMenuValidation {
  model = null
  constructor(model) {
    this.model = model
  }
}
export class MWebMenu {
  ds = null
  manager = null

  constructor(ds) {
    this.ds = ds
    this.manager = ds.manager
  }

  async create(title, slug, link, target, parent, hasChild, order) {
    const webmenu = new WebMenu()
    webmenu.title = title
    webmenu.slug = slug
    webmenu.link = link
    webmenu.target = target
    webmenu.parent = parent
    webmenu.hasChild = hasChild ? 1 : 0
    webmenu.order = order || 0

    let record = null

    try {
      record = await this.manager.save(webmenu)
    } catch (err) {
      console.log(err)
    }
    return record
  }

  async getByPk(pk) {
    let id = pk
    let record = null
    try {
      const webmenu = await this.manager.findOne(WebMenu, { where: { id } })

      record = webmenu
    } catch (e) {
      console.error(e)
    }

    return record
  }

  async update(pk, row) {
    let id = pk
    let record = null
    try {
      const webmenu = await this.manager.findOne(WebMenu, { where: { id } })
      if (webmenu) {
        this.manager.merge(WebMenu, webmenu, row)

        record = await this.manager.save(webmenu)
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
      const webmenu = await this.manager.findOne(WebMenu, { where: { id } })
      if (webmenu) {
        record = await this.manager.remove(webmenu)
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
      const total_records = await this.manager.count(WebMenu)

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

      const webmenus = await this.manager.find(WebMenu, option)
      const records = webmenus

      return { page, limit, order_by, order_dir, records, total_pages, total_records }
    } catch (e) {
      console.error(e)
      // res.send(e)
    }
    return { page, limit, order_by, order_dir, records: [], total_pages: 0, total_records: 0 }
  }
}
export default WebMenu
