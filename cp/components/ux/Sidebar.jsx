import { cls10 } from "@cp/components/shared/ux/cls"

// import appLogoDark from "/logo/github-mark-white.png"
import SideMenu from "./SideMenu"
import { useEffect, useRef, useState } from "react"
const Sidebar = ({ store, config, sideMenuRef, showCaptionMenu }) => {
  const [hideSidebar, setHideSidebar] = useState(true)
  const toggle = () => {
    // const status = !hideSidebar
    // setHideSidebar(status)
    // config.getUiConfig().setHiddenSidebarStatus(status)
  }
  const reloadSidebar = (f) => {
    console.log("SideBar.reloadSidebar()")
    if (sideMenuRef.current) sideMenuRef.current.reload()
    // setSideMenuLinks({})
    // setTimeout(f=>setSideMenuLinks(side_menu.links),100)
  }
  useEffect(() => {
    config.getUiConfig().applyHiddenSidebarStatus(
      setHideSidebar,
      (status) => {
        console.log("setHideSidebar", status)
        setHideSidebar(status)
      },
      "sidebar",
    )
    config.getUiConfig().applyReloadSidebar((f) => {
      reloadSidebar()
    }, "sidebar")
  }, [])

  const sidebarCls = hideSidebar ? `lg:hidden ${cls10} ` : cls10
  return (
    <>
      {/*<!-- Sidebar -->*/}
      <div
        id="application-sidebar"
        className={`${sidebarCls} !rounded-md overflow-hidden lg:mt-[70px] lg:pt-4 ${showCaptionMenu ? "" : "lg:w-[90px]"}`}
        data-hs-overlay-backdrop-container="#sidebar-overlay-backdrop"
      >
        <SideMenu store={store} config={config} ref={sideMenuRef} />
      </div>
      {/*<!-- End Sidebar -->*/}
    </>
  )
}

export default Sidebar
