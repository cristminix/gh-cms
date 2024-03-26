import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"

import ReactMarkdown from "react-markdown"
import { cmsApiUrl } from "./apps/fn"

import "@cp/global/styles/markdown-viewer.css"

export async function loader({ params }) {
  const { mod, fk, pageNumber } = params
  return { mod, pageNumber, fk }
}

const ManualApp = ({ store, config }) => {
  const { mod, pageNumber, fk } = useLoaderData()
  const [markdown, setMarkdown] = useState("")
  const loadMarkdown = async (module) => {
    console.log(module)
    // if (module == "dev-notes") {
    const url = cmsApiUrl(["man/getFile", `${module}.md`])
    const response = await fetch(url).then((response) => response.json())
    if (response.success) {
      const text = response.content
      setMarkdown(text)
    } else {
      alert(response.message)
    }
    // }
  }
  useEffect(() => {
    loadMarkdown(mod)
  }, [mod])

  return (
    <article className="markdown-viewer">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </article>
  )
}

export default ManualApp
