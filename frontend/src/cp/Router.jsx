import { RouterProvider, createRoutesFromElements, Route, createHashRouter } from "react-router-dom"
import Template from "./Template"
import SettingPage, { loader as settingLoader } from "./components/SettingPage"
import DeveloperPage, { loader as developerPageLoader } from "./components/DeveloperPage"
import ErrorPage from "./ErrorPage"
import Apps, { loader as ncAppLoader } from "./components/Apps"
import ManualApp, { loader as manualAppLoader } from "./components/ManualApp"
import CMSBuilder, { loader as buildLoader } from "./components/CMSBuilder"

export default function Router({ config, store }) {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorPage />} element={<Template config={config} store={store} />}>
        <Route path="/setting" element={<SettingPage store={store} />} />

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
        <Route path="/settings" element={<SettingPage store={store} config={config} />} loader={settingLoader} />
        <Route
          path="/settings/:module"
          element={<SettingPage store={store} config={config} />}
          loader={settingLoader}
        />
        <Route
          path="/settings/:module/page/:pageNumber"
          element={<SettingPage store={store} config={config} />}
          loader={settingLoader}
        />
        <Route
          path="/settings/:module/:fk"
          element={<SettingPage store={store} config={config} />}
          loader={settingLoader}
        />
        <Route
          path="/settings/:module/:fk/page/:pageNumber"
          element={<SettingPage store={store} config={config} />}
          loader={settingLoader}
        />
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}
