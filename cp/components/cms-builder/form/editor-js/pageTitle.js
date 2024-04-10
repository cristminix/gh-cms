/**
 * Build styles
 */
import "./pageTitle.css"
import Header from "@editorjs/header"
import { IconH1, IconH2, IconH3, IconH4, IconH5, IconH6, IconHeading } from "@codexteam/icons"
import $ from "jquery"
export default class PageTitle extends Header {
  constructor({ data, config, api, readOnly }) {
    super({ data, config, api, readOnly })
    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-page-title",
    }
    console.log(config)
    this._element = this.getTag()
    this.api.toolbar = null
    const $el = $(this._element)
    $el.on("keydown",(e)=>{
      // console.log(e.keyCode)
      if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault()
        return false
      }
      if (e.keyCode == 8){
         if(this._element.textContent.length < 1){
          e.preventDefault()
          return false
        }
      }
    })
  }
  static get toolbox() {
    return {
      icon: IconHeading,
      title: "Page Title",
    }
  }
  renderSettings() {
    return [{
      icon: null,
      label: "This is page title ",
      onActivate: () => console.log('Hello'),
      closeOnActivate: true,
      isActive: false,
    }]
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
