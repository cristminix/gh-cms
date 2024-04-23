import { useEffect, useState } from "react"
import { FormRowValidation } from "../shared/ux/Form"
import Button from "../shared/ux/Button"
import $ from "jquery"
import { cmsApiUrl } from "../apps/fn"
import { Prx } from "@cp/global/fn"
import { useCookies } from "react-cookie"

const LoginPage = ({ config }) => {
  const [validationErrors, setValidationErrors] = useState({})
  const [cookies, setCookie] = useCookies(["uid", "requestToken"])
  const [isLogedIn, setIsLoggedIn] = useState(cookies.uid)

  const [errorMessages, setErrorMessages] = useState([])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const main = () => {
    setTimeout(() => {
      $(`.username`).trigger("focus")
    }, 512)
    // console.log(config)
  }
  const doForgetPassword = () => {
    setErrorMessages(["Sayang sekali sepertinya anda harus tanya admin untuk reset password anda"])
  }
  const doLogin = async () => {
    setValidationErrors(null)
    setErrorMessages([])
    let errorCount = 0
    let verrors = {}
    if (username.length == 0) {
      errorCount += 1
      verrors = { ...verrors, username: { message: "Username is required" } }
    }
    if (password.length == 0) {
      errorCount += 1
      verrors = { ...verrors, password: { message: "Password is required" } }
    }
    if (errorCount > 0) {
      setValidationErrors({ ...verrors })
      console.log(validationErrors)
      const firstField = Object.keys(validationErrors)[0]
      setTimeout(() => {
        $(`.${firstField}`).trigger("focus")
      }, 512)
    } else {
      const url = cmsApiUrl(["auth/login"])

      try {
        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        const { data, validJson, code, text } = await Prx.post(url, "", formData)
        console.log(data)
        if (validJson) {
          const { success, token, result } = data
          setCookie("uid", result.id)
          setCookie("requestToken", token)
          document.location.hash = "#/account/user-profile"
          document.location.reload()
          if (success) {
          } else {
            console.log(data)
          }
        } else {
          console.error(`Failed to create record server sent http ${code} ${text}`, "error")
        }
      } catch (e) {
        console.error(e.toString(), "error")
      }
    }
    console.log(username, password)
  }
  useEffect(() => {
    main()
  }, [])

  useEffect(() => {
    if (isLogedIn) {
      document.location.hash = "#/account/user-profile"
      // document.location.reload()
    }
  }, [isLogedIn])
  return (
    <>
      <div className="login-form flex items-center flex-col">
        <h2 className="text-2xl py-2 font-bold">
          <i className="fa fa-lock mr-2" />
          Login Page
        </h2>

        <FormRowValidation
          usePlaceholder={true}
          fieldname="username"
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          label="Username"
          validationErrors={validationErrors}
        />
        <FormRowValidation
          passwordField={true}
          usePlaceholder={true}
          fieldname="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          label="Password"
          validationErrors={validationErrors}
        />
        {Array.isArray(errorMessages) && errorMessages.length > 0 && (
          <>
            <div className="error-messages lg:w-1/6 flex flex-col items-center p-4">
              {errorMessages.map((msg, i) => (
                <div key={i} className="text-red-500">
                  {msg}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex gap-2 justify-between p-4">
          <Button caption="Lupa Password ?" onClick={(e) => doForgetPassword()} />
          <Button caption="Login" icon="fa fa-sign-in" onClick={(e) => doLogin()} />
        </div>
      </div>
    </>
  )
}

export default LoginPage
