/**
 * Build styles
 */
import "./pageTitle.css"
import Header from "@editorjs/header"
import { IconH1, IconH2, IconH3, IconH4, IconH5, IconH6, IconHeading } from "@codexteam/icons"

export default class PageTitle extends Header {
  constructor({ data, config, api, readOnly }) {
    super({ data, config, api, readOnly })
    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-page-title",
    }
    this._element = this.getTag()
    this.api.toolbar = null
  }
  static get toolbox() {
    return {
      icon: IconHeading,
      title: "Page Title",
    }
  }
  // get levels() {
  //   const availableLevels = [
  //     {
  //       number: 1,
  //       tag: "title",
  //       svg: IconH1,
  //     },
  //   ]

  //   return availableLevels
  // }
}
