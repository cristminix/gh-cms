import { createEnvironment, createArrayLoader, createFilter, createFunction } from "twing"
import { apiUrl } from "../../../../lib/shared/fn.js"
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
const twigAddFunction = (env, name, fn, argList = ["string"], usePromise = false) => {
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

const getBlockFeatureByTemplate = async (path) => {
  let data = null
  try {
    data = await fetch(apiUrl("web/tplFunc/web_block_feature_by_tpl_path", { tplPath: path })).then((r) => r.json())
  } catch (e) {
    // data = ["fuck"]
  }
  return data
}
const applyEnvFunction = async (environment, tplData) => {
  const theme = "green-ponpes"
  const themeUrl = (path) => `/themes/${theme}/${path}`
  const baseUrl = (path) => apiUrl(path)
  const dark = (path) => {
    const paths = path.split("/")
    paths[paths.length - 1] = `dark-${paths[paths.length - 1]}`
    return paths.join("/")
  }

  twigAddFunction(
    environment,
    "web_menu_get_list",
    (limit, page) => fetch(apiUrl("web/tplFunc/web_menu_get_list", { limit, page })).then((r) => r.json()),
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
      // console.log("web_get_company")
      const company = await fetch(apiUrl("web/tplFunc/web_get_company")).then((r) => r.json())

      const fixUrlProps = ["logo", "logoSm", "logoMd", "logoLg", "logoXl"]
      Object.keys(company).forEach((key) => {
        if (fixUrlProps.includes(key)) {
          const rgxThemeUrl = new RegExp("{themeUrl}", "g")
          const rgxThemeUrl2 = new RegExp("{themeUrl}/", "g")

          if (rgxThemeUrl.test(company[key])) {
            company[key] = company[key].replace(rgxThemeUrl, themeUrl(""))
            company[key] = company[key].replace(/\/\//g, "/")
          }
        }
      })
      return company
    },
    [],
    true,
  )
  twigAddFunction(environment, "page_title", (title) => (tplData.page.title = title), ["title"])
  twigAddFunction(environment, "theme_url", (path) => themeUrl(path), ["path"])
  twigAddFunction(environment, "base_url", (path) => baseUrl(path), ["path"])
  twigAddFunction(environment, "dark", (path) => dark(path), ["path"])
  twigAddFunction(environment, "set_meta_description", (description) => (tplData.page.meta.description = description), [
    "description",
  ])
  twigAddFunction(environment, "set_meta_keywords", (keywords) => (tplData.page.meta.keywords = keywords), ["keywords"])
}
function snakeToCamel(str) {
  return str.replace(/([-_]\w)/g, function (matches) {
    return matches.toUpperCase().replace("-", "").replace("_", "")
  })
}
function camelToSnake(str) {
  return str.replace(/[A-Z]/g, function (match) {
    return "-" + match.toLowerCase()
  })
}
const slugify = (str) => {
  const words = str.replace(/\W+/g, " ").split(" ")
  return words.join("-").toLowerCase()
}
const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
const getTwigComponentName = (path) => {
  let tplPath = path.split("/")
  tplPath = tplPath[tplPath.length - 1]
  let kind = "undef"
  if (path.match(/\/templates\/blocks/)) {
    kind = "block"
  } else if (path.match(/\/templates\/sections/)) {
    kind = "section"
  } else {
    kind = "template"
  }
  return capitalize(snakeToCamel(tplPath.replace(".twig", `-${kind}`)))
}

export {
  applyEnvFunction,
  camelToSnake,
  slugify,
  snakeToCamel,
  twigAddFilter,
  twigAddFunction,
  capitalize,
  getBlockFeatureByTemplate,
  getTwigComponentName,
}
