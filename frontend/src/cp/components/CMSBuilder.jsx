import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"

import ReactMarkdown from "react-markdown"
import { apiUrl } from "./apps/fn"

import "@/cp/global/styles/markdown-viewer.css"
import WebMenuManager from "./cms-builder/WebMenuManager"
import WebThemeManager from "./cms-builder/WebThemeManager"

export async function loader({ params }) {
  const { module, fk, pageNumber } = params
  return { module, pageNumber, fk }
}

const CMSBuilder = ({ store, config }) => {
  const { module, pageNumber, fk } = useLoaderData()
  const [markdown, setMarkdown] = useState("")
  // const loadMarkdown = async (module) => {
  console.log(module)
  if (module == "web-menu-manager") {
    return <WebMenuManager store={store} config={config} />
  } else if (module == "web-theme-manager") {
    return <WebThemeManager store={store} config={config} />
  }
  // }
  // useEffect(() => {
  // loadMarkdown(mod)
  // }, [mod])

  // return <>{module}</>
}

export default CMSBuilder
