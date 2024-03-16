import { calculateOffset, calculateTotalPages } from "../libs/utils.js"
import WebTemplate from "./WebTemplate.js"

class WebTheme {
  constructor(id, name, slug, description, previewImage) {
    this.id = id
    this.name = name
    this.slug = slug
    this.description = description
    this.previewImage = previewImage
  }
}
export class WebThemeValidation {
  model = null
  constructor(model) {
    this.model = model
  }
}
export class MWebTheme {
  ds = null
  manager = null

  constructor(ds) {
    this.ds = ds
    this.manager = ds.manager
  }

  async create(name, slug, description, previewImage) {
    const webtheme = new WebTheme()
    webtheme.name = name
    webtheme.slug = slug
    webtheme.description = description
    webtheme.previewImage = previewImage

    let record = null

    try {
      record = await this.manager.save(webtheme)
    } catch (err) {
      console.log(err)
    }
    return record
  }

  async getByPk(pk) {
    let id = pk
    let record = null
    try {
      const webtheme = await this.manager.findOne(WebTheme, { where: { id } })

      record = webtheme
    } catch (e) {
      console.error(e)
    }

    return record
  }

  async update(pk, row) {
    let id = pk
    let record = null
    try {
      const webtheme = await this.manager.findOne(WebTheme, { where: { id } })
      if (webtheme) {
        this.manager.merge(WebTheme, webtheme, row)

        record = await this.manager.save(webtheme)
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
      const webtheme = await this.manager.findOne(WebTheme, { where: { id } })
      if (webtheme) {
        record = await this.manager.remove(webtheme)
      }
    } catch (e) {
      console.error(e)
    }
    return record
  }
  async getState(limit = 5, page = null, filter = null) {
    if (!limit) {
      limit = 5
    }

    try {
      const total_records = await this.manager.count(WebTheme)

      const total_pages = calculateTotalPages(total_records, limit)
      let records = []
      if (page && page !== null) {
        const offset = calculateOffset(page, limit)
        records = await this.ds
          .getRepository(WebTheme)
          .createQueryBuilder("a")
          .select(["a.id id"])
          .limit(limit)
          .offset(offset)
          .getRawMany()
      }
      return { limit, total_pages, total_records, record_count: records.length }
    } catch (e) {
      // res.send(e)
      // console.error(e)
    }
    return { limit, total_pages: 0, total_records: 0, record_count: 0 }
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
      const total_records = await this.manager.count(WebTheme)

      const total_pages = calculateTotalPages(total_records, limit)
      const offset = calculateOffset(page, limit)

      const records = await this.ds
        .getRepository(WebTheme)
        .createQueryBuilder("a") //createQueryBuilder(WebTheme,"a")
        .leftJoin(WebTemplate, "tt", "tt.themeId = a.id")
        .select(["a.id id", "a.name name", "a.slug slug", "a.description description", "a.previewImage previewImage"])
        .addSelect("COUNT(tt.id)", "templateCount")
        .groupBy("a.id")
        .offset(offset)
        .orderBy(`a.${order_by}`, order_dir.toUpperCase())
        .limit(limit)
        .getRawMany()

      return { offset, page, limit, order_by, order_dir, records, total_pages, total_records }
    } catch (e) {
      // res.send(e)
    }
    return { offset, page, limit, order_by, order_dir, records: [], total_pages: 0, total_records: 0 }
  }
  async getList_old(page = 1, limit = 5, order_by = "id", order_dir = "asc", filter = null) {
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
      const total_records = await this.manager.count(WebTheme)

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

      const webthemes = await this.manager.find(WebTheme, option)
      const records = webthemes

      return { page, limit, order_by, order_dir, records, total_pages, total_records }
    } catch (e) {
      console.error(e)
      // res.send(e)
    }
    return { page, limit, order_by, order_dir, records: [], total_pages: 0, total_records: 0 }
  }
}
export default WebTheme
