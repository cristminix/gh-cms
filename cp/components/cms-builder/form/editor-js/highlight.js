/**
 * Build styles
 */
import "./highlight.css"
import Header from "@editorjs/header"
import { IconH1, IconH2, IconH3, IconH4, IconH5, IconH6, IconHeading } from "@codexteam/icons"

export default class Highlight extends Header {
  constructor({ data, config, api, readOnly }) {
    super({ data, config, api, readOnly })
    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-highlight",
    }
    this._element = this.getTag()
  }
  static get toolbox() {
    return {
      icon: IconHeading,
      title: "Highlight",
    }
  }
}
