import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig ={
    apiKey: "AIzaSyDGKxRMh1SlkZoA_3zqURgvFrmKWzEFs6o",
    authDomain:"auth-development-60dd6.firebaseapp.com" ,
    projectId:"auth-development-60dd6",
    storageBucket:"auth-development-60dd6.appspot.com" ,
    messagingSenderId:"879597445151" ,
    appId: "1:879597445151:web:26bcf7f19b62d3c480352a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);