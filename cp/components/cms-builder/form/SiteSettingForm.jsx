import { useEffect, useRef, useState } from "react"
import { crc32 } from "crc"
import { getFile64, isEmpty, slugify } from "@cp/global/fn"
import jQuery from "jquery"

import { cmsApiUrl } from "../../apps/fn"
import {
  btnCls,
  modalCls,
  modalBtnCloseCls,
  modalBtnFrmCloseCls,
  modalBtnFrmSaveCls,
} from "@cp/components/shared/ux/cls"
import CryptoJS from "crypto-js"

import { FormRow, FormRowImageValidation, FormRowValidation, FormRowSwitch } from "@cp/components/shared/ux/Form"
import { Prx } from "@cp/global/fn"
import Button from "@cp/components/shared/ux/Button"

const createUntitledSiteSetting = () => {
  const idx = crc32(new Date().getTime().toString()).toString(16)
  const name = `Untitled-${idx}`

  const slug = slugify(name)
  const theme = ""
  const companyId = ""
  const setAsDefault = ""
  return {
    name,
    slug,
    theme,
    companyId,
    setAsDefault,
  }
}

const SiteSettingForm = ({
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

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [theme, setTheme] = useState("")
  const [companyId, setCompanyId] = useState("")
  const [setAsDefault, setSetAsDefault] = useState("")

  const Ref = useRef(null)
  const formRef = useRef(null)
  const onTabExecutedRef = useRef(false)
  let onTabNextIndexRef = useRef(0)

  const [validationErrors, setValidationErrors] = useState({})
  const [formChecksum, setFormChecksum] = useState("")

  const calculateFormChecksum = (data = null) => {
    let formDataItem = null
    if (data) {
      const { id, name, slug, theme, companyId, setAsDefault } = data
      formDataItem = { id, name, slug, theme, companyId, setAsDefault }
    } else {
      formDataItem = { id: pk, name, slug, theme, companyId, setAsDefault }
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
    const formDataItem = { id: pk, name, slug, theme, companyId, setAsDefault }
    const formData = new FormData()
    Object.keys(formDataItem).map((key) => {
      formData.append(key, formDataItem[key])
    })
    const url = cmsApiUrl(["web-site-setting", pk ? `update/${pk}` : "create"])
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
  const getRemoteRowData = async (pk_) => {
    const url = cmsApiUrl(["web-site-setting", pk_])

    try {
      const { data, validJson, code, text } = await Prx.get(url, requestToken)
      if (validJson) {
        setFormChecksum(calculateFormChecksum(data.data))
      } else {
        toast(`Failed to get record id:${pk} server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  const setFormData = (data) => {
    const { id, name, slug, theme, companyId, setAsDefault } = data
    setPk(id)

    setName(name)
    setSlug(slug)
    setTheme(theme)
    setCompanyId(companyId)
    setSetAsDefault(setAsDefault)
  }

  const initFormData = (data) => {
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
    console.log(data)
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
                <div className="flex gap-2">
                  <FormRowValidation
                    validationErrors={validationErrors}
                    label="Slug"
                    value={slug}
                    fieldname="slug"
                    onChange={(e) => {
                      setSlug(e.target.value)
                    }}
                    className="w-full"
                  />
                  <Button
                    className="m-2"
                    icon="fa fa-refresh"
                    onClick={() => {
                      setSlug(slugify(name))
                    }}
                  />
                </div>
                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Theme"
                  value={theme}
                  fieldname="theme"
                  onChange={(e) => {
                    setTheme(e.target.value)
                  }}
                />

                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Company"
                  value={companyId}
                  fieldname="companyId"
                  onChange={(e) => {
                    setCompanyId(e.target.value)
                  }}
                />
                <FormRowSwitch
                  // validationErrors={validationErrors}
                  label="Default"
                  value={setAsDefault}
                  fieldname="setAsDefault"
                  onChange={(checked) => {
                    setSetAsDefault(checked ? 1 : 0)
                  }}
                />
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

export default SiteSettingForm
export { createUntitledSiteSetting }
