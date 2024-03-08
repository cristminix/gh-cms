import { useLoaderData } from "react-router-dom"
import NativeClient from "./apps/NativeClient"
import UserManagement from "./apps/UserManagement"
import YTUpload from "./apps/YTUpload"
import YTUploadTT from "./apps/YTUploadTT"

export async function loader({ params }) {
  const { module, fk, pageNumber } = params
  return { module, pageNumber, fk }
}

const Apps = ({ store, config }) => {
  const { module, pageNumber, fk } = useLoaderData()

  if (module == "native-client") {
    return <NativeClient store={store} config={config} />
  } else if (module == "user-management") {
    return <UserManagement store={store} config={config} pageNumber={pageNumber} />
  } else if (module == "yt-upload") {
    return <YTUpload store={store} config={config} pageNumber={pageNumber} />
  } else if (module == "yt-upload-tt") {
    return <YTUploadTT store={store} config={config} pageNumber={pageNumber} uploadId={fk} />
  } else return <div className="apps">{module}</div>
}

export default Apps
