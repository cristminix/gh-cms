import { Listing, Entry, Icon, Name, LastSaved } from "@nteract/directory-listing"
import { useEffect, useState } from "react"
import "./dir-list.css"
export const DirectoryListing = ({ ls, fsp, fsBasePath, setFsBasePath }) => {
  //   const [lsWithStat, setLsWithStat] = useState([])
  //     useEffect(()=>{

  //     },[ls])
  return (
    <Listing>
      <Entry className="!dark:bg-black">
        <Icon fileType="directory" />
        <Name>
          <a
            href="#listing"
            onClick={(e) => {
              const pathSplit = fsBasePath.split("/")
              pathSplit.pop()
              setFsBasePath(`${pathSplit.join("/")}`)
              e.preventDefault()
            }}
          >
            {".."}
          </a>
        </Name>
        <LastSaved lastModified={null} />
      </Entry>
      {ls.map((item, index) => {
        const { name, stat } = item
        const { type, mtimeMs } = stat
        return (
          <Entry key={index}>
            <Icon fileType={type === "dir" ? "directory" : "notebook"} />
            <Name>
              <a
                href="#"
                onClick={(e) => {
                  const loadFile = async () => {
                    const path = `${fsBasePath}/${name}`
                    if (type === "dir") {
                      setFsBasePath(path)
                    } else {
                      try {
                        console.log(stat)
                        console.log(await fsp.readFile(path, { encoding: "utf8" }))
                      } catch (error) {
                        console.error(error)
                      }
                    }
                  }
                  loadFile()
                  e.preventDefault()
                }}
              >
                {name}
              </a>
            </Name>
            <LastSaved lastModified={mtimeMs} />
          </Entry>
        )
      })}
    </Listing>
  )
}
