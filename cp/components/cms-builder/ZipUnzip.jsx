import Button from "../shared/ux/Button"
import JsonView from "react18-json-view"
import { useEffect, useRef, useState } from "react"
import { github, DirectoryListing, dataUrlToFile, dataUrlToUint8Array } from "@cp/cloud/iso-git"
import { getFile64 } from "@cp/global/fn"
import initSqlJs from "sql.js"
import { initOrm } from "../orm/initOrm"
import { cms_user } from "../orm/schema"
const { fs, fsp, dir, git } = github
import cp from "../../../config/cp.json"
const { githubRepoZipUrl } = cp
import unzip from "@cp/cloud/iso-git/unzip"

const getZipFilename = (url) => {
  const urlSplit = url.split("/")
  return urlSplit[urlSplit.length - 1]
}
const ZipUnzip = ({}) => {
  const containerCls = "border mb-2 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700"
  const downloadDir = "/downloads"
  const [zipPath, setZipPath] = useState(`${downloadDir}/${getZipFilename(githubRepoZipUrl)}`)
  const db = null
  const loadDatabase = async () => {
    const database = await initOrm(fsp, databasePath)
    const res = database.select().from(cms_user).all()
    console.log(database)
    console.log(res)
  }
  const extract = async () => {
    var data = await fetch(githubRepoZipUrl),
      raw = new Uint8Array(await data.arrayBuffer())
    await unzip(raw, { odir: "/data", fs })
  }
  useEffect(() => {
    // loadDatabase()
    if (githubRepoZipUrl) extract()
  }, [githubRepoZipUrl])
  return (
    <>
      Zip Unzip Demo
      <div className="min-h-screen">
        <div className="flex flex-col py-4 justify-between">
          <div className="flex gap-2">
            <div className="flex gap-2"></div>
          </div>
          <div>
            <span>Zip Url: </span>
            <span className="font-mono">{githubRepoZipUrl}</span>
          </div>
          <div>
            <span>Zip Path: </span>
            <span className="font-mono">{zipPath}</span>
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

export default ZipUnzip
