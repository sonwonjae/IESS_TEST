import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCGZhS6hr6mcuQ0YAP_yRmpToogMVZVFHI',
  authDomain: 'iess-30a98.firebaseapp.com',
  projectId: 'iess-30a98',
  storageBucket: 'iess-30a98.appspot.com',
  messagingSenderId: '1091954782159',
  appId: '1:1091954782159:web:e3b4b70656a58e35caecba',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
