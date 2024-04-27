import { git } from "@cp/cloud/iso-git/test"
import Button from "../shared/ux/Button"
import JsonView from "react18-json-view"
import { useState } from "react"

const GithubManager = ({}) => {
  const containerCls = "border mb-2 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700"
  const [logs, setLogs] = useState([])
  return (
    <>
      Github Manager
      <div className="min-h-screen">
        <Button
          caption="Clone"
          onClick={(e) => {
            git.clone(setLogs)
          }}
        />
        {
          // showForm?<MenuForm data={formData} className={containerCls} hideForm={e=>setShowForm(false)}/>:null
        }

        <div className={`native-client ${containerCls}`}>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
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
