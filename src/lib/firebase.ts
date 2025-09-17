import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABQ0sYuFtyyryx_Tt0vENSiBJomHdpPEo",
  authDomain: "boxpool-cf6d8.firebaseapp.com",
  projectId: "boxpool-cf6d8",
  storageBucket: "boxpool-cf6d8.firebasestorage.app",
  messagingSenderId: "710308673241",
  appId: "1:710308673241:web:67e9269630da76f9b2b0c8",
  measurementId: "G-S4R1S19RGZ",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
