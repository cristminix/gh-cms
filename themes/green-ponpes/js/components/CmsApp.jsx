import { useEffect, useState, createElement } from "react"
import HotModuleReloadSetup from "@lib/shared/HotModuleReloadSetup.js"
import { getTwigComponentName } from "./fn"
export async function loader({ params }) {
  const { template, path } = params
  return { template, path }
}
import { useLoaderData } from "react-router-dom"
import base64 from "base-64"

const CMSApp = () => {
  let { template, path } = useLoaderData()

  const [tpl, setTpl] = useState(null)
  const hmr = HotModuleReloadSetup.getInstance({
    onHotReload: (obj) => {
      if (typeof obj == "string") {
        if (obj == "refresh-parent") {
          // loadPath()
          console.log("Hello")
          loadPath(true)
        }
      } else {
        setTpl(obj)
      }
    },
  })
  const loadPath = async (t = null) => {
    console.log("loadPath called")
    let tplPath = ""
    let instanceKey = ""
    let tstamp = new Date().getTime()
    tstamp = `&t=${tstamp}`
    if (path) {
      path = base64.decode(path)
      path = path.replace("themes/green-ponpes/templates/", "")

      tplPath = `../../templates/${path}?import`
      instanceKey = getTwigComponentName(path)
    } else {
      if (!template) {
        template = "homepage"
      }
      tplPath = `../../templates/${template}.twig?import${tstamp}`
      instanceKey = getTwigComponentName(`${template}.twig`)
    }
    console.log(tplPath, instanceKey)
    try {
      hmr.import(await import(tplPath))
      console.log(hmr)
      const instance = hmr.instances[instanceKey]
      setTpl(instance)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    // if (path) {
    loadPath()
    // }
  }, [template, path])
  return <>{tpl && tpl}</>
}

export default CMSApp
