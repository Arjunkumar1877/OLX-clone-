// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD2oryO5v4uofu_gzL2uIhuPe7tOIJAq0",
  authDomain: "olx-clone-218c0.firebaseapp.com",
  projectId: "olx-clone-218c0",
  storageBucket: "olx-clone-218c0.appspot.com",
  messagingSenderId: "596421792095",
  appId: "1:596421792095:web:3be056ec961f857c1ae6ea",
  measurementId: "G-JY80SNGJY0"
};
  
export const Firebase = firebase.initializeApp(firebaseConfig);
