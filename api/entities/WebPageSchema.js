import { EntitySchema } from "typeorm"
import WebPage from "../models/WebPage.js"

const WebPageSchema = new EntitySchema({
  name: "WebPage",
  target: WebPage,
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
      length: 225,
    },
    slug: {
      type: "varchar",
      nullable: true,
      length: 225,
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
    coverImage: {
      length: 500,
      type: "varchar",
      nullable: true,
    },
    content: {
      type: "text",
    },
    kind: {
      length: 100,
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
      type: "text",
      nullable: true,
    },
    relatedPosts: {
      type: "text",
      nullable: true,
    },
  },
})

export default WebPageSchema
