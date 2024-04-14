import { Component } from "react"
import twigPkg from "twig"
import twingPkg from "twing"
const { twig } = twigPkg
import { createArrayLoader, createEnvironment } from "twing"
import {
  capitalize,
  snakeToCamel,
  camelToSnake,
  slugify,
  applyEnvFunction,
  getBlockFeatureByTemplate,
} from "@themes/js/components/fn"

class TwigComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: null,
      rerender: false,
      containerCls: "",
    }
  }
  rerenderOnTarget(iAttr) {
    // console.log(iAttr)
    this.setState({
      containerCls: "",
    })
    const target = this.basePath.replace(".twig", "")
    Object.keys(iAttr).forEach((key) => {
      const opt = iAttr[key]
      if (opt.target == target) {
        return this.rerender(iAttr)
        // console.log(opt)
        // this.setState({ rerender: true, content: opt.content })
      }
    })
    // console.log(this.path)
    // console.log(this.code)
  }
  rerender(iAttr) {
    let code = this.code
    Object.keys(iAttr).forEach((key) => {
      const opts = iAttr[key]
      Object.keys(opts).forEach((prop) => {
        if (!["target"].includes(prop)) {
          code = `{% set ${prop}="${opts[prop]}" %}\n${code}`
          // this.code = code
        }
      })
    })
    console.log(code)
    const tplData = {
      page: {
        title: "",
        meta: {
          description: "This is a simple website.",
          author: "Author",
          keywords: "keyword1, keyword2",
        },
      },
    }

    const loader = createArrayLoader({
      [this.basePath]: code,
    })
    // console.log(twigTplData)
    const environment = createEnvironment(loader)
    applyEnvFunction(environment, tplData)
    environment
      .render(this.basePath, tplData)
      .then((content) => {
        console.log(content)
        this.setState({ rerender: true, content })
        this.setState({
          containerCls: "opacity-1 transition-opacity	duration-200 ease-in-out",
        })
      })
      .catch((e) => {
        console.error(e)
      })
    // this.setState({ rerender: true, content })
  }
}
export default TwigComponent
