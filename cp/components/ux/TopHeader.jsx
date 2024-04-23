import Brand from "./Brand"
import { cls11, cls12, clsTopHeader } from "@cp/components/shared/ux/cls"
import { useState } from "react"

const getCurrentTheme = () => {
  let theme = "light"
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    theme = "dark"
  }

  return theme
}

const TopHeader = ({ onToggleMenu, isLogedIn, store, config }) => {
  const [theme, setTheme] = useState(getCurrentTheme())

  const toggleTheme = () => {
    let currentTheme = getCurrentTheme()
    const newTheme = currentTheme == "dark" ? "light" : "dark"

    document.documentElement.classList.add(newTheme)
    document.documentElement.classList.remove(currentTheme)

    localStorage.theme = newTheme
    setTheme(newTheme)
  }
  return (
    <>
      <div className={`top-header ${clsTopHeader} flex items-center justify-between  py-3 fixed w-full z-[60]`}>
        <div className={`${cls11} flex items-center gap-2`}>
          {isLogedIn && (
            <button
              className="p-2 rounded-md"
              onClick={(e) => {
                onToggleMenu()
              }}
            >
              <svg
                focusable="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                //   strokeLinecap="round"
                //   strokeLinejoin="round"
              >
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </button>
          )}

          <Brand />
        </div>
        <div class="flex items-center gap-x-1 relative z-10 ">
          <div>
            {theme == "light" ? (
              <button
                type="button"
                class=" rounded-full dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={(e) => toggleTheme()}
              >
                <span class="group inline-flex flex-shrink-0 justify-center items-center h-9 w-9 font-medium rounded-full text-gray-800 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800">
                  <svg
                    class="flex-shrink-0 w-4 h-4"
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
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                </span>
              </button>
            ) : (
              <button
                type="button"
                class=" rounded-full dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={(e) => toggleTheme()}
              >
                <span class="group inline-flex flex-shrink-0 justify-center items-center h-9 w-9 font-medium rounded-full text-gray-800 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800">
                  <svg
                    class="flex-shrink-0 w-4 h-4"
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
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 8a2 2 0 1 0 4 4"></path>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                </span>
              </button>
            )}

            {/* <!-- End Dark Mode --> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default TopHeader
