import twigPkg from "twig"
import twingPkg from "twing"
const { twig } = twigPkg
import {
  capitalize,
  snakeToCamel,
  camelToSnake,
  slugify,
} from "../green-ponpes/js/components/fn"
// import { createArrayLoader, createEnvironment } from "twing"
import { createArrayLoader, createEnvironment } from "twing"
import { applyEnvFunction } from "../green-ponpes/js/components/fn.js"
async function parseTemplate(code, id, templateData = {}) {
  const twigObj = twig({ data: code })
  let newSourceBuffer = []
  let importBuffer = []
  twigObj.tokens.forEach((token) => {
    console.log(token)

    if (token.type == "logic") {
      if (token.token.type == "Twig.logic.type.include") {
        // console.log(token.token.stack)
        const tplInclude = token.token.stack[0].value
        const componentName = capitalize(snakeToCamel(slugify(tplInclude)))
        if (tplInclude.match(/^\./)) {
          newSourceBuffer.push(`<${componentName}/>`)
          importBuffer.push({
            name: componentName,
            tpl: tplInclude,
          })
        }
      } else if (token.token.type == "Twig.logic.type.for") {
        const line = code.substring(
          token.position.open.start,
          token.position.close.end,
        )
        console.log(line)
        if (line.length > 0) {
          // console.log(line)
          if (!newSourceBuffer.includes(line)) {
            newSourceBuffer.push(line)
          }
        }
      } else {
        const line = code.substring(token.position.start, token.position.end)
        console.log(line)
        if (line.length > 0) {
          // console.log(line)
          if (!newSourceBuffer.includes(line)) {
            newSourceBuffer.push(line)
          }
        } else {
          // console.log(token.value.replace(/\n/g, ""))
          if (!newSourceBuffer.includes(token.value)) {
            newSourceBuffer.push(token.value)
          }
        }
      }
    } else {
      const line = code.substring(token.position.start, token.position.end)
      if (line.length > 0) {
        // console.log(line)
        if (!newSourceBuffer.includes(line)) {
          newSourceBuffer.push(line)
        }
      } else {
        // console.log(token.value.replace(/\n/g, ""))
        if (!newSourceBuffer.includes(token.value)) {
          newSourceBuffer.push(token.value)
        }
      }
      // newSourceBuffer.push(`${line.length > 0 ? `${line}` : token.value}`)
    }
  })
  // console.log(importBuffer)
  // console.log(newSourceBuffer)
  let parserBuff = ""
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
  const mainComponentName = capitalize(snakeToCamel(slugify(id)))
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
  console.log(twigTplData)
  const environment = createEnvironment(loader)
  applyEnvFunction(environment, tplData)
  const twigTplRendered = await environment.render(`${id}`, tplData)
  parserBuff += `
import {useEffect,useState} from "react"

  const ${mainComponentName} = ({}) => {


    
  return <>${twigTplRendered}</>
    
} 
export default ${mainComponentName}
    `
  return parserBuff
}

export { parseTemplate }
