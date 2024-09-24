import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyA_UFKFtOHhrPd9EmADSzwpbuVLyXl4Z3s",
  authDomain: "instagrammanu.firebaseapp.com",
  databaseURL: "https://instagrammanu-default-rtdb.firebaseio.com",
  projectId: "instagrammanu",
  storageBucket: "instagrammanu.appspot.com",
  messagingSenderId: "381958497346",
  appId: "1:381958497346:web:58b5221ebd3332b60639db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize the Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Persistence is set to session-based");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { db, auth, storage };
