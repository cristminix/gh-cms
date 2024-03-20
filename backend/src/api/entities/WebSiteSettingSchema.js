import { EntitySchema } from "typeorm"
import WebSiteSetting from "../models/WebSiteSetting.js"

const WebSiteSettingSchema = new EntitySchema({
  name: "WebSiteSetting",
  target: WebSiteSetting,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 225,
    },
    slug: {
      type: "varchar",
      length: 500,
    },
    theme: {
      type: "varchar",
    },

    companyId: {
      type: "int",
    },
    setAsDefault: {
      type: "int",
    },
  },
})

export default WebSiteSettingSchema
