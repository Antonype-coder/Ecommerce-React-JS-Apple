import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "VITE_FIREBASE_API_KEY",
  authDomain: "ecommerce-reactjs-d7d1b.firebaseapp.com",
  projectId: "ecommerce-reactjs-d7d1b",
  storageBucket: "ecommerce-reactjs-d7d1b.appspot.com",
  messagingSenderId: "183160942528",
  appId: "1:183160942528:web:9f2fb931942b30d658a225"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
