import { useEffect, useState } from "react"
import AdvancedSelect from "./AdvancedSelect"
import Button from "./Button"
import CheckBox from "./CheckBox"
import { ValidationErrIcon } from "./ValidationIcon"
import { inputCls, niceScrollbarCls, inputClsError } from "./cls"
import { uuid } from "uuidv4"
const FormRow = ({
  label,
  onChange = (f) => f,
  value,
  readonly = false,
  className = "",
  lblClassName = "",
  inputClassName = "",
}) => {
  return (
    <div className={`flex items-center p-2 px-2 ${className}`}>
      <div className={`w-[70px] font-bold ${lblClassName}`}>
        <label className="">{label}</label>
      </div>
      <div className="flex-grow">
        <input className={` ${inputCls} ${inputClassName}`} value={value} onChange={onChange} readOnly={readonly} />
      </div>
    </div>
  )
}

const FormRowSelect = ({
  className = "",
  label,
  url = null,
  data = [],
  onChange = (f) => f,
  value,
  readonly = false,
}) => {
  const [selectData, setSelectData] = useState(data)
  const getDataUrl = async () => {
    if (!url) {
      // HSSelect.autoInit()
      // return
      const oldData = Object.assign([], selectData)
      setSelectData([])
      // const
      setTimeout(() => {
        setSelectData([...selectData])
      }, 512)
      return
    }
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSelectData(res.data)
        } else {
          console.log(res)
        }
      })
  }
  useEffect(() => {
    if (url) {
      getDataUrl()
    }
    return () => {
      // setSelectData([])
    }
  }, [url])
  return (
    <div className={`h-[100px] flex items-center p-2 px-2 ${className}`}>
      <div className="w-[70px]">
        <label className="font-bold">{label}</label>
      </div>
      <div className="flex-grow flex gap-2">
        {/* <input className={inputCls} value={value} onChange={onChange} readOnly={readonly} /> */}
        {selectData.length > 0 ? (
          <AdvancedSelect salt={uuid()} data={selectData} onSelect={onChange} label={label} selected={value} />
        ) : (
          "LOADING...."
        )}
        {true && <Button onClick={(e) => getDataUrl()} icon="fa fa-refresh" />}
      </div>
    </div>
  )
}

const FormRowValidation = ({
  label,
  onChange = (f) => f,
  value,
  validationErrors,
  fieldname,
  autofocus = false,
  useTextArea = false,
  className = "",
}) => {
  return (
    <div className="flex items-center p-2 px-2">
      <div className={`w-[70px] ${useTextArea ? "self-start py-4" : ""} `}>
        <label className="font-bold ">{label}</label>
      </div>
      <div className="flex-grow">
        <div className="relative">
          {useTextArea ? (
            <textarea
              className={`${
                validationErrors[fieldname] ? inputClsError : inputCls
              }  ${niceScrollbarCls} ${fieldname} ${className} min-h-[128px]`}
              value={value}
              onChange={onChange}
              autofocus={autofocus} /*eslint-disable*/
            ></textarea>
          ) : (
            <input
              className={`${validationErrors[fieldname] ? inputClsError : inputCls} ${fieldname} ${className}`}
              value={value}
              onChange={onChange}
              autofocus={autofocus} /*eslint-disable*/
            />
          )}
          {validationErrors[fieldname] && <ValidationErrIcon absolute="yes" />}
        </div>

        {validationErrors[fieldname] && (
          <p className="text-sm text-red-600 mt-2">{validationErrors[fieldname].message}</p>
        )}
      </div>
    </div>
  )
}

const FormRowImageValidation = ({
  label,
  onChange,
  validationErrors,
  fieldname,
  className = "",
  title,
  inputRef,
  imageUrl,
  validImage,
}) => {
  return (
    <div className={`flex  p-2 px-2 ${className}`}>
      <div className="w-[80px]">
        <label className="font-bold">{label}</label>
      </div>
      <div className="flex-grow relative pl-2">
        <div className="absolute flex flex-row justify-end w-full items-center px-2">
          <Button
            title={title}
            icon="fa fa-upload"
            caption="Upload Image"
            className={`${fieldname}`}
            onClick={(e) => {
              // inputRef.current.value = ""
              inputRef.current.click()
            }}
          />
        </div>
        <div className="">
          <div className="h-{30px} w-{30px} bg-white"></div>
          <input type="file" ref={inputRef} className={`hidden ${inputCls}`} onChange={onChange} />

          {validImage ? (
            <div className="flex-grow rounded rounded-md overflow-hidden mb-2">
              <img src={`${imageUrl}`} />
            </div>
          ) : null}
        </div>
        <div className="flex">
          {validationErrors[fieldname] && <ValidationErrIcon absolute="no" />}
          {validationErrors[fieldname] && (
            <p className="text-sm text-red-600 mt-0">{validationErrors[fieldname].message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

const FormRowCheckbox = ({ label, onChange = (f) => f, value }) => {
  return (
    <div className="flex items-center p-2 px-2">
      <div>
        <CheckBox tabIndex={8} label="" checked={value} onChange={(checked) => onChange(checked)} />
      </div>
      <div className="w-[140px]">
        <label className="font-bold">{label}</label>
      </div>
    </div>
  )
}
export { FormRowCheckbox, FormRow, FormRowValidation, FormRowImageValidation, FormRowSelect }
