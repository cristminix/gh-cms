// console.log(parserBuff)
import { unescape } from "underscore"
import path from "path"
import fs from "fs"
import { crc32 } from "crc"
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
export function saveTwigCompiled(templateRendered, mainComponentName, kind) {
  try {
    const componentDir = path.join(".", ".compiled-twig", kind)

    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir)
    }
    const componentFilePath = `${componentDir}/${mainComponentName}.twig`
    const bufferCrc = crc32(templateRendered).toString(16)
    let fileCrc = null 
    if(fs.existsSync(componentFilePath)){
      fileCrc = crc32(fs.readFileSync(componentFilePath, "utf-8")).toString(16)

    }
    let continueWriteFile = bufferCrc != fileCrc
    if (continueWriteFile) {
      fs.writeFileSync(componentFilePath, decodeHTMLEntities(templateRendered))
      console.log(`Generated twig compiled file: ${componentFilePath}`)
    }
  } catch (e) {
    console.error(e)
  }
}
