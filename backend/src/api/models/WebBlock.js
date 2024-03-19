import { query } from "express"
import { calculateOffset, calculateTotalPages, getCompiledSql } from "../libs/utils.js"
import WebTemplateBlock from "./WebTemplateBlock.js"
import WebSectionBlock from "./WebSectionBlock.js"
import WebTemplate from "./WebTemplate.js"
import WebTheme from "./WebTheme.js"

class WebBlock {
  constructor(id, templateId, name, slug, description, kind, previewImage, path_, parent) {
    this.id = id
    this.templateId = templateId
    this.name = name
    this.slug = slug
    this.description = description
    this.kind = kind
    this.previewImage = previewImage
    this.path = path_
    this.parent = parent
  }
}
export class WebBlockValidation {
  model = null
  constructor(model) {
    this.model = model
  }
}
export class MWebBlock {
  ds = null
  manager = null

  constructor(ds) {
    this.ds = ds
    this.manager = ds.manager
  }

  async create(templateId, name, description, slug, kind, path_, previewImage, parent) {
    const webblock = new WebBlock()
    // webblock.templateId = templateId
    webblock.name = name
    webblock.slug = slug
    webblock.kind = kind
    webblock.path = path_
    webblock.previewImage = previewImage
    webblock.description = description
    webblock.parent = parent
    let record = null

    try {
      record = await this.manager.save(webblock)
    } catch (err) {
      console.log(err)
    }
    return record
  }

  async getState(templateId = null, limit = 5, page = null, kind = null, parent = null) {
    if (!limit) {
      limit = 5
    }
    try {
      const total_records = await this.getListCount(templateId, kind, parent)
      const total_pages = calculateTotalPages(total_records, limit)
      let record_count = 0
      if (page && page !== null) {
        const offset = calculateOffset(page, limit)
        record_count = await this.getListCount(templateId, kind, parent, limit, offset)
      }
      return { limit, total_pages, total_records, record_count }
    } catch (e) {
      // res.send(e)
      console.error(e)
    }
    return { limit, total_pages: 0, total_records: 0, record_count: 0 }
  }
  async getByPk(pk, includePath = false, kind = null) {
    let id = pk
    let record = null
    try {
      if (includePath && kind) {
        let query = null
        let addSelect = ["th.slug themeSlug"]
        if (kind == "section") {
          query = this.ds
            .createQueryBuilder(WebBlock, "wb")
            .leftJoin(WebTemplateBlock, "wtb", "wtb.blockId = wb.id")
            .leftJoin(WebTemplate, "tpl", "tpl.id = wtb.templateId")
            .leftJoin(WebTheme, "th", "th.id = tpl.themeId")
        } else {
          query = this.ds
            .createQueryBuilder(WebBlock, "wb")
            .leftJoin(WebSectionBlock, "wsb", "wsb.blockId = wb.id")
            .leftJoin(WebTemplateBlock, "wtb", "wtb.blockId = wsb.sectionId")
            .leftJoin(WebBlock, "wbs", "wbs.id = wsb.sectionId")
            .leftJoin(WebTemplate, "tpl", "tpl.id = wtb.templateId")
            .leftJoin(WebTheme, "th", "th.id = tpl.themeId")

          addSelect = [...addSelect, "wbs.slug sectionSlug"]
        }
        query.where("wb.id = :id", { id })
        addSelect = [
          ...addSelect,
          "wb.id id",
          "wb.name name",
          "wb.slug slug",
          "wb.description description",
          "wb.previewImage previewImage",
          "wb.path path",
          "wb.kind kind",
          "wb.parent parent",
        ]
        query = query.select(addSelect)
        console.log(getCompiledSql(query))
        record = await query.getRawOne()
        if (record) {
          record.themeDir = `themes/${record.themeSlug}`
          record.templateDir = `${record.themeDir}/templates`
          if (kind == "section") {
            record.sectionDir = `${record.templateDir}/sections`
            record.sectionPath = `${record.sectionDir}/${record.path}`
          } else {
            record.sectionDir = `${record.templateDir}/sections`
            record.blockDir = `${record.templateDir}/blocks`
            record.blockPath = `${record.blockDir}/${record.path}`
          }
        }
      } else {
        record = await this.manager.findOne(WebBlock, { where: { id } })
      }
    } catch (e) {
      console.error(e)
    }

    return record
  }

