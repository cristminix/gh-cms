import { useEffect, useState, createElement } from "react"
export async function loader({ params }) {
  const { template } = params
  return { template }
}
import { useLoaderData } from "react-router-dom"

const CMSApp = () => {
  let { template } = useLoaderData()
  const [page, setPage] = useState(null)

  const [tpl, setTpl] = useState(null)
  const templates = {}

  useEffect(() => {
    if (!template) {
      template = "homepage"
    }
    if (templates[template]) {
      setTpl(templates[template])
    } else {
      import(`../../templates/${template}.twig`).then((module) => {
        // templates[template] =
        const tplSet = createElement(module.default)
        setTpl(tplSet)
        // setTpl(templates[template])
      })
    }
  }, [template])

  return tpl
}

export default CMSApp
