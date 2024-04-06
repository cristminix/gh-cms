import Brand from "./Brand"
import { cls11, cls12, clsTopHeader } from "@cp/components/shared/ux/cls"

const TopHeader = ({ onToggleMenu }) => {
  return (
    <>
      <div className={`top-header  ${clsTopHeader} py-3 fixed w-full z-[61]`}>
        <div className={`${cls11} flex items-center gap-2`}>
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
          <Brand />
        </div>
      </div>
    </>
  )
}

export default TopHeader
