import { cls10, cls11, cls12 } from "@cp/components/shared/ux/cls"

// import appLogoDark from "/logo/github-mark-white.png"
import appLogo from "/logo/github-mark-white.png"
import SideMenu from "./SideMenu"
import { useEffect, useRef, useState } from "react"
const Sidebar = ({ store, config }) => {
  const sideMenuRef = useRef(null)
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
        className={`${sidebarCls}`}
        data-hs-overlay-backdrop-container="#sidebar-overlay-backdrop"
      >
        <div className={cls11}>
          {/* <a href="#" aria-label="Brand" className={cls12}> Brand </a>  */}
          <a className={cls12} href="#" aria-label="Brand">
            <div className="flex dark:bg-transparent bg-gray-300 p-2 rounded rounded-md">
              <img src={appLogo} className="w-[48px] h-[48px]" />{" "}
              <div className="m-3">GH CMS</div>
            </div>
          </a>
        </div>
        <SideMenu store={store} config={config} ref={sideMenuRef} />
      </div>
      {/*<!-- End Sidebar -->*/}
    </>
  )
}

export default Sidebar
