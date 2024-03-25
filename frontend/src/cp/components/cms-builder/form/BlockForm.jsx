import { useEffect, useRef, useState } from "react"
import { crc32 } from "crc"
import { getFile64, isEmpty, slugify } from "@/cp/global/fn"
import jQuery from "jquery"

import { apiUrl } from "../../apps/fn"
import {
  btnCls,
  modalCls,
  modalBtnCloseCls,
  modalBtnFrmCloseCls,
  modalBtnFrmSaveCls,
} from "@/cp/components/shared/ux/cls"
import CryptoJS from "crypto-js"

import { FormRow, FormRowImageValidation, FormRowSelect, FormRowValidation } from "@/cp/components/shared/ux/Form"
import { Prx } from "@/cp/global/fn"
import BlockPicker from "./BlockPicker"

const createUntitledBlock = () => {
  const idx = crc32(new Date().getTime().toString()).toString(16)
  const name = `Untitled-${idx}`

  const templateId = ""
  const slug = slugify(name)
  const description = ""
  const kind = ""
  const previewImage = ""
  const path = ""
  const parent = -1
  return {
    templateId,
    slug,
    description,
    kind,
    previewImage,
    path,
    name,
    parent,
  }
}

const BlockForm = ({
  templateIdSet,
  themeId,
  requestToken,
  getRequestToken,
  setRequestToken,
  data = null,
  className,
  hideForm,
  updateList,
  formId,
  modalBtnId,
  modalCloseBtnId,
  goToLastPage,
  toast,
}) => {
  const [pk, setPk] = useState("")

  const [templateId, setTemplateId] = useState(templateIdSet)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [kind, setKind] = useState("")
  const [path, setPath] = useState("")
  const [parent, setParent] = useState(-1)

  const [previewImage, setPreviewImage] = useState("")
  const [previewImageValid, setPreviewImageValid] = useState(false)
  const [previewImageUrl, setPreviewImageUrl] = useState("")
  const [tabMode, setTabMode] = useState("new")
  const previewImageRef = useRef(null)
  const formRef = useRef(null)
  const onTabExecutedRef = useRef(false)
  let onTabNextIndexRef = useRef(0)

  const [validationErrors, setValidationErrors] = useState({})
  const [formChecksum, setFormChecksum] = useState("")

  const calculateFormChecksum = (data = null) => {
    let formDataItem = null
    if (data) {
      const { id, templateId, name, slug, description, kind, previewImage, path, parent } = data
      formDataItem = { id, templateId, name, slug, description, kind, previewImage, path, parent }
    } else {
      formDataItem = { id: pk, templateId, name, slug, description, kind, previewImage, path, parent }
    }
    if (!formDataItem.id) {
      formDataItem.id = null
    }
    let values = []
    const keys = Object.keys(formDataItem)
    for (const key of keys) {
      const value = formDataItem[key]
      values.push(key + "=" + value)
    }
    var formString = values.join("&")
    return CryptoJS.SHA256(formString).toString()
  }

  const updateFormChecksum = (data = null) => {
    const newFormChecksum = calculateFormChecksum(data)
    setFormChecksum(newFormChecksum)
  }

  const isFormDirty = () => {
    const currentFormChecksum = calculateFormChecksum(null)
    return currentFormChecksum !== formChecksum
  }

  const hideModalForm = (e) => {
    previewImageRef.current.value = ""
    const modalIdSelector = `#${formId}`
    HSOverlay.close(modalIdSelector)
    hideForm()

    if (e) {
      return e.preventDefault()
    }
  }
  const onCancelForm = (e) => {
    if (isFormDirty()) {
      if (confirm("Data might not being saved, Are you sure to cancel?")) {
        hideModalForm(e)
      }
    } else {
      hideModalForm(e)
    }
    if (e) {
      return e.preventDefault()
    }
  }

  const saveForm = async (f) => {
    let pk = null
    if (data.id) {
      pk = data.id
    }
    const formDataItem = { id: pk, templateId, name, slug, description, kind, path, parent }
    const formData = new FormData()

    const [file] = previewImageRef.current.files
    if (file) {
      formData.append("previewImage", file)
    }
    Object.keys(formDataItem).map((key) => {
      formData.append(key, formDataItem[key])
    })
    const url = apiUrl(["web-block", pk ? `update/${pk}` : "create"])
    const method = pk ? "put" : "post"
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
          toast("Error processing form", "error")

          // focus first field
          jQuery(`#${formId}`).find(`.${firstField}:first`).trigger("focus")
        } else {
          // console.log(data)
          hideModalForm()
          updateFormChecksum(data)
          setValidationErrors({})
          if (!pk) {
            toast("Record created", "success")
            goToLastPage()
          } else {
            toast("Record updated", "success")
            updateList()
          }
        }
      } else {
        toast(`Failed to create record server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }

  const setPreviewImageFile = async (target) => {
    const file64 = await getFile64(target.files[0])
    const [file] = target.files
    setPreviewImage(file.name)
    const fileType = file.type.split("/")[0]
    if (fileType === "image") {
      setPreviewImageValid(true)
      setPreviewImageUrl(file64)
      const newValidationErrors = { ...validationErrors }
      delete newValidationErrors.previewImage
      setValidationErrors(newValidationErrors)
    } else {
      alert("Only image file is allowed")
      previewImageRef.current.value = ""
    }
  }

  const getRemoteRowData = async (pk_) => {
    const url = apiUrl(["web-block", pk_])

    try {
      const { data, validJson, code, text } = await Prx.get(url, requestToken)
      if (validJson) {
        // const { previewImage } = data.data
        // const previewImageUrl = apiUrl(["web-block/previews", previewImage])
        // setPreviewImageUrl(previewImageUrl)
        setFormData(data.data)
        setFormChecksum(calculateFormChecksum(data.data))
      } else {
        toast(`Failed to get record id:${pk_} server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  const setFormData = (data) => {
    const { id, templateId, name, slug, description, kind, previewImage, path, parent } = data
    setPk(id)
    setParent(parent)

    setTemplateId(templateId)
    setName(name)
    setSlug(slug)
    setDescription(description)
    setKind(kind)
    setPath(path)
    setPreviewImage(previewImage)
    if (isEmpty(previewImage)) {
      setPreviewImageValid(false)
    } else {
      setPreviewImageUrl(apiUrl(["web-block/previews", previewImage]))
      setPreviewImageValid(true)
    }
  }
  const initFormData = (data) => {
    // console.log(data)
    if (data) {
      setFormData(data)
      setTimeout(() => {
        const initialFormChecksum = calculateFormChecksum(data)
        setFormChecksum(initialFormChecksum)
        setValidationErrors({})
      }, 256)
      if (data.id) {
        getRemoteRowData(data.id)
      }
    }
  }
  const onTab = (target, focusableElements) => {
    console.log(onTabExecutedRef.current)
    return
    if (!onTabExecutedRef.current) {
      onTabExecutedRef.current = true
      // Your code here (will run only once)
      console.log(`onTab called`)
      if (!focusableElements.length) return false

      const focused = target.element.overlay.querySelector(":focus")
      const focusedIndex = Array.from(focusableElements).indexOf(focused)
      try {
        if (focusedIndex > -1) {
          onTabNextIndexRef.current = focusedIndex + 1
          focusableElements[onTabNextIndexRef.current].focus()
        } else {
          focusableElements[0].focus()
        }
      } catch (e) {
        focusableElements[0].focus()
        onTabNextIndexRef.current = 0
      }

      // jQuery(target.element).prop("hasOnTabHandler", 0)
      setTimeout(() => {
        onTabExecutedRef.current = false
      }, 256)
    } else {
      setTimeout(() => {
        onTabExecutedRef.current = false
      }, 256)
    }
  }
  useEffect(() => {
    initFormData(data)
  }, [data])

  useEffect(() => {
    onTabExecutedRef.current = false
    HSOverlay.onTabOverride = (t, e) => {
      onTab(t, e)
    }

    const $el = jQuery(`#${modalBtnId}`)
    if (!$el.prop("hasOverlay")) {
      $el.prop("hasOverlay", "yes")
      HSOverlay.autoInit()
    }
    return () => {
      onTabExecutedRef.current = false

      try {
        document.querySelector("div[data-hs-overlay-backdrop-template]").remove()
      } catch (e) {}
    }
  }, [])
  const cls0 = "cls-0 relative z-0 flex border rounded-xl overflow-hidden dark:border-gray-700"
  const cls1 =
    "cls-1 hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white dark:hs-tab-active:border-b-blue-600 relative min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-400 active"
  const cls2 =
    "cls-2 hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white dark:hs-tab-active:border-b-blue-600 relative min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-400"
  const cls3 = "cls-3 mt-3"
  const cls4 = "cls-4 text-gray-500 dark:text-gray-400"
  const cls5 = "cls-5 font-semibold text-gray-800 dark:text-gray-200"
  const cls6 = "cls-6 hidden"
  useEffect(() => {
    HSTabs.autoInit()
  }, [])
  return (
    <>
      <button id={`${modalBtnId}`} type="button" className={btnCls} data-hs-overlay={`#${formId}`}>
        Open modal
      </button>
      <div id={formId} className={`${modalCls} text-xs`}>
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto ]">
          <div className="flex w-[700px] flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">{name}</h3>
              <button
                type="button"
                id={`${modalCloseBtnId}`}
                onClick={(e) => onCancelForm(e)}
                className={modalBtnCloseCls}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <nav aria-label="Tabs" role="tablist" className={cls0}>
              <button
                type="button"
                id="bar-with-underline-item-1"
                data-hs-tab="#bar-with-underline-1"
                aria-controls="bar-with-underline-1"
                role="tab"
                className={cls1}
                onClick={(e) => {
                  setTabMode("new")
                }}
              >
                Buat Baru
              </button>
              <button
                type="button"
                id="bar-with-underline-item-2"
                data-hs-tab="#bar-with-underline-2"
                aria-controls="bar-with-underline-2"
                role="tab"
                className={cls2}
                onClick={(e) => setTabMode("existing")}
              >
                Ambil yang ada
              </button>
            </nav>

            <div className={cls3}>
              <div id="bar-with-underline-1" role="tabpanel" aria-labelledby="bar-with-underline-item-1">
                {/* START FORM */}
                <div className="p-4 overflow-y-auto">
                  <form className={"className"} ref={formRef}>
                    <FormRowValidation
                      validationErrors={validationErrors}
                      label="Name"
                      value={name}
                      fieldname="name"
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                      autofocus="yes"
                    />

                    <FormRowValidation
                      validationErrors={validationErrors}
                      label="Slug"
                      value={slug}
                      fieldname="slug"
                      onChange={(e) => {
                        setSlug(e.target.value)
                      }}
                    />

                    <FormRowValidation
                      validationErrors={validationErrors}
                      label="Description"
                      useTextArea={true}
                      value={description}
                      fieldname="description"
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                    />

                    <FormRowSelect
                      validationErrors={validationErrors}
                      label="Kind"
                      data={["block", "widget", "section"]}
                      value={kind}
                      fieldname="kind"
                      onChange={(e) => {
                        setKind(e)
                      }}
                    />

                    <FormRowValidation
                      validationErrors={validationErrors}
                      label="Path"
                      value={path}
                      fieldname="path"
                      onChange={(e) => {
                        setPath(e.target.value)
                      }}
                    />

                    <FormRowImageValidation
                      className="mb-4"
                      validationErrors={validationErrors}
                      label="Preview"
                      onChange={(e) => setPreviewImageFile(e.target)}
                      fieldname="previewImage"
                      inputRef={previewImageRef}
                      imageUrl={previewImageUrl}
                      validImage={previewImageValid}
                    />
                    {/* <FormRowValidation
                  validationErrors={validationErrors}
                  label="Template"
                  value={templateId}
                  fieldname="templateId"
                  onChange={(e) => {
                    setTemplateId(e.target.value)
                  }}
                /> */}
                    {kind == "section" && (
                      <FormRowSelect
                        // validationErrors={validationErrors}
                        url={apiUrl(["web-template", "dropdown", themeId], { pk })}
                        label="Template"
                        value={templateId}
                        fieldname="templateId"
                        onChange={(e) => {
                          setTemplateId(e)
                        }}
                      />
                    )}

                    {/* <FormRow
                      validationErrors={validationErrors}
                      label="Parent"
                      value={parent}
                      fieldname="parent"
                      onChange={(e) => {
                        setParent(e.target.value)
                      }}
                    /> */}
                  </form>
                </div>
              </div>
              <div
                id="bar-with-underline-2"
                role="tabpanel"
                aria-labelledby="bar-with-underline-item-2"
                className={`${cls6} p-2`}
              >
                <p className={`${cls4} text-center`}>
                  Silahkan pilih <em className={cls5}> {kind} </em> berikut.
                </p>
                <BlockPicker
                  kind={kind}
                  requestToken={requestToken}
                  toast={toast}
                  templateId={templateId}
                  parent={parent}
                  hideModalForm={hideModalForm}
                  updateList={updateList}
                  goToLastPage={goToLastPage}
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              {tabMode == "new" && (
                <button tabIndex={10} onClick={(e) => saveForm(e)} type="button" className={modalBtnFrmSaveCls}>
                  Simpan
                </button>
              )}
              <button onClick={(e) => onCancelForm(e)} type="button" className={modalBtnFrmCloseCls}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlockForm
export { createUntitledBlock }
