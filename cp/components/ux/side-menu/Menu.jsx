import { useEffect } from "react"
import { cls14, cls22, cls24, cls25, cls17, cls18, cls19, cls20 } from "@cp/components/shared/ux/cls"
import { useLocation, NavLink } from "react-router-dom"
import jQuery from "jquery"
import { makeDelay } from "@cp/global/fn"
const DEV_MODE = import.meta.env.DEV
const delay = makeDelay(1000)
const MenuItem = ({ hasChild, title, path, icon, name, childrens, index, showCaption }) => {
  const activeTabCls =
    "flex items-center mb-1 gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md dark:bg-gray-900 dark:text-white"
  const activeMenuCls = "bg-gray-100 text-sm text-slate-700 rounded-md dark:bg-gray-900 dark:text-white"
  const inactiveTabCls = cls24 + " hover:bg-gray-100  hover:bg-gray-100 dark:hover:bg-gray-700"
  const linkCls = ({ isActive, isPending }) => (isActive ? activeTabCls : inactiveTabCls)
  const { pathname } = useLocation()
  useEffect(() => {}, [])
  return (
    <>
      {hasChild ? (
        <>
          <li id={`${name}-accordion`} className={`${cls17} `} key={name} path={path.replace(/^\//, "")}>
            <button type="button" className={`${cls18} ${pathname.match(path) ? activeMenuCls : ""}`}>
              {/* <i className={`fa fa-chevron-right ${cls19}`} />
              <i className={`fa fa-chevron-down ${cls20}`} /> */}
              <svg
                class="flex-shrink-0 w-3.5 h-3.5 mt-[5px]"
                className={`${cls20} ${showCaption ? "" : "!hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${cls19}  ${showCaption ? "" : "!hidden"}`}
              >
                {" "}
                <path d="m6 9 6 6 6-6"> </path>{" "}
              </svg>
              <i className={icon}></i>
              {showCaption && title}
            </button>
            <div
              id={`${name}-accordion-sub`}
              data-hs-accordion-always-open={pathname.match(path) ? "true" : "false"}
              className={`${cls25} ${pathname.match(path) ? "hidden" : "hidden"} ${showCaption ? "" : "!p-0"}`}
            >
              <ul className={`${cls22}  ${showCaption ? "" : "!pl-0"}`}>
                {Object.keys(childrens).map((key, tindex) => {
                  const item_ = childrens[key]
                  const childrens_ = item_.childItems || {}
                  // console.log(item_)
                  if (item_.hidden) {
                    return null
                  }
                  return (
                    <MenuItem
                      key={key}
                      childrens={childrens_}
                      name={key}
                      index={index}
                      hasChild={item_.hasChild}
                      title={item_.title}
                      path={item_.path}
                      icon={item_.iconCls}
                      showCaption={showCaption}
                    />
                  )
                })}
              </ul>
            </div>
          </li>
        </>
      ) : (
        <>
          <li key={name}>
            <NavLink to={path} className={linkCls} title={title}>
              <i className={icon}></i>
              {showCaption && title}
            </NavLink>{" "}
          </li>
        </>
      )}
    </>
  )
}
const Menu = ({ data, store, config, showCaption = true }) => {
  const { pathname } = useLocation()

  const getChildrenByModel = (item) => {
    let childrens = []
    if (item.model) {
      const modelName = item.model
      const modelObj = store.get(modelName)
      if (modelObj) {
        if (item.modelListMethod) {
          const listMethod = item.modelListMethod

          try {
            const childData = modelObj[listMethod]()
            for (const cItem of childData) {
              const title = cItem[item.displayField]
              const slug = cItem[item.slugField]
              const path = item.childRoutePath.replace(/{SLUG_VALUE}/, slug)
              childrens.push({
                slug,
                title,
                name: slug,
                path,
                iconCls: item.iconCls,
              })
            }
          } catch (e) {
            // console.error(e)
          }
        }
      }
    }
    // console.log(childrens)
    return childrens
  }
  const activateActiveAccordion = () => {
    data.map((item) => {
      // const item = data[key]
      // console.log(item)
      const activeAccordionMenuMatch = pathname.match(item.path)
      if (activeAccordionMenuMatch) {
        let [path] = activeAccordionMenuMatch
        path = path.replace(/^\//, "")
        // console.log(path)
        const $activeAc = jQuery(`li[path=${path}]`)
        if ($activeAc.length > 0) {
          const $activeAcBtn = $activeAc.find("button")
          //   console.log($activeAcBtn)
          const $parent = $activeAcBtn.parent()
          if (!$parent.hasClass("active")) {
            $activeAcBtn.trigger("click")
          }
        }
      }
    })
  }
  useEffect(() => {
    delay(() => {
      HSAccordion.autoInit()
      console.log("accordion updated")
      delay(() => {
        console.log("activateActiveAccordion")
        activateActiveAccordion()
      })
    })
  }, [data])
  return (
    <>
      <ul className={cls14}>
        {data.map((item, index) => {
          // const item = data[key]
          let childrens = item.children
          // console.log(item)
          if (typeof item.dev !== "undefined") {
          } else {
            item.dev = false
          }
          if (item.dev) {
            // console.log(import.meta.env)
            if (!DEV_MODE) {
              item.hidden = true
            }
          }
          if (item.hidden) {
            return null
          }
          const useModel = item.useModel || false
          if (useModel) {
            childrens = getChildrenByModel(item)
            item.hasChild = true
          }
          // item.hasChild = childrens.length > 0

          // console.log(item.hasChild)
          return (
            <MenuItem
              key={index}
              childrens={childrens}
              name={item.slug}
              index={index}
              hasChild={item.hasChild}
              title={item.title}
              path={item.path}
              icon={item.iconCls}
              showCaption={showCaption}
            />
          )
        })}
      </ul>
    </>
  )
}

export default Menu
