import { useLoaderData } from "react-router-dom"
import UserProfile from "./accounts/UserProfile"
import LoginPage from "./accounts/LoginPage"
export async function loader({ params }) {
  const { module, fk, pageNumber } = params
  return { module, pageNumber, fk }
}

const Account = ({ store, config }) => {
  const { module, pageNumber, fk } = useLoaderData()
  if (module == "user-profile") {
    return <UserProfile config={config} store={store} />
  } 
  else if (module == "login") {
    return <LoginPage store={store} config={config} />
  }
  // else if (module == "yt-upload-tt") {
  //   return <YTUploadTT store={store} config={config} pageNumber={pageNumber} uploadId={fk} />
  // } 

  else return <div className="accounts">{module}</div>
}

export default Account
