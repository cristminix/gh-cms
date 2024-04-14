// console.log(parserBuff)
import { unescape } from "underscore"
import path from "path"
import fs from "fs"
function decodeHTMLEntities(text) {
  var entities = [
    ["amp", "&"],
    ["apos", "'"],
    ["#x27", "'"],
    ["#x2F", "/"],
    ["#39", "'"],
    ["#47", "/"],
    ["lt", "<"],
    ["gt", ">"],
    ["nbsp", " "],
    ["quot", '"'],
  ]

  for (var i = 0, max = entities.length; i < max; ++i)
    text = text.replace(new RegExp("&" + entities[i][0] + ";", "g"), entities[i][1])

  return text
}
export function saveTwigComponent(id, parserBuff, mainComponentName, kind) {
  try {
    const fileDir = path.dirname(id)
    const componentDir = path.join(".", ".generated-react-jsx", kind)

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, true)
    }
    const componentFilePath = `${componentDir}/${mainComponentName}.jsx`

    fs.writeFileSync(componentFilePath, decodeHTMLEntities(parserBuff))
    console.log(`Generated React JSX file: ${componentFilePath}`)
  } catch (e) {
    console.error(e)
  }
}
