import { RouterProvider, createRoutesFromElements, Route, createHashRouter } from "react-router-dom"
import Template from "./Template"

// import WelcomePage from "./components/WelcomePage"
// import CoursePage, { loader as courseLoader } from "./components/CoursePage"
// import DownloadPage from "./components/DownloadPage"
// import DownloadManager, { loader as courseSlugLoader } from "./components/DownloadManager"
import SettingPage from "./components/SettingPage"
// import DatabasePage, { loader as databaseLoader } from "./components/DatabasePage"
// import BootstrapIcons,{loader as bootstrapIconLoader} from "./components/BootstrapIcons"
// import TestPage, {loader as testPageLoader} from "./components/TestPage"
import DeveloperPage, { loader as developerPageLoader } from "./components/DeveloperPage"
import ErrorPage from "./ErrorPage"
import Apps, { loader as ncAppLoader } from "./components/Apps"
import ManualApp, { loader as manualAppLoader } from "./components/ManualApp"
import CMSBuilder, { loader as buildLoader } from "./components/CMSBuilder"

export default function Router({ config, store }) {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorPage />} element={<Template config={config} store={store} />}>
        {/* <Route path="/course" element={<CoursePage store={store} />} loader={courseLoader} />
        <Route path="/course/:ctl/:slug" element={<CoursePage store={store} config={config} />} loader={courseLoader} /> */}
        {/* <Route path="/manager/:slug" element={<DownloadManager store={store} />} loader={courseSlugLoader} />
        <Route path="/manager" index={true} element={<DownloadManager store={store} />} loader={courseSlugLoader} /> */}
        <Route path="/setting" element={<SettingPage store={store} />} />
        {/* <Route path="/database" element={<DatabasePage store={store} config={config} />} loader={databaseLoader} />
        <Route path="/database/:table" element={<DatabasePage store={store} config={config} />} loader={databaseLoader} />
        <Route path="/database/:table/:page" element={<DatabasePage store={store} />} loader={databaseLoader} />
        <Route path="/database" element={<DatabasePage store={store} />} /> */}
        <Route
          path="/developer"
          element={<DeveloperPage store={store} config={config} />}
          loader={developerPageLoader}
        />
        <Route
          path="/developer/:page"
          element={<DeveloperPage store={store} config={config} />}
          loader={developerPageLoader}
        />
        <Route path="/builder" element={<CMSBuilder store={store} config={config} />} loader={buildLoader} />
        <Route path="/builder/:module" element={<CMSBuilder store={store} config={config} />} loader={buildLoader} />
        <Route
          path="/builder/:module/page/:pageNumber"
          element={<CMSBuilder store={store} config={config} />}
          loader={buildLoader}
        />
        <Route
          path="/builder/:module/:fk"
          element={<CMSBuilder store={store} config={config} />}
          loader={buildLoader}
        />
        <Route
          path="/builder/:module/:fk/:pk"
          element={<CMSBuilder store={store} config={config} />}
          loader={buildLoader}
        />
        <Route
          path="/builder/:module/:fk/page/:pageNumber"
          element={<CMSBuilder store={store} config={config} />}
          loader={buildLoader}
        />
        <Route path="/apps" element={<Apps store={store} config={config} />} loader={ncAppLoader} />
        <Route path="/apps/:module" element={<Apps store={store} config={config} />} loader={ncAppLoader} />
        <Route
          path="/apps/:module/page/:pageNumber"
          element={<Apps store={store} config={config} />}
          loader={ncAppLoader}
        />
        <Route path="/apps/:module/:fk" element={<Apps store={store} config={config} />} loader={ncAppLoader} />
        <Route
          path="/apps/:module/:fk/page/:pageNumber"
          element={<Apps store={store} config={config} />}
          loader={ncAppLoader}
        />
        <Route path="/manuals" element={<ManualApp store={store} config={config} />} loader={manualAppLoader} />
        <Route path="/manuals/:mod" element={<ManualApp store={store} config={config} />} loader={manualAppLoader} />
        <Route
          path="/manuals/:mod/page/:pageNumber"
          element={<ManualApp store={store} config={config} />}
          loader={manualAppLoader}
        />
        <Route
          path="/manuals/:mod/:fk"
          element={<ManualApp store={store} config={config} />}
          loader={manualAppLoader}
        />
        <Route
          path="/manuals/:mod/:fk/page/:pageNumber"
          element={<ManualApp store={store} config={config} />}
          loader={manualAppLoader}
        />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}
