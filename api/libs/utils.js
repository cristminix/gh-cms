import { createFilter, createFunction } from "twing"

const calculateOffset = (pageNumber, limit) => {
  const offset = (pageNumber - 1) * limit
  return offset
}

const calculateTotalPages = (recordCount, limit) => {
  return Math.ceil(recordCount / limit)
}

const getCompiledSql = (builder) => {
  let [sql, params] = builder.getQueryAndParameters()
  params.forEach((value) => {
    if (typeof value === "string") {
      sql = sql.replace("?", `"${value}"`)
    }
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        sql = sql.replace(
          "?",
          value
            .map((element) =>
              typeof element === "string" ? `"${element}"` : element,
            )
            .join(","),
        )
      } else {
        sql = sql.replace("?", value)
      }
    }
    if (["number", "boolean"].includes(typeof value)) {
      sql = sql.replace("?", value.toString())
    }
  })

  return sql
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
export {
  calculateOffset,
  calculateTotalPages,
  getCompiledSql,
  snakeToCamel,
  camelToSnake,
  slugify,
  twigAddFilter,
  twigAddFunction,
  capitalize,
}
