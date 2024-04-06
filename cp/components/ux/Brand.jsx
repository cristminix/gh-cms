import { cls11, cls12 } from "@cp/components/shared/ux/cls"
import appLogo from "/logo/github-mark-white.png"

const Brand = () => {
  return (
    <a className={cls12} href="#" aria-label="Brand">
      <div className="flex items-center dark:bg-transparent bg-gray-300 p-2 rounded rounded-md">
        <img src={appLogo} className="w-[32px] h-[32px]" />
        <h2 className="px-2 text-md">GH CMS</h2>
      </div>
    </a>
  )
}

export default Brand
