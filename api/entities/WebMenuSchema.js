import { EntitySchema } from "typeorm"
import WebMenu from "../models/WebMenu.js"

const WebMenuSchema = new EntitySchema({
  name: "WebMenu",
  target: WebMenu,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    title: {
      type: "varchar",
      length: 225,
    },
    slug: {
      type: "varchar",
      length: 500,
    },
    link: {
      type: "varchar",
      length: 500,
    },
    target: {
      type: "varchar",
      length: 10,
    },
    parent: {
      type: "int",
    },
    hidden: {
      type: "int",
      nullable: true,
    },
    hasChild: {
      type: "int",
      nullable: true,
    },
    order: {
      type: "int",
      nullable: true,
    },
  },
})

export default WebMenuSchema
