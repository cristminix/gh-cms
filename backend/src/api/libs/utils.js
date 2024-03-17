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
          value.map((element) => (typeof element === "string" ? `"${element}"` : element)).join(",")
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
export { calculateOffset, calculateTotalPages, getCompiledSql }
