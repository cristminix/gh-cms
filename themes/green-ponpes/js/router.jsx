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
    path: "/preview/:path",
    element: <CMSApp />,
    loader: cmsLoader,
  },
  {
    path: "/:template?",
    element: <CMSApp />,
    loader: cmsLoader,
  },
])

export default router
