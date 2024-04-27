import firebase from "../firebase"
import { getCurrentUser } from "../auth"
import { doc, setDoc } from "firebase/firestore"
export const updateCurrentUserInfo = async (updates) => {
  const currentUser = getCurrentUser()
  if (!currentUser) return

  await setDoc(doc(firebase.firestore(), "users", currentUser.id), updates)
}
