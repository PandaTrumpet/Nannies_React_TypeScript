import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyC-vuvn63o4ZvvkZF6ZjF_9AmlWmIPIj3U",
  authDomain: "nannies-43295.firebaseapp.com",
  projectId: "nannies-43295",
  storageBucket: "nannies-43295.firebasestorage.app",
  messagingSenderId: "938081380276",
  appId: "1:938081380276:web:bd72285c2bee9040ad34e1",
  measurementId: "G-S63S0PZZ2Y",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
// export const db = getFirestore(app);
