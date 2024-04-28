import Button from "../shared/ux/Button"
import JsonView from "react18-json-view"
import { useEffect, useRef, useState } from "react"
import { github, DirectoryListing, dataUrlToFile, dataUrlToUint8Array } from "@cp/cloud/iso-git"
import { getFile64 } from "@cp/global/fn"
import initSqlJs from "sql.js"
const { fs, fsp, dir, git } = github

const SqlJsDemo = ({}) => {
  const containerCls = "border mb-2 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700"
  const [databasePath, setDatabasePath] = useState(`${dir}/cms.sqlite`)
  const db = null
  const loadDatabase = async () => {
    const filebuffer = await fsp.readFile(databasePath)

    initSqlJs({
      locateFile: () => {
        return "http://localhost:5000/node_modules/sql.js/dist/sql-wasm.wasm"
      },
    }).then((SQL) => {
      // Load the db
      const db = new SQL.Database(filebuffer)
      console.log(db)

      // Prepare an sql statement
      const stmt = db.prepare("SELECT * FROM cms_user WHERE id=:bval")

      // Bind values to the parameters and fetch the results of the query
      const result = stmt.getAsObject({ ":bval": 1 })
      console.log(result)
    })
  }
  useEffect(() => {
    loadDatabase()
  }, [])
  return (
    <>
      Sql Js Demo
      <div className="min-h-screen">
        <div className="flex flex-col py-4 justify-between">
          <div className="flex gap-2">
            <div className="flex gap-2"></div>
          </div>
          <div>
            <span>Database : </span>
            <span className="font-mono">{databasePath}</span>
          </div>
        </div>

        {
          // showForm?<MenuForm data={formData} className={containerCls} hideForm={e=>setShowForm(false)}/>:null
        }

        <div className={`native-client ${containerCls}`}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SqlJsDemo
