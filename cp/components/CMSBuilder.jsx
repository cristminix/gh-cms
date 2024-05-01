import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"

import ReactMarkdown from "react-markdown"
import { cmsApiUrl } from "./apps/fn"

import "@cp/global/styles/markdown-viewer.css"
import WebMenuManager from "./cms-builder/WebMenuManager"
import WebThemeManager from "./cms-builder/WebThemeManager"
import WebBlockManager from "./cms-builder/WebBlockManager"
import WebTemplateManager from "./cms-builder/WebTemplateManager"
import WebPageManager from "./cms-builder/WebPageManager"
import WebCodeEditor from "./cms-builder/WebCodeEditor"
import WebSiteSetting from "./cms-builder/WebSiteSetting"
import WebCompany from "./cms-builder/WebCompany"
import WebContactPerson from "./cms-builder/WebContactPerson"
import WebBlockFeatureManager from "./cms-builder/WebBlockFeatureManager"
import GithubManager from "./cms-builder/GithubManager"
import SqlJsDemo from "./cms-builder/SqlJsDemo"
import ZipUnzip from "./cms-builder/ZipUnzip"

export async function loader({ params }) {
  const { module, fk, pageNumber, pk } = params
  return { module, pageNumber, fk, pk }
}

const CMSBuilder = ({ store, config }) => {
  const { module, pageNumber, fk, pk } = useLoaderData()
  const [markdown, setMarkdown] = useState("")
  // const loadMarkdown = async (module) => {
  console.log(module, pageNumber, fk, pk)
  if (module == "web-menu-manager") {
    return <WebMenuManager store={store} config={config} />
  } else if (module == "web-theme-manager") {
    return <WebThemeManager store={store} config={config} pageNumber={pageNumber} />
  } else if (module == "web-block-manager") {
    return <WebBlockManager store={store} config={config} pageNumber={pageNumber} templateId={fk} />
  } else if (module == "web-block-feature-manager") {
    return <WebBlockFeatureManager store={store} config={config} pageNumber={pageNumber} templateId={fk} />
  } else if (module == "web-template-manager") {
    return <WebTemplateManager store={store} config={config} pageNumber={pageNumber} themeId={fk} />
  } else if (module == "web-page-manager") {
    return <WebPageManager store={store} config={config} pageNumber={pageNumber} cmd={fk} pk={pk} />
  } else if (module == "website-setting") {
    return <WebSiteSetting store={store} config={config} pageNumber={pageNumber} />
  } else if (module == "web-company") {
    return <WebCompany store={store} config={config} pageNumber={pageNumber} />
  } else if (module == "web-contact-person") {
    return <WebContactPerson store={store} config={config} pageNumber={pageNumber} />
  } else if (module == "code-editor") {
    return <WebCodeEditor store={store} config={config} mode={fk} pk={pk} />
  } else if (module == "github-manager") {
    return <GithubManager store={store} config={config} mode={fk} pk={pk} />
  } else if (module == "sql-js") {
    return <SqlJsDemo store={store} config={config} mode={fk} pk={pk} />
  } else if (module == "gzip-js") {
    return <ZipUnzip store={store} config={config} mode={fk} pk={pk} />
  }
  // }
  // useEffect(() => {
  // loadMarkdown(mod)
  // }, [mod])

  // return <>{module}</>
}

export default CMSBuilder
