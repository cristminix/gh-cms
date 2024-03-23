// import TwigTemplate from "./TwigTemplate"

// import Template from "@templates/homepage.twig"
// console.log(Template)
import { useEffect, useState, createElement } from "react"
import {
  createEnvironment,
  createArrayLoader,
  createFilter,
  createFunction,
} from "twing"

// const loader = createArrayLoader({
//     './hello.twig': 'Everybody loves {{ name }}!',
//     'index.twig': 'Everybody loves {{ name }}! {% include "./hello.twig"%}'
// });

// const environment = createEnvironment(loader);

// environment.render('index.twig', {name: 'Twing'}).then((output) => {
//     // output contains "Everybody loves Twing!"
//     console.log(output);
// });
const twigAddFilter = (env, name, filterFn, argList = ["string"]) => {
  const twgFilter = createFilter(
    name,
    (_executionContext, inputArg) => {
      return Promise.resolve(filterFn(inputArg))
    },
    argList,
  )
  env.addFilter(twgFilter)
}
const twigAddFunction = (
  env,
  name,
  fn,
  argList = ["string"],
  usePromise = false,
) => {
  const twgFn = createFunction(
    name,
    (_executionContext, a, b, c, d, e, f, g) => {
      if (usePromise) {
        return fn(a, b, c, d, e, f, g)
      } else {
        return Promise.resolve(fn(a, b, c, d, e, f, g))
      }
    },
    argList,
  )
  env.addFunction(twgFn)
}
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
  return `http://localhost:7700/${dst}`
}
const themeUrl = (theme, path) => `/themes/${theme}/${path}`

const applyEnvFunction = async (environment, tplData) => {
  const theme = "green-ponpes"
  twigAddFunction(
    environment,
    "web_menu_get_list",
    (limit, page) =>
      fetch(apiUrl("web/tplFunc/web_menu_get_list", { limit, page })).then(
        (r) => r.json(),
      ),
    ["limit", "page"],
    true,
  )
  twigAddFunction(
    environment,
    "web_contact_person_get_list",
    (limit, page) =>
      fetch(
        apiUrl("web/tplFunc/web_contact_person_get_list", {
          limit,
          page,
          order_by: "id",
          order_dir: "asc",
        }),
      ).then((r) => r.json()),

    ["limit", "page"],
    true,
  )
  twigAddFunction(
    environment,
    "web_get_company",
    async () => {
      const company = await fetch(apiUrl("web/tplFunc/web_get_company")).then(
        (r) => r.json(),
      )
      const fixUrlProps = ["logo", "logoSm", "logoMd", "logoLg", "logoXl"]
      Object.keys(company).forEach((key) => {
        if (fixUrlProps.includes(key)) {
          const rgxThemeUrl = new RegExp("{themeUrl}", "g")
          if (rgxThemeUrl.test(company[key])) {
            company[key] = company[key].replace(
              rgxThemeUrl,
              `/themes/${websiteSetting.theme}`,
            )
          }
        }
      })
      return company
    },
    [],
    true,
  )
  twigAddFunction(
    environment,
    "page_title",
    (title) => (tplData.page.title = title),
    ["title"],
  )
  twigAddFunction(
    environment,
    "theme_url",
    (path) => apiUrl(`themes/${theme}/${path}`),
    ["url"],
  )
  twigAddFunction(
    environment,
    "set_meta_description",
    (description) => (tplData.page.meta.description = description),
    ["description"],
  )
  twigAddFunction(
    environment,
    "set_meta_keywords",
    (keywords) => (tplData.page.meta.keywords = keywords),
    ["keywords"],
  )
}
const CMSApp = () => {
  const [loader, setLoader] = useState(null)
  const [env, setEnv] = useState(null)
  const [contents, setContents] = useState([])
  // const loader = createArrayLoader({
  //     './hello.twig': 'Everybody loves {{ name }}!',
  //     'index.twig': 'Everybody loves {{ name }}! {% include "./hello.twig"%}'
  // });

  // const environment = createEnvironment(loader);
  const tplData = {}
  const loadTpl = async (slug) => {
    const resp = await fetch(apiUrl(`arrayLoader/${slug}`)).then((r) =>
      r.json(),
    )
    const { tpls } = resp
    console.log(tpls)
    const loader = createArrayLoader(tpls)
    const environment = createEnvironment(loader)
    applyEnvFunction(environment, tplData)
    setEnv(environment)
    const contents = []
    Object.keys(tpls).forEach(async (path) => {
      try {
        const content = await environment.render(`${path}`, tplData)
        const contentEl = createElement("div", {
          dangerouslySetInnerHTML: { __html: content },
        })
        contents.push(contentEl)
      } catch (err) {
        console.error(`Error processing template path: ${path}`)
        // console.log(err)
      }
    })
    setContents(contents)
  }
  const data = {}
  useEffect(() => {
    loadTpl("homepage")
  }, [])
  return (
    <div>
      <h1>CMS App</h1>
      {contents.map((content, idx) => (
        <div key={idx}>{content}</div>
      ))}
    </div>
  )
}

export default CMSApp
