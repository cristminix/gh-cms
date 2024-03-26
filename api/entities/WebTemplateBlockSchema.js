import { EntitySchema } from "typeorm"
import WebTemplateBlock from "../models/WebTemplateBlock.js"

const WebTemplateBlockSchema = new EntitySchema({
  name: "WebTemplateBlock",
  target: WebTemplateBlock,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    templateId: {
      type: "int",
    },
    templateData: {
      type: "text",
      nullable: true,
    },
    blockId: {
      type: "int",
    },
    order: {
      type: "int",
      nullable: true,
    },
  },
})

export default WebTemplateBlockSchema
