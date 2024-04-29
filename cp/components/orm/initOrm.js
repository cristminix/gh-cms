import initSqlJs, { SqlValue } from "sql.js"
import { drizzle } from "drizzle-orm/sql-js"

export const initOrm = async (fsp, databasePath) => {
  try {
    const filebuffer = await fsp.readFile(databasePath)
    const sqlPromise = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })

    const sqldb = new sqlPromise.Database(filebuffer)
    const database = drizzle(sqldb)
    return database
  } catch (e) {
    console.error(e)
  }
  return null
}
