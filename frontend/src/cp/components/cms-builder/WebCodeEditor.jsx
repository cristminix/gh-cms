import React, { useRef, useEffect, useState, useCallback } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { twig, twigLanguage } from "@ssddanbrown/codemirror-lang-twig"
import base64 from "base-64"
import Toast from "@/cp/components/shared/ux/Toast"
import { niceScrollbarCls } from "@/cp/components/shared/ux/cls"
import { apiUrl } from "../apps/fn"
import { Prx, requestIdentityToken } from "@/cp/global/fn"
import Button from "@/cp/components/shared/ux/Button"
import JsonView from "react18-json-view"
const containerCls = "border mb-2 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700"
import "react18-json-view/src/style.css"
const WebCodeEditor = ({ store, config, mode, pk }) => {
  const toastRef = useRef(null)
  const [kind, setKind] = useState(mode)
  const [requestToken, setRequestToken] = useState(null)
  const [editorOptions, setEditorOptions] = useState(null)
  const [editorBuffer, setEditorBuffer] = useState("")
  const [content, setContent] = useState("")
  const [logOutput, setLogOutput] = useState("")

  const save = async () => {
    let path = null
    if (kind == "template") {
      const { templatePath } = editorOptions
      path = templatePath
    }
    const url = apiUrl(["code-editor/saveFile", kind, pk])
    try {
      const formData = new FormData()
      formData.append("content", content)
      const { data, validJson, code, text } = await Prx.post(url, null, formData)
      if (validJson) {
        // setEditorBuffer(data)
        setLogOutput(data)
      } else {
        toast(`Failed to get file ${url} server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  const reload = async () => {
    if (confirm("Are you sure you want to reload the file?")) {
      main()
    }
  }
  const generate = async () => {
    let path = null
    if (kind == "template") {
      const { templatePath } = editorOptions
      path = templatePath
    }
    const url = apiUrl(["code-editor/generate", kind, pk])
    try {
      const formData = new FormData()
      //   formData.append("content", content)
      const { data, validJson, code, text } = await Prx.post(url, null, formData)
      if (validJson) {
        setEditorBuffer(data.data)
        setContent(data.data)
        setLogOutput(data)
      } else {
        toast(`Failed to get file ${url} server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  const toast = (message, t) => {
    if (toastRef.current) {
      toastRef.current.add(message, t)
    }
  }
  const loadFile = async () => {
    let path = null
    if (kind == "template") {
      const { templatePath } = editorOptions
      path = templatePath
    }
    const url = apiUrl([path])
    try {
      const { data, validData, code, text } = await Prx.get(url, null, {}, "text")
      if (validData) {
        setEditorBuffer(data)
      } else {
        toast(`Failed to get file ${url} server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  const main = async () => {
    //   const { id } = data
    const url = apiUrl(["code-editor/getFile", kind, pk])
    try {
      const { data, validJson, code, text } = await Prx.get(url, requestToken)
      if (validJson) {
        //   response = data
        //   console.log(data)
        setEditorOptions(data.data)
      } else {
        toast(`Failed to get states server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
    // return response
  }
  const retrieveIdentityToken = async () => {
    const appId = config.getAppId()
    const url = apiUrl("auth/generateToken")
    const token = await requestIdentityToken(appId, url, toast)
    if (token) {
      setRequestToken(token)
    }
  }
  useEffect(() => {
    if (editorOptions) {
      loadFile()
    }
  }, [editorOptions])
  useEffect(() => {
    // console.log(hash)
    if (requestToken) {
      main()
    }
  }, [requestToken])
  useEffect(() => {
    retrieveIdentityToken()
  }, [])
  const onChange = useCallback((val, viewUpdate) => {
    // console.log("val:", val)
    // setValue(val)
    setContent(val)
  }, [])
  return (
    <>
      <div className="min-h-screen">
        <Toast ref={toastRef} />

        <div className={`web-code-editor ${containerCls} ${pk ? "opacity-100" : "opacity-50"}`}>
          <div className="grid-toolbar pb-4">
            <div className="flex justify-between gap-2">
              {/* <Button onClick={(e) => backToThemes()} icon="fa fa-chevron-left" caption="Kembali ke Tema" /> */}
              <div className="flex gap-2"></div>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className={`-m-1.5 overflow-x-auto ${niceScrollbarCls}`}>
              <div className="p-1.5 ">
                <div className="">
                  <div className="grid-toolbar pb-4">
                    <div className="flex  gap-2">
                      <Button onClick={(e) => reload()} icon="fa fa-refresh" caption="Reload" />
                      <Button onClick={(e) => save()} icon="fa fa-save" caption="Save" />
                      <Button onClick={(e) => generate()} icon="fa fa-cog" caption="Generate" />
                      <div className="flex gap-2"></div>
                    </div>
                  </div>
                  <CodeMirror value={editorBuffer} height="200px" extensions={[twigLanguage]} onChange={onChange} />
                </div>
                <div className="p-2">
                  <JsonView src={logOutput} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WebCodeEditor
