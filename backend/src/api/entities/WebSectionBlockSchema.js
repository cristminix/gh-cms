import { EntitySchema } from "typeorm"
import WebSectionBlock from "../models/WebSectionBlock.js"

const WebSectionBlockSchema = new EntitySchema({
  name: "WebSectionBlock",
  target: WebSectionBlock,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    sectionId: {
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

export default WebSectionBlockSchema
