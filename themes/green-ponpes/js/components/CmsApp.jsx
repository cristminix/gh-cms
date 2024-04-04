import { useEffect, useState, createElement, useRef } from "react"
import HotModuleReloadSetup from "@lib/shared/HotModuleReloadSetup.js"
import { getTwigComponentName } from "./fn"
import { cmsApiUrl } from "@cp/components/apps/fn"
export async function loader({ params }) {
  const { template, path, slug, block } = params
  return { template, path, slug, block }
}
import { useLoaderData } from "react-router-dom"
import base64 from "base-64"
import { apiUrl } from "@lib/shared/fn"
import "./web.css"
const CMSApp = () => {
  let { template, path, slug, block } = useLoaderData()

  const [tpl, setTpl] = useState(null)
  const templateRef = useRef(template)
  const pathRef = useRef(path)
  const slugRef = useRef(slug)
  let hmr = HotModuleReloadSetup.getInstance({
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
    console.log(t, template, path, slug, block)
    console.log(t, templateRef.current, pathRef.current, slugRef.current)
    if (template) templateRef.current = template
    if (path) pathRef.current = path
    if (slug) slugRef.current = slug
    console.log("loadPath called")
    let tplPath = ""
    let instanceKey = ""
    let tstamp = new Date().getTime()
    tstamp = `&t=${tstamp}`
    if (pathRef.current) {
      pathRef.current = base64.decode(pathRef.current)
      pathRef.current = pathRef.current.replace("themes/green-ponpes/templates/", "")

      tplPath = `../../templates/${pathRef.current}?import`
      instanceKey = getTwigComponentName(pathRef.current)
    } else {
      if (!templateRef.current) {
        templateRef.current = "homepage"
      }
      tplPath = `../../templates/${templateRef.current}.twig?import${tstamp}`
      instanceKey = getTwigComponentName(`${templateRef.current}.twig`)
    }
    console.log(tplPath, instanceKey)
    const basePath = path ? pathRef.current : `${templateRef.current}.twig`
    if (slug) {
      // const data
      const res = await fetch(
        apiUrl("web/setImportAttributes", { target: block, key: "slug", value: slug, path: basePath }),
      ).then((r) => r.json())
      console.log(res)
    }
    try {
      hmr.import(await import(tplPath))
      // console.log(hmr)
      const instance = hmr.instances[instanceKey]
      setTpl(instance)
      hmr.options.onHotReload = (obj) => {
        if (typeof obj == "string") {
          if (obj == "refresh-parent") {
            // loadPath()
            console.log("Hello22")
            loadPath(true)
          }
        } else {
          setTpl(obj)
        }
      }
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
