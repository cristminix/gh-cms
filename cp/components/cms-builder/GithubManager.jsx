import { git } from "@cp/cloud/iso-git/test"
import Button from "../shared/ux/Button"
import JsonView from "react18-json-view"
import { useEffect, useRef, useState } from "react"
import { github, DirectoryListing, dataUrlToFile, dataUrlToUint8Array } from "@cp/cloud/iso-git"
import { getFile64 } from "@cp/global/fn"
const { fs, fsp, dir } = github
console.log(fs)
const GithubManager = ({}) => {
  const containerCls = "border mb-2 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700"
  const [logs, setLogs] = useState([])
  const [ls, setLs] = useState([])
  const [fsBasePath, setFsBasePath] = useState(dir)
  const fileInputRef = useRef(null)
  const listFs = async () => {
    let lsNames = await fsp.readdir(fsBasePath)
    let lsContents = []
    let index = 0
    for (const name of lsNames) {
      const stat = await fsp.stat(`${fsBasePath}/${name}`)
      lsContents[index] = {
        name,
        stat,
      }
      index += 1
    }
    setLs(lsContents)
    console.log(lsContents)
  }
  useEffect(() => {
    listFs()
  }, [fsBasePath])
  return (
    <>
      Github Manager
      <div className="min-h-screen">
        <div className="flex flex-col py-4 justify-between">
          <div className="flex gap-2">
            <div className="flex gap-2">
              <Button
                icon="fa fa-copy"
                caption="Clone"
                onClick={(e) => {
                  github.clone()
                }}
              />
              <Button
                icon="fa fa-exclamation"
                caption="Status"
                onClick={(e) => {
                  github.status()
                }}
              />
              <Button
                icon="fa fa-history"
                caption="Commit"
                onClick={(e) => {
                  github.pull()
                }}
              />

              <Button
                icon="fa fa-upload"
                caption="Push"
                onClick={(e) => {
                  github.pull()
                }}
              />
              <Button
                icon="fa fa-download"
                caption="Pull"
                onClick={(e) => {
                  github.pull()
                }}
              />
            </div>
            <div className="flex gap-2 items-end">
              <Button
                icon="fa fa-plus"
                caption="Upload File"
                onClick={(e) => {
                  // git.clone(setLogs)
                  fileInputRef.current.click()
                }}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={async (e) => {
                  const [file] = e.target.files

                  const file64 = await getFile64(file)
                  let u = dataUrlToUint8Array(file64)
                  try {
                    await fsp.writeFile(`${fsBasePath}/${file.name}`, u)
                    await listFs()
                  } catch (e) {
                    console.error(e)
                  }
                  console.log(file, file64, u)
                }}
              />
            </div>
          </div>
          <div>
            <span>Path : </span>
            <span className="font-mono">{fsBasePath}</span>
          </div>
        </div>

        {
          // showForm?<MenuForm data={formData} className={containerCls} hideForm={e=>setShowForm(false)}/>:null
        }

        <div className={`native-client ${containerCls}`}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <DirectoryListing ls={ls} fsp={fsp} fsBasePath={fsBasePath} setFsBasePath={setFsBasePath} />
                  {logs.map((output, index) => {
                    return <JsonView src={output} key={index} collapseStringsAfterLength={25} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GithubManager
