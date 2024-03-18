import { useState, useEffect } from "react"
import Button from "../../shared/ux/Button"
import { apiUrl } from "../../apps/fn"
import { Prx } from "@/cp/global/fn"

const BlockPicker = ({ requestToken, kind, toast, templateId, parent, hideModalForm, updateList, goToLastPage }) => {
  const [blockData, setBlockData] = useState([])

  const getRemoteData = async () => {
    const url = apiUrl(["web-block", "picker", kind])
    if (requestToken) {
      try {
        const { data, validJson, code, text } = await Prx.get(url, requestToken)
        if (validJson) {
          setBlockData(data.data)
        } else {
          toast(`Failed to get ${kind} list  server sent http ${code} ${text}`, "error")
        }
      } catch (e) {
        toast(e.toString(), "error")
      }
    }
  }
  const addFromExisting = async (item) => {
    if (confirm(`Tambah ${item.name},  Apakah anda yakin ?`)) {
      let pk = item.id
      const formDataItem = { pk, templateId, parent, kind }
      const formData = new FormData()
      Object.keys(formDataItem).map((key) => {
        if (formDataItem[key]) {
          formData.append(key, formDataItem[key])
        }
      })
      const url = apiUrl(["web-block", "createFromExisting", kind])
      const method = "post"
      try {
        const { data, validJson, code, text } = await Prx[method](url, requestToken, formData)
        if (validJson) {
          let hasErrors = false
          if (data.errors) {
            if (data.errors.length > 0) {
              hasErrors = 1
            }
          }
          if (hasErrors) {
            /*
          const { errors } = data
          let newValidationErrors = {}
          let firstField = null
          errors.map((item) => {
            if (!firstField) {
              firstField = item.path
            }
            newValidationErrors[item.path] = { message: item.msg }
          })
          setValidationErrors(newValidationErrors)
          */
            toast("Error processing form", "error")

            // focus first field
            // jQuery(`#${formId}`).find(`.${firstField}:first`).trigger("focus")
          } else {
            // console.log(data)
            hideModalForm()
            // updateFormChecksum(data)
            // setValidationErrors({})
            // if (!pk) {
            toast("Record created", "success")
            goToLastPage()
            // } else {
            // toast("Record updated", "success")
            // updateList()
            // }
          }
        } else {
          toast(`Failed to create record server sent http ${code} ${text}`, "error")
        }
      } catch (e) {
        toast(e.toString(), "error")
      }
    }
  }
  useEffect(() => {
    getRemoteData()
  }, [])
  return (
    <>
      <div className="picker text-md">
        {blockData.map((item) => {
          const previewImageUrl = `${apiUrl(["web-block", "previews", item.previewImage])}`
          return (
            <>
              <div className="flex text-left gap-2 text-md p-4">
                <div className="w-2/4">
                  <img src={previewImageUrl} />
                </div>
                <div className="w-2/4">
                  <h1 className="mb-2">{item.name}</h1>
                  <p className="font-normal line-clamp-4" title={item.description}>
                    {item.description}
                  </p>
                  <span className="pr-2">{item.slug}</span>
                  <span className="pr-2">{item.path}</span>
                  <span className="pr-2">{item.kind}</span>
                </div>
                <div className="">
                  <Button caption="Select" icon="fa fa-chevron-right" onClick={(e) => addFromExisting(item)} />
                </div>
              </div>
            </>
          )
        })}

        <div className="p-2 text-center">
          <Button caption="Load Data" icon="fa fa-refresh" onClick={(e) => getRemoteData()} />
        </div>
      </div>
    </>
  )
}

export default BlockPicker
