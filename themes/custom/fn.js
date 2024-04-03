import twigPkg from "twig"
import twingPkg from "twing"
import path from "path"
import fs from "fs"
const { twig } = twigPkg
import { capitalize, snakeToCamel, camelToSnake, slugify } from "../green-ponpes/js/components/fn"
import { createArrayLoader, createEnvironment } from "twing"
import { applyEnvFunction, getBlockFeatureByTemplate } from "../green-ponpes/js/components/fn.js"
// import jQuery from "jquery"
// import { Cheerio } from "cheerio"
import cheerio from "cheerio"
import { saveTwigComponent } from "./save-twig-component"
import { saveTwigCompiled } from "./save-twig-compiled"

async function parseTemplate(code, id, templateData = {}) {
  let importAttributes = {}
  let importAttribute = {}
  let hasImportAttr = false
  const basePath = path.basename(id)

  // try {
  //   const jsonStr = fs.readFileSync("./themes/custom/import-attributes.json")
  //   importAttributes = JSON.parse(jsonStr)
  //   if (importAttributes[basePath]) {
  //     console.log(basePath, importAttributes[basePath])
  //     hasImportAttr = true
  //     Object.keys(importAttributes[basePath]).forEach((key) => {
  //       const value = importAttributes[basePath][key]

  //       code = `{% set ${key}="${value}" %}\n${code}`
  //     })
  //   }
  // } catch (e) {
  //   console.log(e)
  // }

  const twigObj = twig({ data: code })
  let newSourceBuffer = []
  let importBuffer = []
  Object.keys(twigObj.tokens).forEach((index) => {
    const token = twigObj.tokens[index]

    if (token.type == "logic") {
      if (token.token.type == "Twig.logic.type.include") {
        const tplInclude = token.token.stack[0].value
        let tplIncludeBasePath = tplInclude.split("/").pop()
        const componentName = capitalize(snakeToCamel(slugify(tplInclude)))
        if (tplInclude.match(/^\./)) {
          newSourceBuffer.push(`<${componentName}/>`)
          importBuffer.push({
            name: componentName,
            tpl: tplInclude,
            path: tplIncludeBasePath,
          })
        }
      } else if (token.token.type == "Twig.logic.type.for") {
        const line = code.substring(token.position.open.start, token.position.close.end)
        // console.log(line)
        if (line.length > 0) {
          newSourceBuffer.push(line)
        }
      } else {
        const line = code.substring(token.position.start, token.position.end)
        // console.log(line)
        if (line.length > 0) {
          newSourceBuffer.push(line)
        } else {
          newSourceBuffer.push(token.value)
        }
      }
    } else {
      const line = code.substring(token.position.start, token.position.end)

      // console.log(index, "NOT LOGIC", token.type, token, line)
      if (line.length > 0) {
        newSourceBuffer.push(line)
      } else {
        newSourceBuffer.push(token.value)
      }
    }
  })
  // console.log(importBuffer)
  // console.log(newSourceBuffer)
  let parserBuff = ""
  let refBuffer = []
  importBuffer.forEach((item) => {
    const importPath = item.tpl
    if (item.tpl.match(/^\.\//)) {
      item.tpl = item.tpl.replace(/^\.\//, "@templates/")
    } else if (item.tpl.match(/^\.\.\/blocks/)) {
      item.tpl = item.tpl.replace(/^\.\.\/blocks\//, "@templates/blocks/")
    } else {
      item.tpl = `@default_templates/${item.tpl}`
    }
    parserBuff += `import ${item.name} from '${item.tpl}'\n`
  })
  // const tplPaths = id.split("/")
  // console.log(id)
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
  const twigTplData = `${newSourceBuffer.join("")}`

  const loader = createArrayLoader({
    [`${id}`]: twigTplData,
  })
  // console.log(twigTplData)
  const environment = createEnvironment(loader)
  applyEnvFunction(environment, tplData)
  let tplPath = id.split("/")
  tplPath = tplPath[tplPath.length - 1]
  let kind = "undef"
  if (id.match(/\/templates\/blocks/)) {
    kind = "block"
  } else if (id.match(/\/templates\/sections/)) {
    kind = "section"
  } else {
    kind = "template"
  }
  const mainComponentName = capitalize(snakeToCamel(tplPath.replace(".twig", `-${kind}`)))

  const blockFeatures = await getBlockFeatureByTemplate(tplPath)
  const loadScriptsBuffers = []
  if (blockFeatures) {
    blockFeatures.records.forEach((item) => {
      if (item.kind == "js") {
        loadScriptsBuffers.push(`
          console.log("${item.name} called")
          try{
          ${item.content}

          }catch(e){
            console.error(e)
          }

      `)
        /*loadScriptsBuffers.push(`
        useEffect(()=>{
          console.log("${item.name} called")
          try{
          ${item.content}

          }catch(e){
            console.error(e)
          }

        },[]) 
      `)*/
      }
    })
  }

  // console.log(loadScriptsBuffers)
  if (hasImportAttr) {
    // loadScriptsBuffers.push(`
    //       // console.log("rerender called")
    //       this.rerenderOnTarget(importAttributes)
    //       // console.log(importAttributes)
    //   `)
    // loadScriptsBuffers.push(`
    //     useEffect(()=>{
    //       console.log("hasImportAttr called")
    //       console.log(originalTpl)
    //     },[])
    //   `)
  }
  let twigTplRendered = await environment.render(`${id}`, tplData)
  const rgxRplcs = [
    [/class=/g, "className="],
    [/(<!--.*-->)/g, "{/*$1*/}"],
    [/(\"CLS_INDEX_)(\d+)(\")/g, "{cls$2}"],
    [/(\"STL_INDEX_)(\d+)(\")/g, "{styles.stl$2}"],
    [/clip-rule=/g, "clipRule="],
    [/fill-rule=/g, "fillRule="],
    [/viewbox=/g, "viewBox="],
    [/value=/g, "defaultValue="],
    [/for=/g, "htmlFor="],
    [/autocomplete=/g, "autoComplete="],
    [/stroke-width=/g, "strokeWidth="],
    [/stroke-linecap=/g, "strokeLinecap="],
    [/stroke-linejoin=/g, "strokeLinejoin="],
    [/\>\s*\<\/input\>/g, "/>"],
    [/\>\s*\<\/textarea\>/g, "/>"],
    [/\>\s*\<\/img\>/g, "/>"],
    [/\>\s*\<\/br\>/g, "/>"],
  ]
  rgxRplcs.forEach((rgxRplc, index) => {
    // console.log(rgxRplc)
    const [rgx, rplc] = rgxRplc
    twigTplRendered = twigTplRendered.replace(rgx, rplc)
  })
  const contentRoot = cheerio.load(`${twigTplRendered}`, { xml: true })
  // const linkTagKey = (new Date()).getTime().toString()
  contentRoot("a").each(function (o, elt) {
    var newElt = cheerio("<KINL/>")
    Array.prototype.slice.call(elt.attributes).forEach(function (a) {
      if (a.name == "href") {
        if (a.value == "javascript:;") {
          a.value = "#"
          newElt.attr("onClick", "KLIKPOON")
        }
        newElt.attr("to", a.value)
      } else newElt.attr(a.name, a.value)
    })
    cheerio(elt).wrapInner(newElt).children(0).unwrap()
  })
  twigTplRendered = contentRoot.html()
  twigTplRendered = twigTplRendered.replace(/KINL/gi, "Link")

  // const source = await loader.getSource(id)
  // console.log(source.code)
  parserBuff += `

import HotModuleReloadSetup,{ HMREventHandler } from '@lib/shared/HotModuleReloadSetup.js';
import TwigComponent from '@lib/shared/TwigComponent';

if (import.meta.hot) {
  import.meta.hot.accept(HMREventHandler)
}

import {useEffect,useState,Component} from "react"
import {Link} from "react-router-dom"
import importAttributes from "@themes/custom/import-attributes.json"
class ${mainComponentName} extends TwigComponent {
    constructor(props){
      super(props)
      this.path="${basePath}"
      this.code = \`${code}\`
      this.state = {
        content:null,
        rerender:false
      }
    }
    
    componentDidMount(){
    ${loadScriptsBuffers.join("\n")}

    this.rerenderOnTarget(importAttributes)
    }

    render(){
      return <>
      {this.state.rerender?<div dangerouslySetInnerHTML={{__html:this.state.content}}></div>:<>${twigTplRendered}</>}
        
      </>  
    }
} 
 
const hmrInstance = HotModuleReloadSetup.getInstance()
if (hmrInstance) {
  // console.log(hmrInstance.modules)
  hmrInstance.modules['${mainComponentName}']=${mainComponentName}
}
export default ${mainComponentName}


    `
  // saveTwigComponent(id, parserBuff, mainComponentName)
  saveTwigCompiled(twigTplRendered, mainComponentName, kind)
  return parserBuff
}

export { parseTemplate }
