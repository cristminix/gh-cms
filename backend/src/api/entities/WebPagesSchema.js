import { EntitySchema } from "typeorm"
import WebPages from "../models/WebPages.js"

const WebPagesSchema = new EntitySchema({
  name: "WebPages",
  target: WebPages,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    templateId: {
      type: "int",
    },
    categories: {
      type: "varchar",
      length: 225,
      nullable: true,
    },
    tags: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    title: {
      type: "varchar",
      nullable: true,
      length: 100,
    },
    description: {
      type: "varchar",
      nullable: true,
      length: 500,
    },
    authors: {
      nullable: true,
      type: "varchar",
    },
    highlight: {
      type: "varchar",
      nullable: true,
    },
    thumbnail: {
      length: 500,
      type: "varchar",
      nullable: true,
    },
    content: {
      length: 500,
      type: "varchar",
    },
    kind: {
      length: 500,
      type: "varchar",
    },
    path: {
      length: 500,
      type: "varchar",
      nullable: true,
    },
    status: {
      length: 50,
      nullable: true,
      type: "varchar",
    },
    visibility: {
      length: 10,
      nullable: true,
      type: "varchar",
    },
    dateCreated: {
      nullable: true,
      type: "datetime",
    },
    dateUpdated: {
      nullable: true,
      type: "datetime",
    },
    datePublished: {
      nullable: true,
      type: "datetime",
    },
    relatedPages: {
      length: 500,
      type: "varchar",
      nullable: true,
    },
    relatedPosts: {
      length: 500,
      type: "varchar",
      nullable: true,
    },
  },
})

export default WebPagesSchema
