import { useEffect, useState } from "react"
import { FormRowValidation } from "../shared/ux/Form"
import Button from "../shared/ux/Button"
import $ from "jquery"
const LoginPage = ({ config }) => {
  const [validationErrors, setValidationErrors] = useState({})
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const main = () => {
    setTimeout(() => {
      $(`.username`).trigger("focus")
    }, 512)
    console.log(config)
  }

  const doLogin = async () => {
    setValidationErrors(null)
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
    }
    console.log(username, password)
  }
  useEffect(() => {
    main()
  }, [])
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

        <div className="flex">
          <Button caption="Login" icon="fa fa-sign-in" onClick={(e) => doLogin()} />
        </div>
      </div>
    </>
  )
}

export default LoginPage
