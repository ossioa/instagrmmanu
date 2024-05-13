import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRk86K_x3uTYvSoD7edeMJFlYN4vrIYAg",
  authDomain: "instagramclone241.firebaseapp.com",
  projectId: "instagramclone241",
  storageBucket: "instagramclone241.appspot.com",
  messagingSenderId: "567921808959",
  appId: "1:567921808959:web:6ca2bafa2d16ce1749ca8a"
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
