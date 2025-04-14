import { initializeApp } from "firebase/app";
import { getAuth, indexedDBLocalPersistence } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
// import { getAnalytics } from "firebase/analytics";



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

auth.setPersistence(indexedDBLocalPersistence);