  async update(pk, row) {
    let id = pk
    let record = null
    try {
      const webblock = await this.manager.findOne(WebBlock, { where: { id } })
      if (webblock) {
        this.manager.merge(WebBlock, webblock, row)

        record = await this.manager.save(webblock)
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
      const webblock = await this.manager.findOne(WebBlock, { where: { id } })
      if (webblock) {
        record = await this.manager.remove(webblock)
      }
    } catch (e) {
      console.error(e)
    }
    return record
  }
  async getListCount(templateId, kind, parent, limit = null, offset = null) {
    let query = null
    if (kind === "section") {
      if (templateId) {
        query = this.ds
          // GET many to many block kind of section <==> template
          .createQueryBuilder(WebTemplateBlock, "wtb")
          .select(["COUNT(wtb.id) count"])
          .where("wtb.templateId = :templateId", { templateId })
      }
    } else if (kind === "block") {
      if (parent) {
        query = this.ds
          .createQueryBuilder(WebSectionBlock, "wsb")
          .select(["COUNT(wsb.id) count"])
          // .leftJoin(WebBlock, "wb", "wsb.blockId=wb.id")
          .where("wsb.sectionId = :parent", { parent })
      } else {
        if (templateId) {
          query = this.ds
            // GET many to many block kind of section <==> template
            .createQueryBuilder(WebTemplateBlock, "wtb")
            .leftJoin(WebSectionBlock, "wsb", "wsb.sectionId=wtb.blockId")
            .select(["COUNT(wsb.id) count"])
            .where("wtb.templateId = :templateId", { templateId })
        }
      }
    } else {
      query = this.ds.createQueryBuilder(WebBlock, "wb").select(["COUNT(wb.id) count"])
    }

    if (limit) {
      query.limit(limit)
    }
    if (offset) {
      query.offset(offset)
    }
    console.log(getCompiledSql(query))
    let record = await query.getRawOne()
    return record.count
  }

  async getPickerData(limit, page, kind, parent = null) {
    const query = this.ds
      .createQueryBuilder(WebBlock, "wb")
      .select([
        "wb.id id",
        // "wtb.templateId templateId",
        "wb.name name",
        "wb.slug slug",
        "wb.description description",
        "wb.previewImage previewImage",
        "wb.path path",
        "wb.kind kind",
        "wb.parent parent",
      ])
      .where("wb.kind = :kind", { kind })
    const records = await query.getRawMany()
    return records
  }
  async getList(
    templateId = null,
    page = 1,
    limit = 5,
    order_by = "id",
    order_dir = "asc",
    kind = null,
    parent = null
  ) {
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
      const addSelect = []
      const total_records = await this.getListCount(templateId, kind, parent)
      const total_pages = calculateTotalPages(total_records, limit)
      const offset = calculateOffset(page, limit)
      let query = null
      if (kind === "section") {
        if (templateId) {
          query = this.ds
            // GET many to many block kind of section <==> template
            .createQueryBuilder(WebTemplateBlock, "wtb")
            .leftJoin(WebBlock, "wb", "wtb.blockId=wb.id")
            .leftJoin(WebSectionBlock, "wsb", "wsb.sectionId=wtb.blockId")
            .groupBy("wb.id")
            .where("wtb.templateId = :templateId", { templateId })

          addSelect.push("COUNT(wsb.id) blockCount")
        }
      } else if (kind === "block") {
        if (parent) {
          query = this.ds
            .createQueryBuilder(WebSectionBlock, "wsb")
            // .select(["COUNT(wsb.id) count"])
            .leftJoin(WebBlock, "wb", "wsb.blockId=wb.id")
            .where("wsb.sectionId = :parent", { parent })
        } else {
          if (templateId) {
            console.log(`TemplateId ${templateId} and kind ${kind}`)
            query = this.ds
              // GET many to many block kind of section <==> template
              .createQueryBuilder(WebTemplateBlock, "wtb")
              .leftJoin(WebSectionBlock, "wsb", "wsb.sectionId=wtb.blockId")
              .leftJoin(WebBlock, "wb", "wsb.blockId=wb.id")
              .groupBy("wb.id")

              .where("wtb.templateId = :templateId AND wb.kind = :kind", { templateId, kind })
          }
        }
      } else {
        console.log("kind is not valid")
        query = this.ds.createQueryBuilder(WebBlock, "wb")
      }
      query.select([
        "wb.id id",
        // "wtb.templateId templateId",
        "wb.name name",
        "wb.slug slug",
        "wb.description description",
        "wb.previewImage previewImage",
        "wb.path path",
        "wb.kind kind",
        "wb.parent parent",
      ])

      addSelect.forEach((select) => query.addSelect(select))
      // .where("wb.kind = :kind", { kind })

      // .groupBy("b.id")
      query.orderBy(`wb.${order_by}`, order_dir.toUpperCase()).limit(limit).offset(offset)
      console.log(getCompiledSql(query))
      const records = await query.getRawMany()

      // console.log(records.getQuery())
      // records = records.getRawMany()

      return { page, limit, order_by, order_dir, records, total_pages, total_records }
    } catch (e) {
      console.error(e)
      // res.send(e)
    }
    return { page, limit, order_by, order_dir, records: [], total_pages: 0, total_records: 0 }
  }
}
export default WebBlock
