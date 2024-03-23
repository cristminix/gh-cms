import Twig from "twig"
import twigPkg from "twig"
const twigFn = twigPkg.twig
export default function twig() {
  return {
    name: "vite-plugin-twig-loader",
    transform(code, id) {
      if (id.endsWith(".twig")) {
        return `export default  \`${code}\``
        const templateVars = []
        const templateFns = []
        let twigObj = null
        try {
          twigObj = twigFn({
            data: code,
          })
          console.log(twigObj)
          if (twigObj.parentTemplate === null) {
            // find token type
            twigObj.tokens.forEach((token) => {
              if (token.type === "output") {
                // console.log(token)
                token.stack.forEach((stack) => {
                  if (stack.type === "Twig.expression.type.variable") {
                    console.log("found template variable called", stack.value)
                    templateVars.push(stack.value)
                  }
                  if (stack.type === "Twig.expression.type.function") {
                    console.log("found template function called", stack.value)
                    templateFns.push(stack.value)
                  }
                })
              }
            })
          }
        } catch (e) {
          console.log(e)
        }

        const scriptBuffer = `
// import { twig } from 'twig'; 
import { useEffect, useState, createElement } from'react';
import jQuery from "jquery";

const TemplateComponent = ({data}) => {
  const [content, setContent] = useState(null)
  const [templateData, setTemplateData] = useState(data)
  const [rootProps, setRootProps] = useState(null)

  const getContent = async () =>{
    const content = await twig({
      data: \`${code}\`
    })
    let contentRoot = jQuery(content.render(templateData))
    if(contentRoot[0].nodeName === 'HTML'){
      contentRoot = contentRoot.find('body')
    }
    setRootProps({
      id : contentRoot.attr('id'),
      className : contentRoot.attr('class'),
      tagName : contentRoot[0].nodeName
    })

    setContent(contentRoot.html())
  }

  const getTemplateData = async () =>{
    
    // setTemplateData(templateData)
  }
  
  useEffect(()=>{
    getContent()
  },[templateData])

  useEffect(()=>{
    getTemplateData()
  },[])
  let element  = null
  if(rootProps)
    element = createElement('div', { id: rootProps.id, className:rootProps.className, dangerouslySetInnerHTML: { __html: content } })
  // console.log(element)
  return element
}
export default TemplateComponent;
`
        return scriptBuffer
      }

      return null
    },
  }
}
