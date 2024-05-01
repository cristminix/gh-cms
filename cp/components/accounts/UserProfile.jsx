import { useEffect, useRef, useState } from "react"
import { useCookies } from "react-cookie"
import base64 from "base-64"
import { cmsApiUrl } from "../apps/fn"
import Toast from "../shared/ux/Toast"
import { Prx } from "@cp/global/fn"
import Button from "../shared/ux/Button"
import {
  btnCls,
  modalCls,
  modalBtnCloseCls,
  modalBtnFrmCloseCls,
  modalBtnFrmSaveCls,
} from "@cp/components/shared/ux/cls"
import { useDbProvider } from "../../../config/cp.json"
import { FormRow, FormRowImageValidation, FormRowSelect, FormRowValidation } from "../shared/ux/Form"
import { signOut, useAuth } from "@cp/firebase/auth"
import { getCurrentUserInfo } from "@cp/firebase/user"
import { useNavigate } from "react-router-dom"
const UserProfile = ({ config }) => {
  const [pk, setPk] = useState("")
  const [username, setUsername] = useState("")
  const [passwd, setPasswd] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [groupId, setGroupId] = useState("")
  const [createdBy, setCreatedBy] = useState("")
  const [createDate, setCreateDate] = useState("")
  const [lastUpdated, setLastUpdated] = useState("")

  const [cookies, setCookie, removeCookie] = useCookies(["uid", "requestToken"])
  const { user } = useAuth()
  const [userInfo, setUserInfo] = useState({})
  const [uid, setUid] = useState(cookies.uid)

  const toastRef = useRef(null)
  const toast = (message, t) => {
    if (toastRef.current) {
      toastRef.current.add(message, t)
    }
  }
  const main = () => {
    console.log(cookies)
    console.log(config)
  }
  const getRemoteRowData = async (pk_) => {
    const url = cmsApiUrl(["cms-user", pk_])
    let { requestToken } = cookies
    requestToken = `u${uid}-${requestToken}`
    try {
      const { data, validJson, code, text } = await Prx.get(url, requestToken)
      if (validJson) {
        // setFormChecksum(calculateFormChecksum(data.data))
        setUser(data.data)
      } else {
        toast(`Failed to get record id:${pk} server sent http ${code} ${text}`, "error")
      }
    } catch (e) {
      toast(e.toString(), "error")
    }
  }
  useEffect(() => {
    main()
  }, [])

  useEffect(() => {
    if (useDbProvider) {
      if (user) {
        console.log(user)

        const loadUserInfo = async () => {
          const userInfo = await getCurrentUserInfo()
          console.log(userInfo)
          setFormData(userInfo)
        }
        loadUserInfo()
      }
    } else {
      if (uid) {
        getRemoteRowData(uid)
      }
    }
    // main()
  }, [user, uid])
  const setFormData = (data) => {
    const { id, username, email, firstName, lastName, displayName, avatarUrl, groupId, groupName } = data
    setPk(id)

    setUsername(username)
    setPasswd("******")
    setEmail(email)
    setFirstName(firstName)
    setLastName(lastName)
    setDisplayName(displayName)
    setAvatarUrl(avatarUrl)
    setGroupId(groupName)
    setCreatedBy(createdBy)
    setCreateDate(createDate)
    setLastUpdated(lastUpdated)
  }
  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])
  const formRef = useRef(null)
  const [validationErrors, setValidationErrors] = useState({})
  //   const { uid, requestToken } = cookies
  const formId = "user-profile-from"
  const modalCls = "py-4"
  const modalBtnId = "user-profile-modal-btn"
  const modalCloseBtnId = "user-profile-modal-close-btn"
  //   const modalBtnCloseCls = ""
  //   const modalBtnFrmSaveCls = ""
  //   const modalBtnFrmCloseCls = ""
  const navigate = useNavigate()
  return (
    <div className="user-profile">
      <Toast ref={toastRef} />
      <h2 className="text-2xl py-2">User Profile</h2>
      <Button
        caption="Logout"
        icon="fa fa-sign-out"
        onClick={async (e) => {
          // removeCookie("uid")
          // removeCookie("requestToken")
          // document.location.hash = "#/account/login"
          // document.location.reload()
          await signOut()
          navigate("/account/login")
        }}
      />

      <div>{/* <p>{uid}</p> */}</div>
      {user && (
        <div id={formId} className={`${modalCls} text-xs`}>
          <div className="transition-all">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="p-4 overflow-y-auto">
                <form className={"className"} ref={formRef}>
                  <FormRowImageValidation
                    validationErrors={validationErrors}
                    label="Avatar"
                    value={avatarUrl}
                    fieldname="avatarUrl"
                    className="mb-4"
                    onChange={(e) => {
                      setAvatarUrl(e.target.value)
                    }}
                  />
                  <FormRowValidation
                    validationErrors={validationErrors}
                    label="Username"
                    value={username}
                    fieldname="username"
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                    autofocus="yes"
                  />

                  <FormRowValidation
                    validationErrors={validationErrors}
                    label="Passwd"
                    value={passwd}
                    fieldname="passwd"
                    onChange={(e) => {
                      setPasswd(e.target.value)
                    }}
                  />

                  <FormRowValidation
                    validationErrors={validationErrors}
                    label="Email"
                    value={email}
                    fieldname="email"
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                  <div className="flex gap-2">
                    <FormRowValidation
                      validationErrors={validationErrors}
                      label="First Name"
                      value={firstName}
                      fieldname="firstName"
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                    />

                    <FormRowValidation
                      validationErrors={validationErrors}
                      label="Last Name"
                      value={lastName}
                      fieldname="lastName"
                      onChange={(e) => {
                        setLastName(e.target.value)
                      }}
                    />
                  </div>
                  <FormRowValidation
                    validationErrors={validationErrors}
                    label="Display"
                    value={displayName}
                    fieldname="displayName"
                    onChange={(e) => {
                      setDisplayName(e.target.value)
                    }}
                  />

                  <FormRow
                    // validationErrors={validationErrors}
                    label="Group"
                    value={groupId}
                    fieldname="groupId"
                    // url={cmsApiUrl("cms-user-group/dropdown")}
                    onChange={(e) => {
                      setGroupId(e)
                    }}
                  />
                </form>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                <button tabIndex={10} onClick={(e) => saveForm(e)} type="button" className={modalBtnFrmSaveCls}>
                  Edit
                </button>
                <button tabIndex={10} onClick={(e) => saveForm(e)} type="button" className={modalBtnFrmSaveCls}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
