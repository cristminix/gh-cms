// import EditorJS from "@editorjs/editorjs"
import Button from "@cp/components/shared/ux/Button"
import { useEffect, useRef, useCallback, useState } from "react"

import { createReactEditorJS } from "react-editor-js"
import { cmsApiUrl } from "@cp/components/apps/fn"
import { Prx } from "@cp/global/fn"
import Embed from "@editorjs/embed"
import Table from "@editorjs/table"
import Paragraph from "@editorjs/paragraph"
import List from "@editorjs/list"
import Warning from "@editorjs/warning"
import Code from "@editorjs/code"
import LinkTool from "@editorjs/link"
import Image from "@editorjs/image"
import Raw from "@editorjs/raw"
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"
import Marker from "@editorjs/marker"
import CheckList from "@editorjs/checklist"
import Delimiter from "@editorjs/delimiter"
import InlineCode from "@editorjs/inline-code"
import SimpleImage from "@editorjs/simple-image"
import $ from "jquery"
const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  embed: Embed,
  // table: Table,
  list: List,
  // warning: Warning,
  // code: Code,
  linkTool: LinkTool,
  // image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  // marker: Marker,
  checklist: CheckList,
  // delimiter: Delimiter,
  // inlineCode: InlineCode,
  // simpleImage: SimpleImage,
}

import "./page-editor.css"
const PageEditor = ({ data, toast, requestToken, closeEditor }) => {
  const [row, setRow] = useState(data)
  const [blocks, setBlocks] = useState(null)
  const editorCore = useRef(null)

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.dangerouslyLowLevelInstance?.save()
    console.log(savedData)
    const blocks = JSON.stringify(savedData)
    saveForm(blocks)
  }, [row])
  const ReactEditorJS = createReactEditorJS()
  const saveForm = async (blocks) => {
    let pk = null
    if (row.id) {
      pk = row.id
      row.blocks = blocks
    }
    const formDataItem = row
    const formData = new FormData()

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
          // setValidationErrors(newValidationErrors)

          toast("" + messageTag, "error")

          // focus first field
          // jQuery(`#${formId}`).find(`.${firstField}:first`).trigger("focus")
        } else {
          // console.log(data)
          // hideModalForm()
          // updateFormChecksum(data)
          // setValidationErrors({})
          if (!pk) {
            toast("Record created", "success")
            // goToLastPage()
          } else {
            toast("Record updated", "success")
            // updateList()
          }
        }
      } else {
        toast(`Failed to create record server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  useEffect(() => {
    setRow(data)
  }, [data])

  useEffect(() => {
    if (row) {
      setBlocks(null) // let blocks = []
      setTimeout(() => {
        if (row) {
          try {
            const blk = JSON.parse(row.blocks)
            console.log(blk)
            setBlocks(blk)
            // blocks = blk
            if (!blk) {
              setBlocks({
                version: "2.29.1",
                time: 1712032422195,
                blocks: [],
              })
            }
          } catch (e) {
            console.log(e)
            setBlocks({
              version: "2.29.1",
              time: 1712032422195,
              blocks: [],
            })
          }
        }
      }, 512)
    }
  }, [row])
  const onCloeEditor = (e) => {
    if (confirm("Are you sure you want to close this editor?")) {
      $("#page-editor-save-btn").click()
      setTimeout(() => {
        closeEditor()
      }, 512)
    }
  }
  return (
    <div className="bg-inherit">
      <div className="flex gap-2 justify-between">
        <Button id="page-editor-save-btn" onClick={handleSave} title="Save" icon="fa fa-save" />
        <Button onClick={(e) => onCloeEditor(e)} title="Close" icon="fa fa-times" />
      </div>
      {row && <ReactEditorJS value={blocks} onInitialize={handleInitialize} tools={EDITOR_JS_TOOLS} />}
    </div>
  )
}

export default PageEditor
