import { calculateOffset, calculateTotalPages } from "../libs/utils.js"
import CmsUserGroup from "./CmsUserGroup.js"

class CmsUser {
  constructor(
    id,
    username,
    passwd,
    email,
    firstName,
    lastName,
    displayName,
    avatarUrl,
    groupId,
    createdBy,
    createDate,
    lastUpdated,
  ) {
    this.id = id
    this.username = username
    this.passwd = passwd
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.displayName = displayName
    this.avatarUrl = avatarUrl
    this.groupId = groupId
    this.createdBy = createdBy
    this.createDate = createDate
    this.lastUpdated = lastUpdated
  }
}
export class UserValidation {
  model = null
  constructor(model) {
    this.model = model
  }

  required(inputValue) {}

  min(inputValue) {
    const fields = {
      username: 8,
      passwd: 8,
      firstName: 3,
    }
  }

  validUsername(inputValue) {}

  checkUsername(inputValue) {}

  uniqueUsername(inputValue) {}

  validPasswd(inputValue) {}

  validEmail(inputValue) {}

  uniqueEmail(inputValue) {}

  validUrl(inputValue) {}

  validGroupId(inputValue) {}
}
export class MCmsUser {
  ds = null
  manager = null

  constructor(ds) {
    this.ds = ds
    this.manager = ds.manager
  }

  async create(username, email, firstName) {
    const user = new CmsUser()
    user.username = username
    user.email = email
    user.firstName = firstName

    let record = null

    try {
      record = await this.manager.save(user)
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
      const total_records = await this.manager.count(CmsUser)

      const total_pages = calculateTotalPages(total_records, limit)
      let records = []
      if (page && page !== null) {
        const offset = calculateOffset(page, limit)
        records = await this.ds
          .getRepository(CmsUser)
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
  async login(username,password){
    // console.log(username,password)
    let record = null
    try {
      const user = await this.ds
        .createQueryBuilder(CmsUser, "u")
        .leftJoin(CmsUserGroup, "g", "g.id=u.groupId")
        .select([
          "u.id id",
          "u.username username",
          // "u.passwd passwd",
          "u.email email",
          "u.firstName firstName",
          "u.lastName lastName",
          "u.displayName displayName",
          "u.avatarUrl avatarUrl",
          "u.groupId groupId",
          // "u.createdBy createdBy",
          // "u.createDate createDate",
          // "u.lastUpdated lastUpdated",
          "g.slug groupSlug",
          "g.name groupName",
        ])
        .where("u.passwd=:password AND u.username=:username", { username, password })
        .getRawOne()

      record = user
    } catch (e) {
      console.error(e)
    }

    return record
  }
  async loginEmail(email,password){
    // console.log(username,password)
    let record = null
    try {
      const user = await this.ds
        .createQueryBuilder(CmsUser, "u")
        .leftJoin(CmsUserGroup, "g", "g.id=u.groupId")
        .select([
          "u.id id",
          "u.username username",
          // "u.passwd passwd",
          "u.email email",
          "u.firstName firstName",
          "u.lastName lastName",
          "u.displayName displayName",
          "u.avatarUrl avatarUrl",
          "u.groupId groupId",
          // "u.createdBy createdBy",
          // "u.createDate createDate",
          "u.lastUpdated lastUpdated",
          "g.slug groupSlug",
          "g.name groupName",
        ])
        .where("u.passwd=:password AND u.email=:email", { email, password })
        .getRawOne()

      record = user
    } catch (e) {
      console.error(e)
    }

    return record
  }
  async getByPk(pk) {
    let id = pk
    let record = null
    try {
      const user = await this.ds
        .createQueryBuilder(CmsUser, "u")
        .leftJoin(CmsUserGroup, "g", "g.id=u.groupId")
        .select([
          "u.id id",
          "u.username username",
          "u.passwd passwd",
          "u.email email",
          "u.firstName firstName",
          "u.lastName lastName",
          "u.displayName displayName",
          "u.avatarUrl avatarUrl",
          "u.groupId groupId",
          "u.createdBy createdBy",
          "u.createDate createDate",
          "u.lastUpdated lastUpdated",
          "g.slug groupSlug",
          "g.name groupName",
        ])
        .where("u.id=:id", { id })
        .getRawOne()

      record = user
    } catch (e) {
      console.error(e)
    }

    return record
  }

  async update(pk, row) {
    let id = pk
    let record = null
    try {
      const user = await this.manager.findOne(CmsUser, { where: { id } })
      if (user) {
        this.manager.merge(CmsUser, user, row)

        record = await this.manager.save(user)
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
      const user = await this.manager.findOne(CmsUser, { where: { id } })
      if (user) {
        record = await this.manager.remove(user)
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
      const total_records = await this.manager.count(CmsUser)

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

      const users = await this.ds
        .createQueryBuilder(CmsUser, "u")
        .leftJoin(CmsUserGroup, "g", "g.id=u.groupId")
        .select([
          "u.id id",
          "u.username username",
          "u.passwd passwd",
          "u.email email",
          "u.firstName firstName",
          "u.lastName lastName",
          "u.displayName displayName",
          "u.avatarUrl avatarUrl",
          "u.groupId groupId",
          "u.createdBy createdBy",
          "u.createDate createDate",
          "u.lastUpdated lastUpdated",
          "g.slug groupSlug",
          "g.name groupName",
        ])
        .limit(limit)
        .offset(offset)
        .getRawMany()
      const records = users

      return { page, limit, order_by, order_dir, records, total_pages, total_records }
    } catch (e) {
      console.error(e)
      // res.send(e)
    }
    return { page, limit, order_by, order_dir, records: [], total_pages: 0, total_records: 0 }
  }
}
export default CmsUser
