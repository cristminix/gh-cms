import { EntitySchema } from "typeorm"
import WebBlockFeature from "../models/WebBlockFeature.js"

const WebBlockFeatureSchema = new EntitySchema({
  name: "WebBlockFeature",
  target: WebBlockFeature,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    blockId: {
      type: "int",
    },
    name: {
      type: "varchar",
      length: 225,
    },
    description: {
      type: "varchar",
      length: 2225,
      nullable: true,
    },
    kind: {
      type: "varchar",
      length: 100,
    },
    content: {
      type: "text",
      nullable: true,
    },
    path_: {
      type: "varchar",
      length: 200,
      nullable: true,
    },
    enabled: {
      type: "int",
    },
    order: {
      type: "int",
      nullable: true,
    },
  },
})

export default WebBlockFeatureSchema
