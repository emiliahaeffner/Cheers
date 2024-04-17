// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDby5iYr3_DFrwBrteTnSk_xHUnCVdorkQ",
  authDomain: "cheers-app-fe0c6.firebaseapp.com",
  projectId: "cheers-app-fe0c6",
  storageBucket: "cheers-app-fe0c6.appspot.com",
  messagingSenderId: "579054527462",
  appId: "1:579054527462:web:6b1325fa4246f6b4206c27",
  measurementId: "G-RXBXJ0Z07X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const cocktailrecipy = "cocktails";

export { db, app, storage, auth, cocktailrecipy };

//as default
