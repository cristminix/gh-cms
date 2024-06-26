import { useEffect, useState, useRef } from "react"
import Pager from "@cp/components/shared/Pager"
import Grid from "@cp/components/shared/Grid"
import Button from "@cp/components/shared/ux/Button"
import { useLocation } from "react-router-dom"
import BlockForm, { createUntitledBlock } from "./form/BlockForm"
import { cmsApiUrl } from "../apps/fn"

import jQuery from "jquery"
import { niceScrollbarCls } from "@cp/components/shared/ux/cls"
import Toast from "@cp/components/shared/ux/Toast"
import { Prx, requestIdentityToken, titleCase } from "@cp/global/fn"
import { useCookies } from "react-cookie"

const WebBlockManager = ({ store, config, pageNumber, templateId }) => {
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

  const formId = "basic-modal-web-block"
  const modalBtnId = `${formId}-clicker`
  const modalCloseBtnId = `${formId}-clicker-closer-x`

  const [formData, setFormData] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [requestToken, setRequestToken] = useState(null)
  // const { page } = useLoaderData()
  const location = useLocation()
  const qs = location.search
  const qp = new URLSearchParams(qs)
  const [parentPage, setParentPage] = useState(parseInt(qp.get("parentPage")) || 1)
  const [themeId, setThemeId] = useState(parseInt(qp.get("themeId")) || null)
  const [kind, setKind] = useState(qp.get("kind") || null)
  const [parent, setParent] = useState(parseInt(qp.get("parent")) || null)
  const [lastParentPage, setLastParentPage] = useState(parentPage)
  const [hashItem, setHashItem] = useState(null)
  const toast = (message, t) => {
    if (toastRef.current) {
      toastRef.current.add(message, t)
    }
  }
  const onhashChanged = () => {
    // if (!hashItem) return
    // setKind(hashItem.kind)
    // setParent(hashItem.parent)
    // if (hashItem.kind == "block" && hashItem.parent != null) {
    //   updateList(hashItem.kind, hashItem.parent)
    // }
  }
  useEffect(() => {
    // console.log(pageNumber)
    if (requestToken) {
      updateList()
    }
  }, [pageNumber, requestToken])

  useEffect(() => {
    retrieveIdentityToken()
  }, [])
  useEffect(() => {
    onhashChanged()
  }, [hashItem])

  const retrieveIdentityToken = async () => {
    const { requestToken, uid } = cookies
    const token = `u${uid}-${requestToken}`
    if (token) {
      setRequestToken(token)
    }
  }
  const onRefresh = (f) => updateList()

  const updateList = async (kind_ = null, parent_ = null) => {
    const page = parseInt(pageNumber) || 1

    const { limit, order_by, order_dir } = grid
    const url = cmsApiUrl("web-blocks", {
      templateId,
      limit,
      page,
      order_by,
      order_dir,
      kind: kind_ ? kind_ : kind,
      parent: parent_ ? parent_ : parent,
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
    // let templateId = 0
    // if (item) {
    //   templateId = item.templateId
    // }
    const defaultBlock = createUntitledBlock()
    defaultBlock.templateId = templateId
    defaultBlock.parent = parent
    defaultBlock.kind = kind
    setFormData(defaultBlock)
    setShowForm(true)

    jQuery(`#${modalBtnId}`).trigger("click")
  }
  const editForm = async (item, index) => {
    setFormData((prevData) => ({ ...prevData, ...item }))

    jQuery(`#${modalBtnId}`).trigger("click")
  }
  const viewBlocks = async (item, index) => {
    setHashItem({
      kind: "block",
      parent: item.id,
    })
    document.location.hash = `/builder/web-block-manager/${templateId}/page/1?parentPage=${lastParentPage}&kind=block&parent=${item.id}&themeId=${themeId}`
    setKind("block")
    setParent(item.id)
    updateList("block", item.id)
    // console.log(item)
  }
  const backToSection = async (item, index) => {
    // setHashItem({
    //   kind: "section",
    //   parent: null,
    // })
    document.location.hash = `/builder/web-block-manager/${templateId}/page/1?parentPage=${lastParentPage}&kind=section&&themeId=${themeId}`
    setKind("section")
    setParent(null)
    updateList("section")
    // console.log(item)
  }
  const deleteForm = async (item, index) => {
    // console.log(item)
    if (confirm(`Are you sure want to delete this upload "${item.name}"`)) {
      const url = cmsApiUrl(["web-block/delete", item.id])
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
      } else {
        updateList()
      }
      //   console.log(response)
    } catch (e) {
      toast(e.toString(), "error")
      // updateList()
    }
  }
  const goToPage = (pageNum) => {
    pageNum = parseInt(pageNum) || 1

    document.location.hash = `/builder/web-block-manager/${templateId}/page/${pageNum}?parentPage=${lastParentPage}&themeId=${themeId}&kind=${kind}&parent=${parent}`
    if (pageNum == grid.page) {
      updateList()
    }
  }
  const getListState = async (limit = null, page = null) => {
    let response = {}
    const url = cmsApiUrl(["web-block/states", templateId], { limit, page, kind, parent })
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
  const backToTemplates = (item) => {
    document.location.hash = `/builder/web-template-manager/${themeId}/page/${lastParentPage}`
  }
  const editTemplate = async (item, index) => {
    console.log(item)
    const options = {
      type: "block",
      pk: item.id,
    }

    document.location.hash = `/builder/code-editor/${kind}/${item.id}`
  }
  const gridOptions = {
    numberWidthCls: "w-[10px]",
    actionWidthCls: "w-[50px]",
    widthCls: [""],
    headers: [`${kind ? kind : "Block/Section/Widget"}`], //["id","templateId","name","slug","description","kind","previewImage","path"],
    fields: ["name"], //["id","templateId","name","slug","description","kind","previewImage","path"],
    enableEdit: true,
    callbackFields: {
      name: (field, value, item, index) => {
        const previewImageUrl = `${cmsApiUrl(["web-block", "previews", item.previewImage])}`
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
                {1 && <span className="pr-2">pk:{item.id}</span>}
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
            <Button
              title="Edit Source File"
              loading={false}
              icon="bi bi-braces-asterisk"
              caption={`Edit File`}
              onClick={(e) => editTemplate(item, index)}
            />
            {kind === "section" && (
              <Button
                title="Lihat Blok"
                loading={false}
                icon="fa fa-square"
                caption={`Blok (${item.blockCount})`}
                onClick={(e) => viewBlocks(item, index)}
              />
            )}
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
      <BlockForm
        themeId={themeId}
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
          <div className="flex justify-between gap-2">
            {kind == "block" && parent ? (
              <Button onClick={(e) => backToSection()} icon="fa fa-chevron-left" caption="Kembali ke Section" />
            ) : (
              <Button onClick={(e) => backToTemplates()} icon="fa fa-chevron-left" caption="Kembali ke Template" />
            )}
            <div className="flex gap-2">
              {!showForm ? (
                <Button
                  onClick={(e) => addForm()}
                  icon="fa fa-plus"
                  caption={`Add ${kind ? titleCase(kind) : "Item"}`}
                />
              ) : null}

              <Button
                onClick={(e) => goToLastPage()}
                caption="Ke Halaman Terakhir"
                icon="fa fa-step-forward"
                iconPos="right"
              />
            </div>
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
                path={`/builder/web-block-manager/${templateId}`}
                pathQueryString={`?kind=${kind}&parent=${parent}&themeId=${themeId}`}
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

export default WebBlockManager
