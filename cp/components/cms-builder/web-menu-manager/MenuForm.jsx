import { crc32 } from "crc"
import { useState, useEffect, useRef } from "react"
import {
  btnCls,
  modalCls,
  modalBtnCloseCls,
  modalBtnFrmCloseCls,
  modalBtnFrmSaveCls,
} from "@cp/components/shared/ux/cls"
import { FormRowValidation, FormRow, FormRowCheckbox } from "@cp/components/shared/ux/Form"
import jQuery from "jquery"
import CryptoJS from "crypto-js"
import { cmsApiUrl } from "../../apps/fn"
import { Prx, slugify } from "@cp/global/fn"
const createUntitledMenu = () => {
  const idx = crc32(new Date().getTime().toString()).toString(16)
  const title = `Untitled-${idx}`
  const slug = slugify(title)
  const link = `/${slug}`
  const target = "self"
  const order = 0
  const hasChild = false

  const level = 0
  const parent = -1
  const hidden = true
  const dev = true

  const useModel = false
  const model = ""
  const modelListMethod = ""
  const slugField = ""
  const displayField = ""
  const childRoutePath = ""
  const childIconCls = ""

  return {
    title,
    slug,
    parent,
    link,
    target,
    hidden,
    dev,
    level,
    order,
    hasChild,
    useModel,
    model,
    modelListMethod,
    slugField,
    displayField,
    childRoutePath,
    childIconCls,
  }
}
const MenuForm = ({
  data = null,
  className,
  hideForm,
  updateList,
  formId,
  modalBtnId,
  modalCloseBtnId,
  toast,
  requestToken,
}) => {
  const [pk, setPk] = useState("")
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [link, setLink] = useState("")
  const [target, setTarget] = useState("")
  const [order, setOrder] = useState(0)
  const [hasChild, setHasChild] = useState(false)
  const [parent, setParent] = useState(-1)
  const [hidden, setHidden] = useState(false)

  const formRef = useRef(null)
  const onTabExecutedRef = useRef(false)
  let onTabNextIndexRef = useRef(0)

  const [validationErrors, setValidationErrors] = useState({})
  const [formChecksum, setFormChecksum] = useState("")

  const calculateFormChecksum = (data = null) => {
    let formDataItem = null
    if (data) {
      const { id, title, slug, parent, link, target, hidden, order, hasChild } = data
      formDataItem = {
        id,
        title,
        slug,
        parent,
        link,
        target,
        hidden,
        order,
        hasChild,
      }
    } else {
      formDataItem = {
        id: pk,
        title,
        slug,
        parent,
        link,
        target,
        hidden,
        order,
        hasChild,
      }
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
    // console.log(values)
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
  const formValidation = (data) => {}
  const saveForm = async (f) => {
    let pk = null
    if (data.id) {
      pk = data.id
    }
    const row = {
      title,
      slug,
      parent,
      link,
      target,
      hidden,
      order,
      hasChild,
    }
    const formData = new FormData()
    // const [file] = thumbnailRef.current.files
    // if (file) {
    //   formData.append("thumbnail", file)
    // }
    Object.keys(row).map((key) => {
      formData.append(key, row[key])
    })
    const url = cmsApiUrl(["web-menu", pk ? `update/${pk}` : "create"])
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
            updateList()
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
  const getRemoteRowData = async () => {
    return
    /*
    const pk = data.id
    const row = await mMenu.get(pk)
    console.log(row)
    if (row) {
      setFormChecksum(calculateFormChecksum(row))
    } else {
      toast("No recordfound", "error")
    }
    */
  }
  const initFormData = (data) => {
    // console.log(data)
    if (data) {
      const { id, title, slug, parent, link, target, hidden, order, hasChild } = data
      setPk(id)
      setTitle(title)
      setLink(link)
      setSlug(slug)
      setParent(parent)
      setTarget(target)
      setHidden(hidden)
      setOrder(order)
      setHasChild(hasChild)
      setTimeout(() => {
        const initialFormChecksum = calculateFormChecksum(data)
        // console.log(initialFormChecksum)
        setFormChecksum(initialFormChecksum)
        setValidationErrors({})
      }, 256)
      if (data.id) {
        getRemoteRowData()
      }
    }
  }
  useEffect(() => {
    initFormData(data)
  }, [data])

  const onTab = (target, focusableElements) => {
    console.log(onTabExecutedRef.current)
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
    onTabExecutedRef.current = false
    HSOverlay.onTabOverride = (t, e) => {
      onTab(t, e)
    }
    HSOverlay.onEscapeOverride = (t) => {
      // console.log(t)
      // onCancelForm()
      // HSOverlay.onEscapeDefault(t)
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

  return (
    <>
      <button id={`${modalBtnId}`} type="button" className={btnCls} data-hs-overlay={`#${formId}`}>
        Open modal
      </button>
      <div id={formId} className={modalCls}>
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto ]">
          <div className="flex w-[700px] flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
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
            <div className="p-4 overflow-y-auto">
              <form className={"className"} ref={formRef}>
                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Title"
                  value={title}
                  fieldname="title"
                  onChange={(e) => {
                    setTitle(e.target.value)
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
                  label="Link"
                  value={link}
                  fieldname="link"
                  onChange={(e) => {
                    setLink(e.target.value)
                  }}
                />
                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Target"
                  value={target}
                  fieldname="target"
                  onChange={(e) => {
                    setTarget(e.target.value)
                  }}
                />
                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Parent"
                  value={parent}
                  fieldname="parent"
                  readonly={true}
                  onChange={(e) => {
                    // setParent(e.target.value)
                  }}
                />
                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Order"
                  value={order}
                  fieldname="order"
                  onChange={(e) => {
                    setOrder(e.target.value)
                  }}
                />
                <FormRowCheckbox
                  value={hidden}
                  onChange={(checked) => {
                    setHidden(checked ? 1 : 0)
                  }}
                  label="Hidden"
                />
                {/* <FormRowCheckbox value={dev} onChange={setDev} label="Dev" /> */}
                <FormRowCheckbox
                  value={hasChild}
                  onChange={(checked) => {
                    setHasChild(checked ? 1 : 0)
                  }}
                  label="Has Child"
                />
                {/* <FormRowCheckbox value={useModel} onChange={setUseModel} label="Use Model" /> */}
              </form>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button onClick={(e) => onCancelForm(e)} type="button" className={modalBtnFrmCloseCls}>
                Cancel
              </button>
              <button tabIndex={10} onClick={(e) => saveForm(e)} type="button" className={modalBtnFrmSaveCls}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuForm
export { createUntitledMenu }
