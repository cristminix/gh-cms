// import schema from "../../side_menu.json"

import { useEffect, useState } from "react"
import Pager from "@cp/components/shared/Pager"
import Grid from "@cp/components/shared/Grid"
import Button from "@cp/components/shared/ux/Button"
import { sendMessage } from "@cp/global/fn"
// import CheckBox from "@cp/components/shared/ux/CheckBox"
// import { devcmsApiUrl } from "../developers/fn"
import JsonView from "react18-json-view"
import UserData from "@cp/global/models/UserData"
import { useCookies } from "react-cookie"
// import jQuery from "jquery"
// const inputCls =
//   "py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
// import { crc32 } from "crc"

const ServerConfig = ({ store, config }) => {
  const [cookies] = useCookies(["requestToken", "uid"])

  const [grid, setGrid] = useState({
    records: [],
    limit: 5,
    page: 1,
    total_pages: 0,
    total_records: 0,
    order_by: "key",
    order_dir: "asc",
  })
  //   const [formData, setFormData] = useState(null)
  //   const [showForm, setShowForm] = useState(false)

  const onRefresh = (f) => f

  const runCmd = async (item, idx) => {
    // const data = item.data
    let data = { idx, ...item.data }
    const dataKeys = Object.keys(data)
    for (const key of dataKeys) {
      const idata = data[key]
      if (typeof idata === "function") {
        let result = "none"
        try {
          result = await idata()
        } catch {
          result = false
        }
        // console.log(result)
        data[key] = result
      }
    }
    console.log(data)

    setGrid((prevGrid) => {
      return {
        ...prevGrid,
        records: prevGrid.records.map((n_record, n_index) =>
          n_index === idx ? { ...n_record, status: 1, output: "" } : n_record,
        ),
      }
    })
    sendMessage(`nm.${item.cmd}`, data, "background", (response) => {
      console.log({ response })
      setGrid((prevGrid) => {
        return {
          ...prevGrid,
          records: prevGrid.records.map((n_record, n_index) =>
            n_index === idx ? { ...n_record, status: 2, param: data, output: response } : n_record,
          ),
        }
      })
    })
  }
  const gridOptions = {
    numberWidthCls: "1/8",
    actionWidthCls: "1/8",
    widthCls: ["1/4", "1/4", "1/4", "1/4"],
    headers: ["Name", "Value", "Default", "Description"],
    fields: ["name", "value", "defaultValue", "description"],
    enableEdit: true,
    // editUrl : (item) =>{ return `/DBerences/tts-server/${item.key}`},
    // remoteUrl : (item) => `${config.getApiEndpoint()}/api/tts/DBerence?key=${item.key}`,
    callbackHeaders: {},
    callbackFields: {
      defaultValue: (field, value, item) => {
        return <code>{item.defaultValue}</code>
      },
      value: (field, value, item) => {
        return <code>{item.value}</code>
      },
      param: (field, value, item) => {
        // console.log(item)
        try {
          value = JSON.parse(value)
        } catch (e) {
          value = ""
        }
        return <JsonView src={value} collapseStringsAfterLength={25} />
      },
      output: (field, value, item, index) => {
        try {
          value = JSON.parse(value)
        } catch (e) {
          value = ""
        }
        return <JsonView src={value} collapseStringsAfterLength={25} />
      },
    },

    callbackActions: {
      edit: (item, index, options, linkCls, gridAction) => {
        return (
          <>
            <Button loading={false} icon="fa fa-edit" caption="Edit" onClick={(e) => editValue(item, index)} />
          </>
        )
      },
    },
  }

  const updateList = async () => {
    const records = [
      {
        name: "backendEndpoint",
        description: "Backend url endpoint for cmsApiUrl",
        value: "",
        defaultValue: "http://localhost:7700",
      },
      {
        name: "viteTemplateEndpoint",
        description: "Backend Vite endpoint for template HMR",
        value: "",
        defaultValue: "http://localhost:3000",
      },
      {
        name: "enableAuth",
        description: "Enable App Auth",
        value: "",
        defaultValue: "no",
      },
    ]

    setGrid((prevGrid) => {
      return {
        ...prevGrid,
        records,
      }
    })
  }
  useEffect(() => {
    updateList()
  }, [])

  const containerCls = "border mb-2 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700"
  return (
    <div className="min-h-screen">
      {
        // showForm?<MenuForm data={formData} className={containerCls} hideForm={e=>setShowForm(false)}/>:null
      }

      <div className={`native-client ${containerCls}`}>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                {grid ? <Grid options={gridOptions} records={grid.records} page={grid.page} limit={grid.limit} /> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServerConfig
