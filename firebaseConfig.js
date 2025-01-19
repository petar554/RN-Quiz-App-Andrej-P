import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3SLH11SgivxjgA33Ch0XmEQQvvI66-ZI",
  authDomain: "react-native-quiz-app-9a18a.firebaseapp.com",
  projectId: "react-native-quiz-app-9a18a", // Required for Firestore
  storageBucket: "react-native-quiz-app-9a18a.appspot.com",
  messagingSenderId: "332002883069",
  appId: "1:332002883069:web:03f65ec3ac72c248345594",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
