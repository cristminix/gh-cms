import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

import firebaseConfig from "./cred.json"

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const auth = getAuth(app)
const firestore = getFirestore(app)

const firebase = {
  auth: () => {
    return {
      signOut: async () => await signOut(auth),
      signInWithEmailAndPassword: async (email, password) => await signInWithEmailAndPassword(auth, email, password),
      onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback),
      currentUser: auth.currentUser,
      analytics: () => analytics,
    }
  },
  app: () => app,
  // analytics: () => analytics,
  firestore: () => firestore,
}

export default firebase
