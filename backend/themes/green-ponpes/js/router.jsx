import { createBrowserRouter } from "react-router-dom"
import CMSApp, { loader as cmsLoader } from "@/components/CmsApp"

const router = createBrowserRouter([
  {
    path: "/:template?",
    element: <CMSApp />,
    loader: cmsLoader,
  },
])

export default router
