import React from "react"
import ReactDOM from "react-dom/client"
// import OptionPage from './components/OptionPage'
import "@cp/global/tailwind.index.css"
import "./main.css"
import Store from "@cp/global/models/Store"
import Router from "./Router"
import AppConfig from "@cp/global/config/AppConfig"
import "bootstrap-icons/font/bootstrap-icons.css"
import "fontawesome-4.7/css/font-awesome.min.css"
import "@cp/components/shared/ux/override"
import AppInstaller from "@cp/global/installer/AppInstaller"

const store = Store.getInstance()
const config = AppConfig.getInstance()
const installer = new AppInstaller()

installer.isFreshIstall().then(async (freshInstall) => {
  if (freshInstall) {
    console.log("fresh install")
    await installer.onInstall()
  } else {
    store.ready(() => {
      ReactDOM.createRoot(document.getElementById("root")).render(
        // <React.StrictMode>
        <Router store={store} config={config} />,
        // </React.StrictMode>
      )
    })
  }
})
