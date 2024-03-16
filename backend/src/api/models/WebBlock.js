import { calculateOffset, calculateTotalPages } from "../libs/utils.js"

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
    webblock.templateId = templateId
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
  async getState(templateId, limit = 5, page = null, kind = null, parent = null) {
    if (!limit) {
      limit = 5
    }

    try {
      const total_records = await this.manager.count(WebBlock)

      const total_pages = calculateTotalPages(total_records, limit)
      let records = []
      if (page && page !== null) {
        const offset = calculateOffset(page, limit)
        records = await this.ds
          .getRepository(WebBlock)
          .createQueryBuilder("a")
          .select(["a.id id"])
          .limit(limit)
          .offset(offset)
          .getRawMany()
      }
      return { limit, total_pages, total_records, record_count: records.length }
    } catch (e) {
      // res.send(e)
      console.error(e)
    }
    return { limit, total_pages: 0, total_records: 0, record_count: 0 }
  }
  async getByPk(pk) {
    let id = pk
    let record = null
    try {
      const webblock = await this.manager.findOne(WebBlock, { where: { id } })

      record = webblock
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

  async getList(templateId, page = 1, limit = 5, order_by = "id", order_dir = "asc", kind = null, parent = null) {
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
        .createQueryBuilder(WebBlock, "a")
        .select(["COUNT(a.id) count"])
        .orderBy(`a.${order_by}`, order_dir.toUpperCase())
        .where("a.templateId = :templateId", { templateId })
        .where("a.kind = :kind", { kind })

        .getRawOne()
      const total_records = record.count
      const total_pages = calculateTotalPages(total_records, limit)
      const offset = calculateOffset(page, limit)

      let records = await this.ds
        .createQueryBuilder(WebBlock, "a")
        // .leftJoin(WebBlock, "s", "s.templateId = a.id AND s.kind=:kind", { kind: "section" })
        // .leftJoin(WebBlock, "b", "b.templateId = a.id AND b.kind=:kind2", { kind2: "block" })

        .select([
          "a.id id",
          "a.templateId templateId",
          "a.name name",
          "a.slug slug",
          "a.description description",
          "a.previewImage previewImage",
          "a.path path",
          "a.kind kind",
          "a.parent parent",
        ])
        // .addSelect("COUNT(s.id)", "sectionCount")
        // .addSelect("COUNT(b.id)", "blockCount")
        .where("a.templateId = :templateId", { templateId })
        .where("a.kind = :kind", { kind })

        .groupBy("a.id")
        .offset(offset)
        .orderBy(`a.${order_by}`, order_dir.toUpperCase())
        .limit(limit)
        .getRawMany()

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
