import firebase from "../firebase"

export const signIn = async (email, password) => {
  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    return {}
  } catch (e) {
    console.log(e.toString())
    throw new Error("Error signing in: " + e)
  }
}
