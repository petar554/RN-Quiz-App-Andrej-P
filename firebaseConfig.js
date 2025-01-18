// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB3SLH11SgivxjgA33Ch0XmEQQvvI66-ZI",
  authDomain: "react-native-quiz-app-9a18a.firebaseapp.com",
  databaseURL: "https://react-native-quiz-app-9a18a-default-rtdb.firebaseio.com",
  projectId: "react-native-quiz-app-9a18a",
  storageBucket: "react-native-quiz-app-9a18a.firebasestorage.app",
  messagingSenderId: "332002883069",
  appId: "1:332002883069:web:03f65ec3ac72c248345594",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
