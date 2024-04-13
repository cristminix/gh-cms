import { useRef, useState } from "react"

const Switch = ({ disabled, value, onChange, id, withDescription, switchDesc = ["Checked", "Unchecked"] }) => {
  let realValue = parseInt(value)
  if (realValue == 1) {
    realValue = true
  } else {
    realValue = false
  }
  let checked = realValue
  const ckRef = useRef(null)
  const realId = `hs-basic${withDescription ? "-with-description" : ""}-${checked ? "checked" : "unchecked"}`

  const checkedCls =
    "relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"

  const uncheckedCls =
    "relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"

  const onCheckChange = (e) => {
    setTimeout((f) => {
      //   console.log(ckRef.current.checked)
      const nChecked = !ckRef.current.checked
      //   setChecked(nChecked)
      onChange(nChecked)
    }, 256)
  }

  const [descChecked, descUnchecked] = switchDesc
  return (
    <>
      <div class="flex items-center">
        <input
          ref={ckRef}
          onClick={(e) => onCheckChange(e)}
          type="checkbox"
          id={`${realId}`}
          className={`${checked ? checkedCls : uncheckedCls}`}
          checked={checked}
        />
        {withDescription && (
          <label for={`${realId}`} class="text-sm text-gray-500 ms-3 dark:text-gray-400">
            {checked ? descChecked : descUnchecked}
          </label>
        )}
      </div>
    </>
  )
}

export default Switch
