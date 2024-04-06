// import EditorJS from "@editorjs/editorjs"
import Button from "@cp/components/shared/ux/Button"
import { FormRow } from "@cp/components/shared/ux/Form"
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
// import SimpleImage from "@editorjs/simple-image"
import PageTitle from "./editor-js/pageTitle"
import Highlight from "./editor-js/highlight"
import $ from "jquery"
import { crc32 } from "crc"
import { makeDelay } from "@cp/global/fn"
const delay = makeDelay(256)
class SimpleImage {
  static get toolbox() {
    return {
      title: "Image",
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    }
  }

  render() {
    return document.createElement("input")
  }

  save(blockContent) {
    return {
      url: blockContent.value,
    }
  }
}
const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  pageTitle: PageTitle,
  highlight: Highlight,
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
  simpleImage: SimpleImage,
}

import "./page-editor.css"

const createId = (flag = false) => {
  const tm = new Date().getTime()
  const id = crc32(tm.toString()).toString(16)
  if (flag) {
    return id
  }
  return [id, tm]
}
const createBlock = (type, content) => {
  const [id, tm] = createId()
  const blocks = [
    {
      id,
      type,
      data: {
        text: content,
      },
    },
  ]
  return { version: "2.29.1", time: tm, blocks }
}

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
    const title = savedData.blocks.shift()
    const highlight = savedData.blocks.shift()
    const blocks = JSON.stringify(savedData)

    saveForm(blocks, title, highlight)
  }, [row])
  const ReactEditorJS = createReactEditorJS()
  const saveForm = async (blocks, title = null, highlight = null) => {
    let pk = null
    if (row.id) {
      pk = row.id
      row.blocks = blocks
    }
    console.log(title, highlight)
    if (title) {
      // row.title = title.data.text
      row.title = title.data.text
    }
    if (highlight) {
      // row.highlight = highlight.data.text
      row.highlight = highlight.data.text
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

          toast("" + messageTag, "error")
        } else {
          if (!pk) {
            toast("Record created", "success")
          } else {
            toast("Record updated", "success")
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
  const selector = ".ce-toolbar__actions .ce-toolbar__plus,.ce-toolbar__actions .ce-toolbar__settings-btn"

  useEffect(() => {
    if (row) {
      setBlocks(null) // let blocks = []
      setTimeout(() => {
        if (row) {
          let blk = null
          try {
            blk = JSON.parse(row.blocks)
            // console.log(blk)
            // blocks = blk
            if (!blk) {
              blk = {
                version: "2.29.1",
                time: 1712032422195,
                blocks: [],
              }
            }
          } catch (e) {
            console.log(e)
            blk = {
              version: "2.29.1",
              time: 1712032422195,
              blocks: [],
            }
          }

          const defaultBlocks = [
            {
              id: createId(true),
              type: "pageTitle",
              data: {
                text: row.title,
              },
            },
            {
              id: createId(true),
              type: "highlight",
              data: {
                text: row.highlight,
              },
            },
          ]

          const nBlocks = [...defaultBlocks, ...blk.blocks]
          blk.blocks = nBlocks
          setBlocks(blk)
          $(selector).off("mouseover", mouseOvListener)
          $(selector).on("mouseover", mouseOvListener)

          $(selector).off("mouseout", mouseOutListener)
          $(selector).on("mouseout", mouseOutListener)
        }
      }, 512)
    }

    return () => {
      $(selector).off("mouseover", mouseOvListener)
      $(selector).off("mouseout", mouseOutListener)
    }
  }, [row])
  const mouseOvListener = (e) => {
    const $related = $(e.relatedTarget)
    const $target = $(e.target).closest("div.ce-toolbar__actions")
    if ($related.hasClass("ce-block")) {
      const $found = $related.find(".ce-page-title,.ce-highlight")
      console.log($found)
      if ($found.length > 0) {
        $target.addClass("fixed -left-10280")
        setTimeout(() => {
          $target.removeClass("fixed -left-10280")
        }, 1000)
      } else {
      }
    } else {
      console.log($related.attr("class"))
    }
  }
  const mouseOutListener = (e) => {}
  useEffect(() => {}, [])
  const onCloseEditor = (e) => {
    // if (confirm("Are you sure you want to close this editor?")) {
    //   // $("#page-editor-save-btn").click()
    //   setTimeout(() => {
    closeEditor()
    //   }, 512)
    // }
  }
  return (
    <div className="bg-inherit relative">
      <div className="flex gap-2 justify-between fixed right-10 z-[70] -mt-4">
        <Button id="page-editor-save-btn" onClick={handleSave} title="Save" icon="fa fa-save" />
        <Button onClick={(e) => onCloseEditor(e)} title="Close" icon="fa fa-times" />
      </div>
      <div>{row && <ReactEditorJS value={blocks} onInitialize={handleInitialize} tools={EDITOR_JS_TOOLS} />}</div>
    </div>
  )
}

export default PageEditor
