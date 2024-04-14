import { useEffect, useState, createElement } from "react"
export async function loader({ params }) {
  const { path } = params
  return { path }
}
import { useLoaderData } from "react-router-dom"
import base64 from "base-64"
const TemplateViewer = ({}) => {
  let { path } = useLoaderData()
  const [page, setPage] = useState(null)

  const [tpl, setTpl] = useState(null)
  const templates = {}

  useEffect(() => {
    if (path) {
      const realPath = base64.decode(path)
      console.log(realPath)
      import(`../../../../${realPath}`).then((module) => {
        // templates[template] =
        const tplSet = createElement(module.default)
        setTpl(tplSet)
        // setTpl(templates[template])
      })
    }
  }, [path])

  return tpl
}

export default TemplateViewer
