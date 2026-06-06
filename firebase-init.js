import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBbT1kKo-F9QiVD0wiJsF0mJrahveTv-TU",
    authDomain: "vendorbridge-82b7e.firebaseapp.com",
    projectId: "vendorbridge-82b7e",
    storageBucket: "vendorbridge-82b7e.firebasestorage.app",
    messagingSenderId: "409439736684",
    appId: "1:409439736684:web:d2c0a5eef0c7e704e45949",
    measurementId: "G-1E9S1EGW70"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);