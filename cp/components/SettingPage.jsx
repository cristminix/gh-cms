import { useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"
import ServerConfig from "./settings/ServerConfig"
import UserManagement from "./settings/UserManagement"
import UserGroupManagement from "./settings/UserGroupManagement"

export async function loader({ params }) {
  const { module, fk, pageNumber, pk } = params
  return { module, pageNumber, fk, pk }
}

const SettingPage = ({ store, config }) => {
  const { module, pageNumber, fk, pk } = useLoaderData()
  console.log(module, pageNumber, fk, pk)
  if (module == "server-config") {
    return <ServerConfig store={store} config={config} />
  } else if (module == "user-manager") {
    return <UserManagement store={store} config={config} pageNumber={pageNumber} />
  } else if (module == "user-group") {
    return <UserGroupManagement store={store} config={config} pageNumber={pageNumber} />
  }

  return null
}

export default SettingPage
