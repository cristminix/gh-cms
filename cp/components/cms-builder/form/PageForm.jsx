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

import { FormRow, FormRowImageValidation, FormRowSelect, FormRowValidation } from "@cp/components/shared/ux/Form"
import { Prx } from "@cp/global/fn"
import Button from "@cp/components/shared/ux/Button"

const createUntitledPage = () => {
  const idx = crc32(new Date().getTime().toString()).toString(16)
  const title = `Untitled-${idx}`

  const templateId = ""
  const categories = ""
  const tags = ""
  const slug = slugify(title)
  const description = ""
  const authors = ""
  const highlight = ""
  const coverImage = ""
  const content = ""
  const kind = ""
  const path = ""
  const status = ""
  const visibility = ""
  const dateCreated = ""
  const dateUpdated = ""
  const datePublished = ""
  const relatedPages = ""
  const relatedPosts = ""
  return {
    title,
    templateId,
    categories,
    tags,
    slug,
    description,
    authors,
    highlight,
    coverImage,
    content,
    kind,
    path,
    status,
    visibility,
    dateCreated,
    dateUpdated,
    datePublished,
    relatedPages,
    relatedPosts,
  }
}

const PageForm = ({
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

  const [templateId, setTemplateId] = useState("")
  const [categories, setCategories] = useState("")
  const [tags, setTags] = useState("")
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [authors, setAuthors] = useState("")
  const [highlight, setHighlight] = useState("")
  const [content, setContent] = useState("")
  const [kind, setKind] = useState("")
  const [path, setPath] = useState("")
  const [status, setStatus] = useState("")
  const [visibility, setVisibility] = useState("")
  const [dateCreated, setDateCreated] = useState("")
  const [dateUpdated, setDateUpdated] = useState("")
  const [datePublished, setDatePublished] = useState("")
  const [relatedPages, setRelatedPages] = useState("")
  const [relatedPosts, setRelatedPosts] = useState("")

  const [coverImage, setCoverImage] = useState("")
  const [coverImageValid, setCoverImageValid] = useState(false)
  const [coverImageUrl, setCoverImageUrl] = useState("")

  const coverImageRef = useRef(null)
  const formRef = useRef(null)
  const onTabExecutedRef = useRef(false)
  let onTabNextIndexRef = useRef(0)

  const [validationErrors, setValidationErrors] = useState({})
  const [formChecksum, setFormChecksum] = useState("")

  const calculateFormChecksum = (data = null) => {
    let formDataItem = null
    if (data) {
      const {
        id,
        templateId,
        categories,
        tags,
        title,
        slug,
        description,
        authors,
        highlight,
        coverImage,
        content,
        kind,
        path,
        status,
        visibility,
        dateCreated,
        dateUpdated,
        datePublished,
        relatedPages,
        relatedPosts,
      } = data
      formDataItem = {
        id,
        templateId,
        categories,
        tags,
        title,
        slug,
        description,
        authors,
        highlight,
        coverImage,
        content,
        kind,
        path,
        status,
        visibility,
        dateCreated,
        dateUpdated,
        datePublished,
        relatedPages,
        relatedPosts,
      }
    } else {
      formDataItem = {
        id: pk,
        templateId,
        categories,
        tags,
        title,
        slug,
        description,
        authors,
        highlight,
        coverImage,
        content,
        kind,
        path,
        status,
        visibility,
        dateCreated,
        dateUpdated,
        datePublished,
        relatedPages,
        relatedPosts,
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
    coverImageRef.current.value = ""
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
    const formDataItem = {
      id: pk,
      templateId,
      categories,
      tags,
      title,
      slug,
      description,
      authors,
      highlight,
      content,
      kind,
      path,
      status,
      visibility,
      dateCreated,
      dateUpdated,
      datePublished,
      relatedPages,
      relatedPosts,
    }
    const formData = new FormData()

    const [file] = coverImageRef.current.files
    if (file) {
      formData.append("coverImage", file)
    }
    Object.keys(formDataItem).map((key) => {
      formData.append(key, formDataItem[key])
    })
    const url = cmsApiUrl(["web-page", pk ? `update/${pk}` : "create"])
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
          let messageTag = ""
          errors.map((item) => {
            if (!firstField) {
              firstField = item.path
            }
            newValidationErrors[item.path] = { message: item.msg }
            messageTag += `${item.msg}, \n`
          })
          setValidationErrors(newValidationErrors)

          toast("" + messageTag, "error")

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

  const setCoverImageFile = async (target) => {
    const file64 = await getFile64(target.files[0])
    const [file] = target.files
    setCoverImage(file.name)
    const fileType = file.type.split("/")[0]
    if (fileType === "image") {
      setCoverImageValid(true)
      setCoverImageUrl(file64)
      const newValidationErrors = { ...validationErrors }
      delete newValidationErrors.coverImage
      setValidationErrors(newValidationErrors)
    } else {
      alert("Only image file is allowed")
      coverImageRef.current.value = ""
    }
  }

  const getRemoteRowData = async (pk_) => {
    const url = cmsApiUrl(["web-page", pk_])

    try {
      const { data, validJson, code, text } = await Prx.get(url, requestToken)
      if (validJson) {
        setFormData(data.data)
        setFormChecksum(calculateFormChecksum(data.data))
      } else {
        toast(`Failed to get record id:${pk} server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  const setFormData = (data) => {
    const {
      id,
      templateId,
      categories,
      tags,
      title,
      slug,
      description,
      authors,
      highlight,
      coverImage,
      content,
      kind,
      path,
      status,
      visibility,
      dateCreated,
      dateUpdated,
      datePublished,
      relatedPages,
      relatedPosts,
    } = data
    setPk(id)

    setTemplateId(templateId)
    setCategories(categories)
    setTags(tags)
    setTitle(title)
    setSlug(slug)
    setDescription(description)
    setAuthors(authors)
    setHighlight(highlight)
    setContent(content)
    setKind(kind)
    setPath(path)
    setStatus(status)
    setVisibility(visibility)
    setDateCreated(dateCreated)
    setDateUpdated(dateUpdated)
    setDatePublished(datePublished)
    setRelatedPages(relatedPages)
    setRelatedPosts(relatedPosts)
    setCoverImage(coverImage)
    if (isEmpty(coverImage)) {
      setCoverImageValid(false)
    } else {
      setCoverImageUrl(cmsApiUrl(["web-page/covers", coverImage]))
      setCoverImageValid(true)
    }
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
                      setSlug(slugify(title))
                    }}
                  />
                </div>

                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Description"
                  value={description}
                  fieldname="description"
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                />
                <FormRowValidation
                  validationErrors={validationErrors}
                  useTextArea={true}
                  label="Highlight"
                  value={highlight}
                  fieldname="highlight"
                  onChange={(e) => {
                    setHighlight(e.target.value)
                  }}
                />
                <FormRowSelect
                  validationErrors={validationErrors}
                  label="Kind"
                  value={kind}
                  data={["html", "markdown", "plain", "template"]}
                  fieldname="kind"
                  onChange={(e) => {
                    setKind(e)
                  }}
                />
                {kind == "template" && (
                  <FormRowValidation
                    validationErrors={validationErrors}
                    label="Path"
                    value={path}
                    fieldname="path"
                    onChange={(e) => {
                      setPath(e.target.value)
                    }}
                  />
                )}
                {kind != "template" && (
                  <FormRowValidation
                    validationErrors={validationErrors}
                    useTextArea={true}
                    label="Content"
                    value={content}
                    fieldname="content"
                    onChange={(e) => {
                      setContent(e.target.value)
                    }}
                  />
                )}
                <FormRowImageValidation
                  validationErrors={validationErrors}
                  label="Cover"
                  title="Cover Image"
                  className="mb-4"
                  onChange={(e) => setCoverImageFile(e.target)}
                  fieldname="coverImage"
                  inputRef={coverImageRef}
                  imageUrl={coverImageUrl}
                  validImage={coverImageValid}
                />
                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Authors"
                  value={authors}
                  fieldname="authors"
                  onChange={(e) => {
                    setAuthors(e.target.value)
                  }}
                />
                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Categories"
                  value={categories}
                  fieldname="categories"
                  onChange={(e) => {
                    setCategories(e.target.value)
                  }}
                />

                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Tags"
                  value={tags}
                  fieldname="tags"
                  onChange={(e) => {
                    setTags(e.target.value)
                  }}
                />

                <FormRowSelect
                  validationErrors={validationErrors}
                  label="Status"
                  data={["published", "draft"]}
                  value={status}
                  fieldname="status"
                  onChange={(e) => {
                    setStatus(e)
                  }}
                />

                <FormRowSelect
                  validationErrors={validationErrors}
                  label="Visibility"
                  data={["public", "unlisted"]}
                  value={visibility}
                  fieldname="visibility"
                  onChange={(e) => {
                    setVisibility(e)
                  }}
                />

                {/* <FormRowValidation
                  validationErrors={validationErrors}
                  label="DateCreated"
                  value={dateCreated}
                  fieldname="dateCreated"
                  onChange={(e) => {
                    setDateCreated(e.target.value)
                  }}
                />

                <FormRowValidation
                  validationErrors={validationErrors}
                  label="DateUpdated"
                  value={dateUpdated}
                  fieldname="dateUpdated"
                  onChange={(e) => {
                    setDateUpdated(e.target.value)
                  }}
                />

                <FormRowValidation
                  validationErrors={validationErrors}
                  label="DatePublished"
                  value={datePublished}
                  fieldname="datePublished"
                  onChange={(e) => {
                    setDatePublished(e.target.value)
                  }}
                />

                <FormRowValidation
                  validationErrors={validationErrors}
                  label="RelatedPages"
                  value={relatedPages}
                  fieldname="relatedPages"
                  onChange={(e) => {
                    setRelatedPages(e.target.value)
                  }}
                />

                <FormRowValidation
                  validationErrors={validationErrors}
                  label="RelatedPosts"
                  value={relatedPosts}
                  fieldname="relatedPosts"
                  onChange={(e) => {
                    setRelatedPosts(e.target.value)
                  }}
                /> */}

                <FormRowValidation
                  validationErrors={validationErrors}
                  label="Template"
                  value={templateId}
                  fieldname="templateId"
                  onChange={(e) => {
                    setTemplateId(e.target.value)
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

export default PageForm
export { createUntitledPage }
