import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyDGKxRMh1SlkZoA_3zqURgvFrmKWzEFs6o",
    authDomain:"auth-development-60dd6.firebaseapp.com" ,
    projectId:"auth-development-60dd6",
    storageBucket:"auth-development-60dd6.appspot.com" ,
    messagingSenderId:"879597445151" ,
    appId: "1:879597445151:web:26bcf7f19b62d3c480352a",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
export default {db};