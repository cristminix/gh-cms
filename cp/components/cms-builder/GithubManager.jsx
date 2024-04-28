import Button from "../shared/ux/Button"
import JsonView from "react18-json-view"
import { useEffect, useRef, useState } from "react"
import { github, DirectoryListing, dataUrlToFile, dataUrlToUint8Array } from "@cp/cloud/iso-git"
import { getFile64 } from "@cp/global/fn"

const { fs, fsp, dir, git } = github
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
    // console.log(lsContents)
  }
  const getStatusTree = async () => {
    let { files, changes } = await throughDirectory()
    if (changes > 0) {
      return true
    }

    // // All the files in the current staging area
    files = await git.listFiles({ fs, dir, ref: "HEAD" })
    for (const item of files) {
      const absolutePath = `${dir}/${item}`
      const filepath = absolutePath.replace(`${dir}/`, "")
      let status = await git.status({ fs, dir, filepath })

      if (status === "*deleted") {
        await github.remove(filepath)
        status = "deleted"
      }
      if (["modified", "added", "deleted"].includes(status)) {
        changes += 1
      }
      // console.log(status)
    }
    return { files, changes }
  }

  const throughDirectory = async () => {
    const files = []
    let changes = 0
    const walkDirectory = async (targetDir) => {
      const listing = await fsp.readdir(targetDir)
      for (const item of listing) {
        const absolutePath = `${targetDir}/${item}`
        const stat = await fsp.stat(absolutePath)
        if (stat.type === "dir" && item !== ".git") {
          await walkDirectory(absolutePath)
        } else {
          if (item !== ".git") {
            const filepath = absolutePath.replace(`${dir}/`, "")
            let status = await git.status({ fs, dir, filepath })

            if (status === "*added") {
              await github.add(filepath)
              status = "added"
            }
            if (status === "*deleted") {
              await github.remove(filepath)
              status = "deleted"
            }
            if (["modified", "added", "deleted"].includes(status)) {
              changes += 1
            }
            // console.log(status)
            files.push({ filepath, status })
          }
        }
      }
    }
    await walkDirectory(dir)
    return { files, changes }
  }
  const deleteFile = async (filename) => {
    if (confirm(`Delete ${filename}`)) {
      try {
        await fsp.unlink(`${fsBasePath}/${filename}`)
        listFs()
      } catch (error) {}
    }
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
                  // github.status()
                  getStatusTree()
                }}
              />
              <Button
                icon="fa fa-history"
                caption="Commit"
                onClick={async (e) => {
                  const { changes } = await getStatusTree()
                  if (changes > 0) {
                    const sha = await github.commit(`Commit message at ${new Date()}`)
                    console.log(sha, changes)
                  } else {
                    console.log(changes)
                  }
                }}
              />

              <Button
                icon="fa fa-upload"
                caption="Push"
                onClick={async (e) => {
                  await github.push()
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
                  <DirectoryListing
                    ls={ls}
                    fsp={fsp}
                    fsBasePath={fsBasePath}
                    deleteFile={deleteFile}
                    setFsBasePath={setFsBasePath}
                  />
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
