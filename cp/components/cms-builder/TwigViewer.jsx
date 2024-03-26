// import Template from "../../../themes/green-ponpes/templates"
import { createElement, useEffect, useState } from "react"
const TwigViewer = ({ path }) => {
  const [tpl, setTpl] = useState(null)
  const loadPath = async () => {
    console.log(path)
    try {
      const moduleImport = await import(`../../../${path}?import`)
      setTpl(createElement(moduleImport.default))
      console.log(moduleImport)
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
