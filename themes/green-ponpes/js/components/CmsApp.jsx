import { useEffect, useState, createElement } from "react"
export async function loader({ params }) {
  const { template, path } = params
  return { template, path }
}
import { useLoaderData } from "react-router-dom"
import base64 from "base-64"
const CMSApp = () => {
  let { template, path } = useLoaderData()
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
      if (path) {
        path = base64.decode(path)
        path = path.replace("themes/green-ponpes/templates/", "")

        import(`../../templates/${path}?import`  /* @vite-ignore */ ).then((module) => {
          // templates[template] =
          const tplSet = createElement(module.default)
          setTpl(tplSet)
          // setTpl(templates[template])
        })
      } else {
        import(`../../templates/${template}.twig`  /* @vite-ignore */ ).then((module) => {
          // templates[template] =
          const tplSet = createElement(module.default)
          setTpl(tplSet)
          // setTpl(templates[template])
        })
      }
    }
  }, [template, path])

  return tpl
}

export default CMSApp
