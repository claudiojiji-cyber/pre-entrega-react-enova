import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AizSyCnpOJitLfgSdwbIWfR-ylSClc5hCwOJsA",
  authDomain: "enovastore-proyecto.firebaseapp.com",
  projectId: "enovastore-proyecto",
  storageBucket: "enovastore-proyecto.firebasestorage.app",
  messagingSenderId: "947443650764",
  appId: "1:947443650764:web:5ce12a36060317464c7269"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos db para poder usarla en tus componentes
export const db = getFirestore(app);