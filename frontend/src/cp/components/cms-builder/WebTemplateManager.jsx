import { useEffect, useState, useRef } from "react"
import Pager from "@/cp/components/shared/Pager"
import Grid from "@/cp/components/shared/Grid"
import Button from "@/cp/components/shared/ux/Button"
import TemplateForm, { createUntitledTemplate } from "./form/TemplateForm"
import { apiUrl } from "../apps/fn"

import jQuery from "jquery"
import { niceScrollbarCls } from "@/cp/components/shared/ux/cls"
import Toast from "@/cp/components/shared/ux/Toast"
import { Prx, requestIdentityToken } from "@/cp/global/fn"

const WebTemplateManager = ({ store, config, pageNumber }) => {
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

  const formId = "basic-modal-web-template"
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
    const appId = config.getAppId()
    const url = apiUrl("auth/generateToken")
    const token = await requestIdentityToken(appId, url, toast)
    if (token) {
      setRequestToken(token)
    }
  }
  const getListState = async (limit = null, page = null) => {
    let response = {}
    const url = apiUrl("web-template/states", { limit, page })
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

  const onRefresh = (f) => updateList()

  const updateList = async () => {
    const page = parseInt(pageNumber) || 1

    const { limit, order_by, order_dir } = grid
    const url = apiUrl("web-templates", {
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
    const defaultTemplate = createUntitledTemplate()

    setFormData(defaultTemplate)
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
      const url = apiUrl(["web-template/delete", item.id])
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

    document.location.hash = `/builder/web-template-manager/page/${pageNum}`
    if (pageNum == grid.page) {
      updateList()
    }
  }

  const goToTT = (item) => {
    document.location.hash = `/${item.id}?parentPage=${grid.page}`
  }

  const gridOptions = {
    numberWidthCls: "w-[10px]",
    actionWidthCls: "w-[50px]",
    widthCls: [""],
    headers: ["Template"], //["id", "themeId", "name", "slug", "description", "previewImage", "path"],
    fields: ["name"], //["id", "themeId", "name", "slug", "description", "previewImage", "path"],
    enableEdit: true,
    callbackFields: {
      name: (field, value, item, index) => {
        const previewImageUrl = `${apiUrl(["web-template", "previews", item.previewImage])}`
        return (
          <>
            <div className="flex text-left gap-2">
              <div className="w-1/4">
                <img src={previewImageUrl} />
              </div>
              <div className="w-3/4">
                <h1 className="mb-2">{item.name}</h1>
                <p className="font-normal line-clamp-4" title={item.description}>
                  {item.description}
                </p>
                <span className="pr-2">{item.slug}</span>
                <span className="pr-2">{item.path}</span>
                <span className="pr-2">{item.kind}</span>
                <span className="pr-2">tid:{item.themeId}</span>
              </div>
            </div>
          </>
        )
      },
    },
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
      <TemplateForm
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
                path="/builder/web-template-manager"
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

export default WebTemplateManager
