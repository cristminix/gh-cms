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

import {
  FormRow,
  FormRowImageValidation,
  FormRowValidation,
} from "@cp/components/shared/ux/Form"
import { Prx } from "@cp/global/fn"

const createUntitledCompany= () => {
  const idx = crc32(new Date().getTime().toString()).toString(16)
  const name = `Untitled-${idx}`
      
  const fullName = ""  
  const shortName = ""  
  const address = ""  
  const altAddress = ""  
  const shortAddress = ""  
  const slug =  slugify(name)   
  const phone = ""  
  const altPhone = ""  
  const mobile = ""  
  const altMobile = ""  
  const email = ""  
  const altEmail = ""  
  const ig = ""  
  const fb = ""  
  const twitter = ""  
  const youtube = ""  
  const website = ""  
  const logo = ""  
  const logoSm = ""  
  const logoMd = ""  
  const logoXl = ""  
  return { 
      
    name,  
    fullName,  
    shortName,  
    address,  
    altAddress,  
    shortAddress,  
    slug,  
    phone,  
    altPhone,  
    mobile,  
    altMobile,  
    email,  
    altEmail,  
    ig,  
    fb,  
    twitter,  
    youtube,  
    website,  
    logo,  
    logoSm,  
    logoMd,  
    logoXl,     }
}

