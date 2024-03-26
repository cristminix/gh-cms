import React, { useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { okaidia } from "@uiw/codemirror-themes-all"
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
      theme={okaidia}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  )
}
export default CodeViewer
