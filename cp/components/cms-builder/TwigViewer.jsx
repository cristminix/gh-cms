// import Template from "../../../themes/green-ponpes/templates"
import { createElement, useEffect, useState } from "react"
import HotModuleReloadSetup from "@lib/shared/HotModuleReloadSetup.js"

// Setup HMR
// Load a module that will be updated dynamically
const TwigViewer = ({ path }) => {
  const [tpl, setTpl] = useState(null)
  const loadPath = async () => {
    const hmr = new HotModuleReloadSetup({
      onHotReload: (obj) => {
        setTpl(obj)
      },
    })

    try {
      const tstamp = new Date().getTime()
      hmr.import(await import(`../../../${path}?import&t=${tstamp}`))
      const [instanceKey] = Object.keys(hmr.instances)
      const instance = hmr.instances[instanceKey]
      setTpl(instance)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    if (path) {
      loadPath()
    }
  }, [path])
  return <>{tpl && tpl}</>
}

export default TwigViewer
