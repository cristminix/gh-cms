import { calculateOffset, calculateTotalPages } from "../libs/utils.js";

class WebContactPerson {
  constructor(id, siteId, name, shortName, kind, contactDetail, enabled) {
    this.id = id;
    this.siteId = siteId;
    this.name = name;
    this.shortName = shortName;
    this.kind = kind;
    this.contactDetail = contactDetail;
    this.enabled = enabled;
  }
}
export class WebContactPersonValidation {
  model = null;
  constructor(model) {
    this.model = model;
  }
}
export class MWebContactPerson {
  ds = null;
  manager = null;

  constructor(ds) {
    this.ds = ds;
    this.manager = ds.manager;
  }

  async create(siteId, name, kind, contactDetail) {
    const webcontactperson = new WebContactPerson();
    webcontactperson.siteId = siteId;
    webcontactperson.name = name;
    webcontactperson.kind = kind;
    webcontactperson.contactDetail = contactDetail;

    let record = null;

    try {
      record = await this.manager.save(webcontactperson);
    } catch (err) {
      console.log(err);
    }
    return record;
  }

  async getByPk(pk) {
    let id = pk;
    let record = null;
    try {
      const webcontactperson = await this.manager.findOne(WebContactPerson, {
        where: { id }
      });

      record = webcontactperson;
    } catch (e) {
      console.error(e);
    }

    return record;
  }

  async update(pk, row) {
    let id = pk;
    let record = null;
    try {
      const webcontactperson = await this.manager.findOne(WebContactPerson, {
        where: { id }
      });
      if (webcontactperson) {
        this.manager.merge(WebContactPerson, webcontactperson, row);

        record = await this.manager.save(webcontactperson);
      }
    } catch (e) {
      console.error(e);
    }
    return record;
  }

  async delete(pk) {
    let id = pk;
    let record = null;
    try {
      const webcontactperson = await this.manager.findOne(WebContactPerson, {
        where: { id }
      });
      if (webcontactperson) {
        record = await this.manager.remove(webcontactperson);
      }
    } catch (e) {
      console.error(e);
    }
    return record;
  }

  async getList(
    page = 1,
    limit = 5,
    order_by = "id",
    order_dir = "asc",
    filter = null
  ) {
    if (!limit) {
      limit = 5;
    }

    if (!page) {
      page = 1;
    }

    if (!order_by) {
      order_by = "id";
    }
    if (order_dir) {
      order_dir = order_dir.toLowerCase();
    }
    if (!["asc", "desc"].includes(order_dir)) {
      order_dir = "asc";
    }
    try {
      const total_records = await this.manager.count(WebContactPerson);

      const total_pages = calculateTotalPages(total_records, limit);
      const offset = calculateOffset(page, limit);

      let option = {
        skip: offset,
        take: limit,
        order: {}
      };
      option.order[order_by] = order_dir;
      if (typeof filter == "object") {
        option = Object.assign(option, filter);
      }

      const webcontactpersons = await this.manager.find(
        WebContactPerson,
        option
      );
      const records = webcontactpersons;

      return {
        page,
        limit,
        order_by,
        order_dir,
        records,
        total_pages,
        total_records
      };
    } catch (e) {
      console.error(e);
      // res.send(e)
    }
    return {
      page,
      limit,
      order_by,
      order_dir,
      records: [],
      total_pages: 0,
      total_records: 0
    };
  }
}
export default WebContactPerson;
