import React, { useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"

function CodeViewer({ buffer = "" }) {
  const [value, setValue] = React.useState("")
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val)
    setValue(val)
  }, [])

  // useState(() => {
  //   console.log("buffer:", buffer)
  //   setValue(buffer)
  // }, [buffer])
  return (
    <CodeMirror
      value={buffer}
      height="300px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  )
}
export default CodeViewer
