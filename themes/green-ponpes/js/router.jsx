import { createBrowserRouter } from "react-router-dom"
import CMSApp, { loader as cmsLoader } from "@components/CmsApp"
import TemplateViewer, { loader as tplLoader } from "@components/TemplateViewer"

const router = createBrowserRouter([
  // {
  //   path: "/preview/:path?",
  //   element: <TemplateViewer />,
  //   loader: tplLoader,
  // },

  {
    path: "/preview/:template?",
    element: <CMSApp />,
    loader: cmsLoader,
  },
])

export default router
