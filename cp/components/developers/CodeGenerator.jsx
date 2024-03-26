import { HSTabs } from "preline"
import { useEffect } from "react"
import CodeViewer from "./code-generator/CodeViewer"

const CodeGenerator = ({}) => {
  const styles = {}
  const cls0 = "cls-0 relative z-0 flex border rounded-xl overflow-hidden dark:border-gray-700"
  const cls1 =
    "cls-1 hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white dark:hs-tab-active:border-b-blue-600 relative min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-400 active"
  const cls2 =
    "cls-2 hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white dark:hs-tab-active:border-b-blue-600 relative min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-400"
  const cls3 = "cls-3 mt-3"
  const cls4 = "cls-4 text-gray-500 dark:text-gray-400"
  const cls5 = "cls-5 font-semibold text-gray-800 dark:text-gray-200"
  const cls6 = "cls-6 hidden"
  useEffect(() => {
    HSTabs.autoInit()
  }, [])
  return (
    <>
      <nav aria-label="Tabs" role="tablist" className={cls0}>
        <button
          type="button"
          id="bar-with-underline-item-1"
          data-hs-tab="#bar-with-underline-1"
          aria-controls="bar-with-underline-1"
          role="tab"
          className={cls1}
        >
          Form Generator
        </button>
        <button
          type="button"
          id="bar-with-underline-item-2"
          data-hs-tab="#bar-with-underline-2"
          aria-controls="bar-with-underline-2"
          role="tab"
          className={cls2}
        >
          Tab 2
        </button>
        <button
          type="button"
          id="bar-with-underline-item-3"
          data-hs-tab="#bar-with-underline-3"
          aria-controls="bar-with-underline-3"
          role="tab"
          className={cls2}
        >
          Tab 3
        </button>
      </nav>

      <div className={cls3}>
        <div id="bar-with-underline-1" role="tabpanel" aria-labelledby="bar-with-underline-item-1">
          <p className={cls4}>
            This is the <em className={cls5}> first </em> item&apos;s tab body.
          </p>
          <CodeViewer />
        </div>
        <div id="bar-with-underline-2" role="tabpanel" aria-labelledby="bar-with-underline-item-2" className={cls6}>
          <p className={cls4}>
            This is the <em className={cls5}> second </em> item&apos;s tab body.
          </p>
        </div>
        <div id="bar-with-underline-3" role="tabpanel" aria-labelledby="bar-with-underline-item-3" className={cls6}>
          <p className={cls4}>
            This is the <em className={cls5}> third </em> item&apos;s tab body.
          </p>
        </div>
      </div>
    </>
  )
}

export default CodeGenerator
