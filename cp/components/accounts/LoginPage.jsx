import { useEffect, useState } from "react"
import { FormRowValidation } from "../shared/ux/Form"
import Button from "../shared/ux/Button"
import $ from "jquery"
import { cmsApiUrl } from "../apps/fn"
import { Prx } from "@cp/global/fn"
import { useCookies } from "react-cookie"
// import { doLogin } from "@cp/cloud/models/users"
// import { doLogin } from "@cp/cloud/models/users"
import { signIn, useAuth } from "@cp/firebase/auth"
import { useNavigate } from "react-router-dom"
const LoginPage = ({ config }) => {
  const [validationErrors, setValidationErrors] = useState({})
  const [cookies, setCookie] = useCookies(["uid", "requestToken"])
  const { isLoading, user } = useAuth()
  const isLogedIn = !!user

  const [errorMessages, setErrorMessages] = useState([])

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const main = () => {
    setTimeout(() => {
      $(`.username`).trigger("focus")
    }, 512)
    // console.log(config)
  }
  const doForgetPassword = () => {
    setErrorMessages(["Sayang sekali sepertinya anda harus tanya admin untuk reset password anda"])
  }
  const onLogin = async () => {
    setValidationErrors(null)
    setErrorMessages([])
    let errorCount = 0
    let verrors = {}
    if (email.length == 0) {
      errorCount += 1
      verrors = { ...verrors, username: { message: "Email is required" } }
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
      try {
        await signIn(email, password)
        // setCookie("uid", result.id)

        navigate("/account/user-profile")
      } catch (e) {
        const message = e.message.replace("FirebaseError:", "").replace("Firebase:", "")
        setErrorMessages([message])
      }
      // const result = await signIn(email, password)
      // // console.log(result)
      // if (result) {
      //   setCookie("uid", result.id)
      //   // setCookie("requestToken", result.request_token)
      //   document.location.hash = "#/account/user-profile"
      //   document.location.reload()
      // } else {
      //   setErrorMessages(["Email atau password salah"])
      // }
      /*const url = cmsApiUrl(["auth/login"])

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
      }*/
    }
    console.log(email, password)
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
          fieldname="email"
          emailField={true}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          label="Email"
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
          <Button caption="Login" icon="fa fa-sign-in" onClick={(e) => onLogin()} />
        </div>
      </div>
    </>
  )
}

export default LoginPage
