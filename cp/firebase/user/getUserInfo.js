import { doc, getDoc } from "firebase/firestore"
import firebase from "../firebase"

export const getUserInfo = async (userId) => {
  const userInfoDoc = await getDoc(doc(firebase.firestore(), "users", userId))
  const userInfo = userInfoDoc.data()
  if (!userInfo) {
    return null
  }

  return {
    ...userInfo,
    id: userInfoDoc.id,
  }
}
