import { createBrowserRouter, createHashRouter } from "react-router-dom"
import CMSApp, { loader as cmsLoader } from "@components/CmsApp"
import TemplateViewer, { loader as tplLoader } from "@components/TemplateViewer"

const router = createHashRouter([
  // {
  //   path: "/preview/:path?",
  //   element: <TemplateViewer />,
  //   loader: tplLoader,
  // },

  {
    path: "/:template?/:block?/:slug?",
    element: <CMSApp />,
    loader: cmsLoader,
  },
])

export default router
