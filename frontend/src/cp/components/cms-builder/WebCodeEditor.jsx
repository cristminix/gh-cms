import React, { useRef, useEffect, useState, useCallback } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import base64 from "base-64"
import Toast from "@/cp/components/shared/ux/Toast"
import { niceScrollbarCls } from "@/cp/components/shared/ux/cls"
import { apiUrl } from "../apps/fn"
import { Prx, requestIdentityToken } from "@/cp/global/fn"
const containerCls = "border mb-2 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700"

const WebCodeEditor = ({ store, config, hash }) => {
  const toastRef = useRef(null)
  const [kind, setKind] = useState("template")
  const [requestToken, setRequestToken] = useState(null)
  const [editorOptions, setEditorOptions] = useState(null)
  const [editorBuffer, setEditorBuffer] = useState("")
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
        //   response = data
        //   console.log(data)
        // setEditorOptions(data.data)
        // console.log(text)
        setEditorBuffer(data)
      } else {
        toast(`Failed to get file ${url} server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
    // return response
  }
  const main = async () => {
    let options = null
    try {
      options = JSON.parse(base64.decode(hash))
      setKind(options.type)
    } catch (e) {
      console.error(e)
    }
    if (options) {
      let { type, data } = options
      const { id } = data
      const url = apiUrl(["code-editor/getFile", type, id])
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
  }, [hash, requestToken])
  useEffect(() => {
    retrieveIdentityToken()
  }, [])
  //   const [value, setValue] = useState(content)
  const onChange = useCallback((val, viewUpdate) => {
    console.log("val:", val)
    // setValue(val)
  }, [])
  return (
    <>
      <div className="min-h-screen">
        <Toast ref={toastRef} />
        <div className={`web-code-editor ${containerCls} ${hash ? "opacity-100" : "opacity-50"}`}>
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
                  <CodeMirror
                    value={editorBuffer}
                    height="200px"
                    extensions={[javascript({ jsx: true })]}
                    onChange={onChange}
                  />
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
