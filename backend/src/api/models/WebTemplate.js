import { calculateOffset, calculateTotalPages } from "../libs/utils.js"
import WebBlock from "./WebBlock.js"
import WebSectionBlock from "./WebSectionBlock.js"
import WebTemplateBlock from "./WebTemplateBlock.js"

class WebTemplate {
  constructor(id, themeId, name, slug, description, previewImage, path_) {
    this.id = id
    this.themeId = themeId
    this.name = name
    this.slug = slug
    this.description = description
    this.previewImage = previewImage
    this.path = path_
  }
}
export class WebTemplateValidation {
  model = null
  constructor(model) {
    this.model = model
  }
}
export class MWebTemplate {
  ds = null
  manager = null

  constructor(ds) {
    this.ds = ds
    this.manager = ds.manager
  }

  async create(themeId, name, description, slug, path_, previewImage) {
    const webtemplate = new WebTemplate()
    webtemplate.themeId = themeId
    webtemplate.name = name
    webtemplate.slug = slug
    webtemplate.path = path_
    webtemplate.description = description
    webtemplate.previewImage = previewImage

    let record = null

    try {
      record = await this.manager.save(webtemplate)
    } catch (err) {
      console.log(err)
    }
    return record
  }

  async getByPk(pk) {
    let id = pk
    let record = null
    try {
      const webtemplate = await this.manager.findOne(WebTemplate, { where: { id } })

      record = webtemplate
    } catch (e) {
      console.error(e)
    }

    return record
  }

  async update(pk, row) {
    let id = pk
    let record = null
    try {
      const webtemplate = await this.manager.findOne(WebTemplate, { where: { id } })
      if (webtemplate) {
        this.manager.merge(WebTemplate, webtemplate, row)

        record = await this.manager.save(webtemplate)
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
      const webtemplate = await this.manager.findOne(WebTemplate, { where: { id } })
      if (webtemplate) {
        record = await this.manager.remove(webtemplate)
      }
    } catch (e) {
      console.error(e)
    }
    return record
  }
  async getState(themeId, limit = 5, page = null, filter = null) {
    if (!limit) {
      limit = 5
    }

    try {
      // const total_records = await this.manager.count(WebTemplate)
      const record = await this.ds
        .createQueryBuilder(WebTemplate, "a")
        .select(["COUNT(a.id) count"])
        .where("a.themeId = :themeId", { themeId })
        .getRawOne()
      //   console.log(record)
      const total_records = record.count
      const total_pages = calculateTotalPages(total_records, limit)
      let records = []
      if (page && page !== null) {
        const offset = calculateOffset(page, limit)
        records = await this.ds
          .getRepository(WebTemplate)
          .createQueryBuilder("a")
          .select(["a.id id"])
          .where("a.themeId = :themeId", { themeId })

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
  async getList(themeId = null, page = 1, limit = 5, order_by = "id", order_dir = "asc", filter = null) {
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
      const record = await this.ds
        .createQueryBuilder(WebTemplate, "a")
        .select(["COUNT(a.id) count"])
        .orderBy(`a.${order_by}`, order_dir.toUpperCase())
        .where("a.themeId = :themeId", { themeId })
        .getRawOne()
      const total_records = record.count
      const total_pages = calculateTotalPages(total_records, limit)
      const offset = calculateOffset(page, limit)

      const builder = this.ds
        .createQueryBuilder(WebTemplate, "a")
        .leftJoin(WebTemplateBlock, "wtb", "wtb.templateId = a.id")
        .leftJoin(WebBlock, "block", "block.parent = wtb.id")

        .select([
          "a.id id",
          "a.themeId themeId",
          "a.name name",
          "a.slug slug",
          "a.description description",
          "a.previewImage previewImage",
          "a.path path",
        ])
        .addSelect("COUNT(DISTINCT wtb.id)", "sectionCount")
        .addSelect("COUNT(DISTINCT block.id)", "blockCount")
        .where("a.themeId = :themeId", { themeId })

        .groupBy("a.id")
        .offset(offset)
        .orderBy(`a.${order_by}`, order_dir.toUpperCase())
        .limit(limit)

      const records = await builder.getRawMany()

      // console.log(records.getQuery())
      // records = records.getRawMany()

      return { page, limit, order_by, order_dir, records, total_pages, total_records }
    } catch (e) {
      // res.send(e)
    }
    return { page, limit, order_by, order_dir, records: [], total_pages: 0, total_records: 0 }
  }
}
export default WebTemplate
