import { calculateOffset, calculateTotalPages } from "../libs/utils.js"

class CmsUserGroup {
  constructor(id, name, slug, description, privileges) {
    this.id = id
    this.name = name
    this.slug = slug
    this.description = description
    this.privileges = privileges
  }
}
export class CmsUserGroupValidation {
  model = null
  constructor(model) {
    this.model = model
  }
}
export class MCmsUserGroup {
  ds = null
  manager = null

  constructor(ds) {
    this.ds = ds
    this.manager = ds.manager
  }

  async create(name, slug, description, privileges) {
    const cmsusergroup = new CmsUserGroup()
    cmsusergroup.name = name
    cmsusergroup.slug = slug
    cmsusergroup.description = description
    cmsusergroup.privileges = privileges

    let record = null

    try {
      record = await this.manager.save(cmsusergroup)
    } catch (err) {
      console.log(err)
    }
    return record
  }
  async getState(limit = 5, page = null, filter = null) {
    if (!limit) {
      limit = 5
    }

    try {
      const total_records = await this.manager.count(CmsUserGroup)

      const total_pages = calculateTotalPages(total_records, limit)
      let records = []
      if (page && page !== null) {
        const offset = calculateOffset(page, limit)
        records = await this.ds
          .getRepository(CmsUserGroup)
          .createQueryBuilder("a")
          .select(["a.id id"])
          .limit(limit)
          .offset(offset)
          .getRawMany()
      }
      return { limit, total_pages, total_records, record_count: records.length }
    } catch (e) {
      // res.send(e)
    }
    return { limit, total_pages: 0, total_records: 0, record_count: 0 }
  }
  async getByPk(pk) {
    let id = pk
    let record = null
    try {
      const cmsusergroup = await this.manager.findOne(CmsUserGroup, { where: { id } })

      record = cmsusergroup
    } catch (e) {
      console.error(e)
    }

    return record
  }

  async update(pk, row) {
    let id = pk
    let record = null
    try {
      const cmsusergroup = await this.manager.findOne(CmsUserGroup, { where: { id } })
      if (cmsusergroup) {
        this.manager.merge(CmsUserGroup, cmsusergroup, row)

        record = await this.manager.save(cmsusergroup)
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
      const cmsusergroup = await this.manager.findOne(CmsUserGroup, { where: { id } })
      if (cmsusergroup) {
        record = await this.manager.remove(cmsusergroup)
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
      const total_records = await this.manager.count(CmsUserGroup)

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

      const cmsusergroups = await this.manager.find(CmsUserGroup, option)
      const records = cmsusergroups

      return { page, limit, order_by, order_dir, records, total_pages, total_records }
    } catch (e) {
      console.error(e)
      // res.send(e)
    }
    return { page, limit, order_by, order_dir, records: [], total_pages: 0, total_records: 0 }
  }
}
export default CmsUserGroup
