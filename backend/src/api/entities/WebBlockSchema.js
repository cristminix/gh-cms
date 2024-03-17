import { EntitySchema } from "typeorm"
import WebBlock from "../models/WebBlock.js"

const WebBlockSchema = new EntitySchema({
  name: "WebBlock",
  target: WebBlock,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    parent: {
      type: "int",
      nullable: true,
    },

    name: {
      type: "varchar",
      length: 225,
    },
    slug: {
      type: "varchar",
      length: 500,
    },
    description: {
      type: "varchar",
      length: 500,
      nullable: true,
    },
    kind: {
      type: "varchar",
      length: 500,
    },
    previewImage: {
      type: "varchar",
      length: 500,
      nullable: true,
    },
    path: {
      type: "varchar",
      length: 500,
      nullable: true,
    },
  },
  // relations: {
  //   templates: {
  //     type: "many-to-many",
  //     inverseSide: "templates",
  //     target: "WebTemplate", //<--- This needs to match the `inverseSide` of the challenges relation in the User EntitySchema
  //   },
  // },
})

export default WebBlockSchema
