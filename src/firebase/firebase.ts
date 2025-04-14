import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, indexedDBLocalPersistence } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

auth.setPersistence(indexedDBLocalPersistence);


