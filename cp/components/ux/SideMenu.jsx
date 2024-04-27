import { cls13 } from "@cp/components/shared/ux/cls"

import { Component } from "react"
import Menu from "./side-menu/Menu"
import jQuery from "jquery"
import { waitForElm } from "@cp/global/fn"
import MenuDB from "@cp/global/models/Menu"

const mMenu = MenuDB.getInstance()
import side_menu from "@cp/global/installer/data/side-menu.json"
await mMenu.import(side_menu)
class SideMenu extends Component {
  selector = "#application-sidebar"
  backdropSelector = "div#sidebar-overlay-backdrop[data-hs-overlay-backdrop-template]"
  constructor(props) {
    super(props)
    this.state = {
      // sideMenuLinks: Object.assign({}, side_menu.links),
      menus: [],
      hideSidebar: false,
      showCaption: true,
    }
  }
  async reload() {
    const menus = await mMenu.getMenuList(100)
    this.setState({ menus })
  }
  waitBackdrop() {
    waitForElm(this.backdropSelector).then((el) => {
      const $el = jQuery(el)
      $el.on("click", () => {
        this.hideOverlay()
        $el.remove()
        setTimeout(() => {
          // console.log("Check backdrop 2")
          this.waitBackdrop()
        }, 3000)
      })
      const hasHandler = $el.prop("hasHandler")
      if (!hasHandler) {
        $el.prop("hasHandler", "yes")
        setTimeout(() => {
          // console.log("Check backdrop 1")
          this.waitBackdrop()
        }, 3000)
      }
    })
  }
  hideOverlay() {
    const overlayInstance = this.getOverlay()
    if (overlayInstance) {
      overlayInstance.element.close()
    }
  }
  getOverlay() {
    let instance = null
    try {
      const target = document.querySelector(this.selector)
      instance = HSOverlay.getInstance(target, true)
    } catch (e) {
      // console.log(e)
    }
    return instance
  }
  async componentDidMount() {
    this.waitBackdrop()
    const overlayInstance = this.getOverlay()
    if (!overlayInstance) {
      HSOverlay.autoInit()
    }
    const menus = await mMenu.getMenuList(100)
    this.setState({ menus })
  }
  render() {
    const { store, config } = this.props
    const { menus, showCaption } = this.state
    return (
      <>
        <nav className={cls13}>
          <Menu showCaption={showCaption} data={menus} store={store} config={config} />
        </nav>
      </>
    )
  }
}

export default SideMenu
