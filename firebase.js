import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsL11NwIrFI5RqkWH-tRucKfWPJ_fc0QA",
    authDomain: "whatsapp-clone-a30b1.firebaseapp.com",
    projectId: "whatsapp-clone-a30b1",
    storageBucket: "whatsapp-clone-a30b1.appspot.com",
    messagingSenderId: "860001668768",
    appId: "1:860001668768:web:b9559ae301b3f1863743c5",
    measurementId: "G-EP9KMXQMW1"
};

const app = !firebase.apps.length ?
    firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

