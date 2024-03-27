// import twigPkg from "twig"
import { parseTemplate } from "./fn"
import { transformWithEsbuild } from "vite"
// const twigFn = twigPkg.twig
export default function twig() {
  return {
    name: "vite-plugin-twig-loader",
    async transform(code, id) {
      if (id.endsWith(".twig")) {
        const scriptBuffer = await parseTemplate(code, id)
        return transformWithEsbuild(scriptBuffer, id, {
          loader: "jsx",
          jsx: "automatic",
        })
      }

      return null
    },
   

    // handleHotUpdate({ server, modules, timestamp, file }) {
    //    if (file.endsWith(".twig")) {
    //     console.log(file)
    //     server.ws.send({
    //       type: "custom",
    //       event: "tpl-update",
    //     })
    //    }
    // },
  }
}
