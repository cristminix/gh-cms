import React from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { okaidia } from "@uiw/codemirror-themes-all"
function CodeViewer() {
  const [value, setValue] = React.useState("console.log('hello world!');")
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val)
    setValue(val)
  }, [])
  return (
    <CodeMirror
      theme={okaidia}
      value={value}
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  )
}
export default CodeViewer
