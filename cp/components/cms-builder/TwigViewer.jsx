// import Template from "../../../themes/green-ponpes/templates"
import { createElement, useEffect, useState } from "react"
import HotModuleReloadSetup from "@lib/shared/HotModuleReloadSetup.js"

// Setup HMR
// Load a module that will be updated dynamically
const TwigViewer = ({ path }) => {
  const [tpl, setTpl] = useState(null)
  const loadPath = async () => {
    console.log(path)
    // const mainComponentName = capitalize(snakeToCamel(slugify(id)))
    const hmr = new HotModuleReloadSetup({
      onHotReload: (obj) => {
        // console.log(obj)
        // // setTpl(obj)
        setTpl(obj)
      },
    })

    try {
      hmr.import(await import(`../../../${path}?import`))
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
