import striptags from "striptags"
import appConfig from "../../config/app.json" assert { type: "json" }
const apiUrl = (path, qs = null) => {
  let dst = path
  if (Array.isArray(path)) {
    dst = path.join("/")
  }
  if (qs) {
    let querStrings = []
    Object.keys(qs).map((k) => {
      let v = qs[k]
      if (typeof v != "undefined" && v != null) {
        querStrings.push(`${k}=${v}`)
      }
    })
    if (querStrings.length > 0) {
      dst += `?${querStrings.join("&")}`
    }
  }

  const portConfig = `:${appConfig.port}`
  const useHttps = appConfig.useHttps
  return `http${useHttps ? "s" : ""}://${appConfig.host}${useHttps ? "" : portConfig}/${dst}`
}
function readingTime(text, stripTags = true) {
  if (stripTags) {
    text = striptags(text)
  }
  const wordsPerMinute = 200
  const noOfWords = text.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return `${readTime} menit baca`
}
export { apiUrl, readingTime }
