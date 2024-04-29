import { InferModel } from 'drizzle-orm'
import {
  foreignKey,
  integer,
  numeric,
  sqliteTable,
  text,
  int,
  
} from 'drizzle-orm/sqlite-core'

export const cms_setting = sqliteTable('cms_setting', {
  id: int('id').primaryKey(),
  profileName: text('profileName').notNull(),
  theme: text('theme').notNull(),
  setAsDefault: int('setAsDefault'),
  createDate:text('createDate').notNull(),
  lastUpdated:text('lastUpdated').notNull()
})

export const cms_user_group = sqliteTable('cms_user_group', {
  id: int('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  privileges: text('privileges'),
  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})

export const cms_user = sqliteTable('cms_user', {
  id: int('id').primaryKey(),
  username: text('username').notNull(),
  passwd: text('passwd').notNull(),
  email: text('email').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName'),
  displayName: text('displayName'),
  avatarUrl: text('avatarUrl'),
  groupId: int('groupId').notNull(),
  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})

export const web_theme = sqliteTable('web_theme', {
  id: int('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  previewImage: text('previewImage'),
  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})
export const web_template = sqliteTable('web_template', {
  id: int('id').primaryKey(),
  themeId: int('themeId').notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  previewImage: text('previewImage'),
  path: text('path'),
  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})

export const web_block = sqliteTable('web_block', {
  id: int('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  kind: text('kind'),
  previewImage: text('previewImage'),
  path: text('path'),
  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})
export const web_block_feature = sqliteTable('web_block_feature', {
  id: int('id').primaryKey(),
  blockId: int('blockId').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  kind: text('kind'),
  content: text('content'),
  path: text('path'),
  enabled: int('enabled'),
  order: int('order'),

  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})
export const web_template_block = sqliteTable('web_template_block', {
  id: int('id').primaryKey(),
  templateId: int('name').notNull(),
  blockId: int('name').notNull(),
  order: int('order'),
  // templateData: text('templateData'),
  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})

export const web_section_block = sqliteTable('web_section_block', {
  id: int('id').primaryKey(),
  sectionId: int('name').notNull(),
  blockId: int('name').notNull(),
  order: int('order'),
  // templateData: text('templateData'),
  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})

export const web_page = sqliteTable('web_page', {
  id: int('id').primaryKey(),
  categories: text('categories'),
  tags: text('tags'),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  authors: text('authors'),
  highlight: text('highlight'),
  coverImage: text('coverImage'),
  content: text('content'),
  blocks: text('blocks'),
  kind: text('kind').notNull(),
  path: text('path'),
  status: text('status'),
  visibility: text('visibility'),
  createdBy: int('createdBy'),
  relatedPages: text('relatedPages'),
  relatedPosts: text('relatedPosts'),
  dateCreated:text('dateCreated'),
  dateUpdated:text('dateUpdated'),
  datePublished:text('datePublished')
})

export const web_menu = sqliteTable('web_menu', {
  id: int('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  link: text('link').notNull(),
  target: text('target'),
  parent: int('parent').notNull(),
  hidden: int('hidden'),
  hasChild: int('hasChild'),
  order: int('order'),
  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})

export const web_contact_person = sqliteTable('web_contact_person', {
  id: int('id').primaryKey(),
  siteId: int('siteId').notNull(),
  name: text('name').notNull(),
  shortName: text('shortName'),
  kind: text('kind').notNull(),
  contactDetail: text('contactDetail').notNull(), 
  enabled: int('enabled').notNull(),
  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})

export const web_company = sqliteTable('web_company', {
  id: int('id').primaryKey(),
  siteId: int('siteId').notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  fullName: text('fullName'),
  shortName: text('shortName'),
  address: text('address').notNull(),
  altAddress: text('altAddress'),
  shortAddress: text('shortAddress'),
  phone: text('phone').notNull(), 
  altPhone: text('altPhone'), 
  mobile: text('mobile').notNull(), 
  altMobile: text('altMobile'), 
  email: text('email').notNull(), 
  altEmail: text('altEmail'), 
  ig: text('ig'), 
  fb: text('fb'), 
  twitter: text('twitter'), 
  website: text('website'), 
  logo: text('logo'), 
  logoSm: text('logoSm'), 
  logoMd: text('logoMd'), 
  logoXl: text('logoXl'), 
  createdBy: int('createdBy'),
  createDate:text('createDate'),
  lastUpdated:text('lastUpdated')
})

export type CmsSettings = InferModel<typeof cms_setting>
export type CmsUserGroups = InferModel<typeof cms_user_group>
export type CmsUsers = InferModel<typeof cms_user>
export type WebThemes = InferModel<typeof web_theme>
export type WebTemplates = InferModel<typeof web_template>
export type WebBlocks = InferModel<typeof web_block>
export type WebBlockFeatures = InferModel<typeof web_block_feature>
export type WebTemplateBlocks = InferModel<typeof web_template_block>
export type WebSectionBlocks = InferModel<typeof web_section_block>
export type WebPages = InferModel<typeof web_page>
export type WebMenus = InferModel<typeof web_menu>
export type WebContactPerson = InferModel<typeof web_contact_person>
export type WebCompanys = InferModel<typeof web_company>