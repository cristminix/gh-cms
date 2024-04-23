import { useEffect, useState, useRef } from "react"
import Pager from "@cp/components/shared/Pager"
import Grid from "@cp/components/shared/Grid"
import Button from "@cp/components/shared/ux/Button"
import ContactPersonForm, { createUntitledContactPerson } from "./form/ContactPersonForm"
import { cmsApiUrl } from "../apps/fn"

import jQuery from "jquery"
import { niceScrollbarCls } from "@cp/components/shared/ux/cls"
import Toast from "@cp/components/shared/ux/Toast"
import { Prx, requestIdentityToken } from "@cp/global/fn"
import { useCookies } from "react-cookie"

const WebContactPerson = ({ store, config, pageNumber }) => {
  const [cookies] = useCookies(["requestToken", "uid"])

  const toastRef = useRef(null)
  const [grid, setGrid] = useState({
    records: [],
    limit: 5,
    page: 1,
    total_pages: 0,
    total_records: 0,
    order_by: "id",
    order_dir: "asc",
  })

  const formId = "basic-modal-web-contact-person"
  const modalBtnId = `${formId}-clicker`
  const modalCloseBtnId = `${formId}-clicker-closer-x`

  const [formData, setFormData] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [requestToken, setRequestToken] = useState(null)

  const toast = (message, t) => {
    if (toastRef.current) {
      toastRef.current.add(message, t)
    }
  }

  useEffect(() => {
    if (requestToken) {
      updateList()
    }
  }, [pageNumber, requestToken])

  useEffect(() => {
    retrieveIdentityToken()
  }, [])

  const retrieveIdentityToken = async () => {
    const { requestToken, uid } = cookies
    const token = `u${uid}-${requestToken}`
    if (token) {
      setRequestToken(token)
    }
  }
  const onRefresh = (f) => updateList()

  const updateList = async () => {
    const page = parseInt(pageNumber) || 1

    const { limit, order_by, order_dir } = grid
    const url = cmsApiUrl("web-contact-persons", {
      limit,
      page,
      order_by,
      order_dir,
    })
    try {
      const { data, validJson, code, text } = await Prx.get(url, requestToken)
      if (validJson) {
        const nGrid = data
        setGrid((prevGrid) => {
          return {
            ...prevGrid,
            ...nGrid,
          }
        })
      } else {
        toast(`Failed to get list server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      console.log(e)
      toast(e.toString(), "error")
    }
  }

  const addForm = async (item, index) => {
    const defaultContactPerson = createUntitledContactPerson()

    setFormData(defaultContactPerson)
    setShowForm(true)

    jQuery(`#${modalBtnId}`).trigger("click")
  }
  const editForm = async (item, index) => {
    setFormData(item)
    setShowForm(true)
    jQuery(`#${modalBtnId}`).trigger("click")
  }
  const deleteForm = async (item, index) => {
    // console.log(item)
    if (confirm(`Are you sure want to delete this upload "${item.name}"`)) {
      const url = cmsApiUrl(["web-contact-person/delete", item.id])
      try {
        const { data, validJson, code, text } = await Prx.delete(url, requestToken)
        if (validJson) {
          const { success, message } = data
          toast(message, success ? "success" : "error")

          if (success) {
            const listState = await getListState(grid.limit, grid.page)
            const { total_pages, record_count } = listState
            if (record_count === 0) {
              goToPage(total_pages)
            } else {
              updateList()
            }
          }
        } else {
          toast(`Failed to delete id:${item.id} server sent http ${code} ${text}`, "error")
        }
      } catch (e) {
        console.log(e)
        toast(e.toString(), "error")
      }
    }
  }

  const getListState = async (limit = null, page = null) => {
    let response = {}
    const url = cmsApiUrl("web-contact-person/states", { limit, page })
    try {
      const { data, validJson, code, text } = await Prx.get(url, requestToken)
      if (validJson) {
        response = data
      } else {
        toast(`Failed to get states server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
    return response
  }

  const goToLastPage = async () => {
    try {
      const response = await getListState(grid.limit)
      const { total_pages } = response
      if (total_pages > 0) {
        goToPage(total_pages)
      }
      //   console.log(response)
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  const goToPage = (pageNum) => {
    pageNum = parseInt(pageNum) || 1

    document.location.hash = `/builder/web-contact-person/page/${pageNum}`
    if (pageNum == grid.page) {
      updateList()
    }
  }

  const gridOptions = {
    numberWidthCls: "w-[10px]",
    actionWidthCls: "w-[50px]",
    widthCls: [""],
    headers: ["name", "shortName", "kind", "contact Detail", "enabled"],
    fields: ["name", "shortName", "kind", "contactDetail", "enabled"],
    enableEdit: true,
    callbackFields: {},
    callbackHeaders: {},
    callbackActions: {
      edit: (item, index, options, linkCls, gridAction) => {
        return (
          <>
            <Button title="Edit" loading={false} icon="fa fa-edit" caption="" onClick={(e) => editForm(item, index)} />
            <Button
              title="Delete"
              loading={false}
              icon="fa fa-trash"
              caption=""
              onClick={(e) => deleteForm(item, index)}
            />
          </>
        )
      },
    },
  }
  const containerCls = "border mb-2 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700"
  return (
    <div className="min-h-screen">
      <Toast ref={toastRef} />
      <ContactPersonForm
        requestToken={requestToken}
        setRequestToken={setRequestToken}
        getRequestToken={retrieveIdentityToken}
        showForm={showForm}
        toast={toast}
        goToLastPage={goToLastPage}
        updateList={(e) => updateList()}
        data={formData}
        className={containerCls}
        hideForm={(e) => setShowForm(false)}
        formId={formId}
        modalBtnId={modalBtnId}
        modalCloseBtnId={modalCloseBtnId}
      />

      <div className={`user-manager ${containerCls}`}>
        <div className="grid-toolbar pb-4">
          <div className="flex justify-end gap-2">
            {!showForm ? <Button onClick={(e) => addForm()} icon="fa fa-plus" caption="" /> : null}
            <Button onClick={(e) => goToLastPage()} caption="Go to last page" icon="fa fa-next" />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className={`-m-1.5 overflow-x-auto ${niceScrollbarCls}`}>
            <div className="p-1.5 ">
              <div className="">
                {grid ? <Grid options={gridOptions} records={grid.records} page={grid.page} limit={grid.limit} /> : ""}
              </div>
            </div>
          </div>
          <div className="pager-container mt-3">
            {grid ? (
              <Pager
                path="/builder/web-contact-person"
                page={grid.page}
                total_pages={grid.total_pages}
                limit={grid.limit}
                onRefresh={(e) => onRefresh()}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebContactPerson
