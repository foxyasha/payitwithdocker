import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import "toastify-js/src/toastify.css"
import ValidData from "../ValidData";

const firebaseConfig = {
    apiKey: "AIzaSyDyvjx-2nkhV0Zp0cmKaOIGaW-PdI4lfA0",
    authDomain: "digital-store-19aaf.firebaseapp.com",
    databaseURL: "https://digital-store-19aaf-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "digital-store-19aaf",
    storageBucket: "digital-store-19aaf.appspot.com",
    messagingSenderId: "929674096648",
    appId: "1:929674096648:web:781fbf8ebc7def27bde1bd",
    measurementId: "G-KJQ57664HR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app)
export const storage = getStorage(app);



const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        ValidData('Success', true)
    }
    catch (error) {
        const errorCode = error.code;
        console.log(errorCode);
        if(errorCode == 'auth/missing-email')
            return ValidData('Fill email field!', false);
        if(errorCode == 'auth/invalid-email')
            return ValidData('Invalid email', false);
        if(errorCode == 'auth/user-not-found')
            return ValidData('User not found', false);
        if(errorCode == 'auth/too-many-requests')
            return ValidData('Too many requests, try again later', false);
    }

};


export {
    sendPasswordReset,
};