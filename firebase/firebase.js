import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAIBEIX7FTXLBdc_7mw7s__C-UFVA8BuOU",
  authDomain: "jharkhand-tour-and-travel.firebaseapp.com",
  projectId: "jharkhand-tour-and-travel",
  storageBucket: "jharkhand-tour-and-travel.appspot.com", 
  messagingSenderId: "543582886327",
  appId: "1:543582886327:web:a1d31064c5b5d2f36df032",
  measurementId: "G-36RV6NE97G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
