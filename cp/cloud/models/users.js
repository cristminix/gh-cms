import initSqlJs from "sql.js"
import dbconfig from "../config/database.json"
console.log(dbconfig)
// const SQL = await initSqlJs({ locateFile: (file) => dbconfig["cp8tg0tbik.sqlite.cloud"].connectionString })
// const db = new SQL.Database()
// const stmt = db.prepare("SELECT * FROM cms_user")
import { createDbWorker } from "sql.js-httpvfs"

// sadly there's no good way to package workers and wasm directly so you need a way to get these two URLs from your bundler.
// This is the webpack5 way to create a asset bundle of the worker and wasm:
const workerUrl = new URL("sql.js-httpvfs/dist/sqlite.worker.js", import.meta.url)
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url)
// the legacy webpack4 way is something like `import wasmUrl from "file-loader!sql.js-httpvfs/dist/sql-wasm.wasm"`.

// the config is either the url to the create_db script, or a inline configuration:
const config = {
  from: "inline",
  config: {
    serverMode: "full", // file is just a plain old full sqlite database
    requestChunkSize: 4096, // the page size of the  sqlite database (by default 4096)
    url: dbconfig["gh-cms-repo"].connectionString, // url to the database (relative or full)
  },
}
// Bind values to the parameters and fetch the results of the query
// const result = stmt.getAsObject()
// console.log(result) // Will print {a:1, b:'world'}
let maxBytesToRead = 10 * 1024 * 1024
const worker = await createDbWorker(
  [config],
  workerUrl.toString(),
  wasmUrl.toString(),
  maxBytesToRead, // optional, defaults to Infinity
)
// you can also pass multiple config objects which can then be used as separate database schemas with `ATTACH virtualFilename as schemaname`, where virtualFilename is also set in the config object.

// worker.db is a now SQL.js instance except that all functions return Promises.

export const doLogin = async (username, password) => {
  const results = await worker.db.exec(`select * from cms_user where username = ? and passwd = ?`, [username, password])
  worker.worker.bytesRead = 0
  if (results.length > 0) {
    const row = {}
    const { columns, values } = results[0]
    columns.forEach((column, index) => {
      row[column] = values[0][index]
    })
    return row
  }
  return false
  // console.log(result)
  // worker.worker.bytesRead is a Promise for the number of bytes read by the worker.
  // if a request would cause it to exceed maxBytesToRead, that request will throw a SQLite disk I/O error.
  console.log(await worker.worker.bytesRead)
}
