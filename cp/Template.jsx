import { useState, useEffect, useRef } from "react"
import Sidebar from "./components/ux/Sidebar"
import SidebarToggle from "./components/ux/SidebarToggle"
import Content from "./components/ux/Content"
import DialogContent from "@cp/components/shared/ux/DialogContent"

import { cls0 } from "@cp/components/shared/ux/cls"
import TopHeader from "./components/ux/TopHeader"
import { useCookies } from "react-cookie"
import { useAuth } from "./firebase/auth"
const Template = ({ store, config }) => {
  const [cookies] = useCookies(["uid", "requestToken"])
  const { isLoading, user } = useAuth()
  const isAuthed = !!user
  const isLogedIn = isAuthed
  // console.log(isAuthed, user, isLogedIn)
  const sideMenuRef = useRef(null)

  const [hideSidebar, setHideSidebar] = useState(false)
  const [showCaptionMenu, setShowCaptionMenu] = useState(true)
  const dialogContentRef = useRef(null)
  const onToggleMenu = () => {
    console.log("onToggleMenu")
    const showCaption = sideMenuRef.current.state.showCaption
    console.log(showCaption)
    sideMenuRef.current.setState({ showCaption: !showCaption })
    // setHideSidebar(true)
    setShowCaptionMenu(!showCaption)
  }
  useEffect(() => {
    config.getUiConfig().applyHiddenSidebarStatus(
      setHideSidebar,
      (status) => {
        console.log(status)
        setHideSidebar(status)
      },
      "template",
    )
    window.dialogContentRef = dialogContentRef
  }, [])

  useEffect(() => {
    console.log(cookies)
    console.log(isLogedIn)
  }, [isLogedIn])
  return (
    <>
      <div className={cls0}>
        <TopHeader isLogedIn={isLogedIn} store={store} config={config} onToggleMenu={onToggleMenu} />
        {/*<!-- ========== MAIN CONTENT ========== -->*/}
        <DialogContent ref={dialogContentRef} />
        {isLogedIn && (
          <>
            <SidebarToggle store={store} config={config} />
            <Sidebar store={store} config={config} sideMenuRef={sideMenuRef} showCaptionMenu={showCaptionMenu} />
          </>
        )}

        <Content
          isLoading={isLoading}
          isLogedIn={isLogedIn}
          store={store}
          config={config}
          showCaptionMenu={showCaptionMenu}
        />

        {/*<!-- ========== END MAIN CONTENT ========== -->*/}
      </div>
    </>
  )
}

export default Template
