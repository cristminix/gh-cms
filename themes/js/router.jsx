import { createBrowserRouter, createHashRouter } from "react-router-dom"
import WebPreviewApp, { loader as webLoader } from "@components/WebPreviewApp"
import TemplateViewer, { loader as tplLoader } from "@components/TemplateViewer"

const router = createHashRouter([
  // {
  //   path: "/preview/:path?",
  //   element: <TemplateViewer />,
  //   loader: tplLoader,
  // },

  {
    path: "/:template?/:block?/:slug?",
    element: <WebPreviewApp />,
    loader: webLoader,
  },
])

export default router
