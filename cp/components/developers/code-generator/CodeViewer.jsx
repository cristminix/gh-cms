import React from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { dracula } from "@uiw/codemirror-themes-all"
function CodeViewer({ code, onChange, extensions }) {
  const [value, setValue] = React.useState(`${code || ""}`)
  const onChanges = React.useCallback((val, viewUpdate) => {
    console.log("val:", val)
    setValue(val)
    onChange(val)
  }, [])
  return (
    <CodeMirror
      theme={dracula}
      value={value}
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChanges}
    />
  )
}
export default CodeViewer
