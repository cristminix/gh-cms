import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"

import ReactMarkdown from "react-markdown"
import { apiUrl } from "./apps/fn"

import "@/cp/global/styles/markdown-viewer.css"
import WebMenuManager from "./cms-builder/WebMenuManager"
import WebThemeManager from "./cms-builder/WebThemeManager"
import WebBlockManager from "./cms-builder/WebBlockManager"
import WebTemplateManager from "./cms-builder/WebTemplateManager"
import WebPageManager from "./cms-builder/WebPageManager"

export async function loader({ params }) {
  const { module, fk, pageNumber } = params
  return { module, pageNumber, fk }
}

const CMSBuilder = ({ store, config }) => {
  const { module, pageNumber, fk } = useLoaderData()
  const [markdown, setMarkdown] = useState("")
  // const loadMarkdown = async (module) => {
  // console.log(module, pageNumber, fk)
  if (module == "web-menu-manager") {
    return <WebMenuManager store={store} config={config} />
  } else if (module == "web-theme-manager") {
    return <WebThemeManager store={store} config={config} pageNumber={pageNumber} />
  } else if (module == "web-block-manager") {
    return <WebBlockManager store={store} config={config} pageNumber={pageNumber} />
  } else if (module == "web-template-manager") {
    return <WebTemplateManager store={store} config={config} pageNumber={pageNumber} themeId={fk} />
  } else if (module == "web-page-manager") {
    return <WebPageManager store={store} config={config} pageNumber={pageNumber} />
  }
  // }
  // useEffect(() => {
  // loadMarkdown(mod)
  // }, [mod])

  // return <>{module}</>
}

export default CMSBuilder
