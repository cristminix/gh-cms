import { calculateOffset, calculateTotalPages } from "../libs/utils.js"

class WebBlockFeature {
  constructor(id, blockId, name, description, kind, content, path_, enabled) {
    this.id = id
    this.blockId = blockId
    this.name = name
    this.description = description
    this.kind = kind
    this.content = content
    this.path_ = path_
    this.enabled = enabled
  }
}
export class WebBlockFeatureValidation {
  model = null
  constructor(model) {
    this.model = model
  }
}
export class MWebBlockFeature {
  ds = null
  manager = null

  constructor(ds) {
    this.ds = ds
    this.manager = ds.manager
  }
  async getState(blockId, limit = 5, page = null, filter = null) {
    console.log(blockId)

    if (!limit) {
      limit = 5
    }

    try {
      // const total_records = await this.manager.count(WebBlockFeature)
      const record = await this.ds
        .createQueryBuilder(WebBlockFeature, "a")
        .select(["COUNT(a.id) count"])
        .where("a.blockId = :blockId", { blockId })
        .getRawOne()
      console.log(record)
      const total_records = record.count
      const total_pages = calculateTotalPages(total_records, limit)
      let records = []
      if (page && page !== null) {
        const offset = calculateOffset(page, limit)
        records = await this.ds
          .createQueryBuilder(WebBlockFeature, "a")
          .select(["a.id id"])
          .where("a.blockId = :blockId", { blockId })

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
  async create(blockId, name, description, kind, content, path_, enabled) {
    const webblockfeature = new WebBlockFeature()
    webblockfeature.blockId = blockId
    webblockfeature.name = name
    webblockfeature.description = description
    webblockfeature.kind = kind
    webblockfeature.content = content
    webblockfeature.path_ = path_
    webblockfeature.enabled = enabled

    let record = null

    try {
      record = await this.manager.save(webblockfeature)
    } catch (err) {
      console.log(err)
    }
    return record
  }

  async getByPk(pk) {
    let id = pk
    let record = null
    try {
      const webblockfeature = await this.manager.findOne(WebBlockFeature, { where: { id } })

      record = webblockfeature
    } catch (e) {
      console.error(e)
    }

    return record
  }

  async update(pk, row) {
    let id = pk
    let record = null
    try {
      const webblockfeature = await this.manager.findOne(WebBlockFeature, { where: { id } })
      if (webblockfeature) {
        this.manager.merge(WebBlockFeature, webblockfeature, row)

        record = await this.manager.save(webblockfeature)
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
      const webblockfeature = await this.manager.findOne(WebBlockFeature, { where: { id } })
      if (webblockfeature) {
        record = await this.manager.remove(webblockfeature)
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
      const recCount = await this.ds
        .createQueryBuilder(WebBlockFeature, "wbf")
        .select(["COUNT(wbf.id) count"])
        .getRawOne()
      const total_records = recCount.count
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

      const webblockfeatures = await this.manager.find(WebBlockFeature, option)
      const records = webblockfeatures

      return { page, limit, order_by, order_dir, records, total_pages, total_records }
    } catch (e) {
      console.error(e)
      // res.send(e)
    }
    return { page, limit, order_by, order_dir, records: [], total_pages: 0, total_records: 0 }
  }
}
export default WebBlockFeature