const CompanyForm = ({
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
     
  const [name,setName] = useState("")  
  const [fullName,setFullName] = useState("")  
  const [shortName,setShortName] = useState("")  
  const [address,setAddress] = useState("")  
  const [altAddress,setAltAddress] = useState("")  
  const [shortAddress,setShortAddress] = useState("")  
  const [slug,setSlug] = useState("")  
  const [phone,setPhone] = useState("")  
  const [altPhone,setAltPhone] = useState("")  
  const [mobile,setMobile] = useState("")  
  const [altMobile,setAltMobile] = useState("")  
  const [email,setEmail] = useState("")  
  const [altEmail,setAltEmail] = useState("")  
  const [ig,setIg] = useState("")  
  const [fb,setFb] = useState("")  
  const [twitter,setTwitter] = useState("")  
  const [youtube,setYoutube] = useState("")  
  const [website,setWebsite] = useState("")  
  const [logo,setLogo] = useState("")  
  const [logoSm,setLogoSm] = useState("")  
  const [logoMd,setLogoMd] = useState("")  
  const [logoXl,setLogoXl] = useState("")    

  
  const Ref = useRef(null)
  const formRef = useRef(null)
  const onTabExecutedRef = useRef(false)
  let onTabNextIndexRef = useRef(0)

  const [validationErrors, setValidationErrors] = useState({})
  const [formChecksum, setFormChecksum] = useState("")

  const calculateFormChecksum = (data = null) => {
    let formDataItem = null
    if (data) {
      const { id, name, fullName, shortName, address, altAddress, shortAddress, slug, phone, altPhone, mobile, altMobile, email, altEmail, ig, fb, twitter, youtube, website, logo, logoSm, logoMd, logoXl,  } = data
      formDataItem = { id,name,fullName,shortName,address,altAddress,shortAddress,slug,phone,altPhone,mobile,altMobile,email,altEmail,ig,fb,twitter,youtube,website,logo,logoSm,logoMd,logoXl, }
    } else {
      formDataItem = { id:pk,name,fullName,shortName,address,altAddress,shortAddress,slug,phone,altPhone,mobile,altMobile,email,altEmail,ig,fb,twitter,youtube,website,logo,logoSm,logoMd,logoXl, }
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
    const formDataItem = { id:pk,  name,fullName,shortName,address,altAddress,shortAddress,slug,phone,altPhone,mobile,altMobile,email,altEmail,ig,fb,twitter,youtube,website,logo,logoSm,logoMd,logoXl, }
    const formData = new FormData()
    Object.keys(formDataItem).map((key) => {
      formData.append(key, formDataItem[key])
    })
    const url = cmsApiUrl(["web-company", pk ? `update/${pk}` : "create"])
    const method = pk ? "put" : "post"
    try {
      const { data, validJson, code, text } = await Prx[method](
        url,
        requestToken,
        formData,
      )
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
        toast(
          `Failed to create record server sent http ${code} ${text}`,
          "error",
        )
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  const getRemoteRowData = async (pk_) => {
    const url = cmsApiUrl(["web-company", pk_])

    try {
      const { data, validJson, code, text } = await Prx.get(url, requestToken)
      if (validJson) {
        setFormChecksum(calculateFormChecksum(data.data))
      } else {
        toast(
          `Failed to get record id:${pk} server sent http ${code} ${text}`,
          "error",
        )
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  const setFormData = (data) => {
    const { id,name,fullName,shortName,address,altAddress,shortAddress,slug,phone,altPhone,mobile,altMobile,email,altEmail,ig,fb,twitter,youtube,website,logo,logoSm,logoMd,logoXl,  } = data
      setPk(id)
        
      setName(name)  
      setFullName(fullName)  
      setShortName(shortName)  
      setAddress(address)  
      setAltAddress(altAddress)  
      setShortAddress(shortAddress)  
      setSlug(slug)  
      setPhone(phone)  
      setAltPhone(altPhone)  
      setMobile(mobile)  
      setAltMobile(altMobile)  
      setEmail(email)  
      setAltEmail(altEmail)  
      setIg(ig)  
      setFb(fb)  
      setTwitter(twitter)  
      setYoutube(youtube)  
      setWebsite(website)  
      setLogo(logo)  
      setLogoSm(logoSm)  
      setLogoMd(logoMd)  
      setLogoXl(logoXl)    }


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
        document
          .querySelector("div[data-hs-overlay-backdrop-template]")
          .remove()
      } catch (e) {}
    }
  }, []) 

  return (
    <>
      <button
        id={`${modalBtnId}`}
        type="button"
        className={btnCls}
        data-hs-overlay={`#${formId}`}
      >
        Open modal
      </button>
      <div id={formId} className={`${modalCls} text-xs`}>
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto ]">
          <div className="flex w-[700px] flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                { name }
              </h3>
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
                  value={ name }
                  fieldname="name"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                                    autofocus="yes"
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="FullName"
                  value={ fullName }
                  fieldname="fullName"
                  onChange={(e) => {
                    setFullName(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="ShortName"
                  value={ shortName }
                  fieldname="shortName"
                  onChange={(e) => {
                    setShortName(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Address"
                  value={ address }
                  fieldname="address"
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="AltAddress"
                  value={ altAddress }
                  fieldname="altAddress"
                  onChange={(e) => {
                    setAltAddress(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="ShortAddress"
                  value={ shortAddress }
                  fieldname="shortAddress"
                  onChange={(e) => {
                    setShortAddress(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Slug"
                  value={ slug }
                  fieldname="slug"
                  onChange={(e) => {
                    setSlug(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Phone"
                  value={ phone }
                  fieldname="phone"
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="AltPhone"
                  value={ altPhone }
                  fieldname="altPhone"
                  onChange={(e) => {
                    setAltPhone(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Mobile"
                  value={ mobile }
                  fieldname="mobile"
                  onChange={(e) => {
                    setMobile(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="AltMobile"
                  value={ altMobile }
                  fieldname="altMobile"
                  onChange={(e) => {
                    setAltMobile(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Email"
                  value={ email }
                  fieldname="email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="AltEmail"
                  value={ altEmail }
                  fieldname="altEmail"
                  onChange={(e) => {
                    setAltEmail(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Ig"
                  value={ ig }
                  fieldname="ig"
                  onChange={(e) => {
                    setIg(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Fb"
                  value={ fb }
                  fieldname="fb"
                  onChange={(e) => {
                    setFb(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Twitter"
                  value={ twitter }
                  fieldname="twitter"
                  onChange={(e) => {
                    setTwitter(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Youtube"
                  value={ youtube }
                  fieldname="youtube"
                  onChange={(e) => {
                    setYoutube(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Website"
                  value={ website }
                  fieldname="website"
                  onChange={(e) => {
                    setWebsite(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Logo"
                  value={ logo }
                  fieldname="logo"
                  onChange={(e) => {
                    setLogo(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="LogoSm"
                  value={ logoSm }
                  fieldname="logoSm"
                  onChange={(e) => {
                    setLogoSm(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="LogoMd"
                  value={ logoMd }
                  fieldname="logoMd"
                  onChange={(e) => {
                    setLogoMd(e.target.value)
                  }}
                                  />


                <FormRowValidation
                  validationErrors={validationErrors}
                  label="LogoXl"
                  value={ logoXl }
                  fieldname="logoXl"
                  onChange={(e) => {
                    setLogoXl(e.target.value)
                  }}
                                  />

              

              </form>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                onClick={(e) => onCancelForm(e)}
                type="button"
                className={modalBtnFrmCloseCls}
              >
                Cancel
              </button>
              <button
                tabIndex={10}
                onClick={(e) => saveForm(e)}
                type="button"
                className={modalBtnFrmSaveCls}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) 

}

export default CompanyForm
export {createUntitledCompany}