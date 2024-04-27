import firebase from "../firebase"

export const getCurrentUser = () => {
  const user = firebase.auth().currentUser
  if (!user) {
    return null
  }
  return {
    id: user.uid,
  }
}
