import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  type User
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas",
  authDomain: "student-mgmt-demo.firebaseapp.com",
  projectId: "student-mgmt-demo",
  storageBucket: "student-mgmt-demo.appspot.com",
  messagingSenderId: "581334652968",
  appId: "1:581334652968:web:2dd794d5b5fa9d5f9d453c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Authentication functions
const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signOut = () => {
  return firebaseSignOut(auth);
};

// Export everything once
export {
  auth,
  signIn,
  signUp,
  signOut,
  type User
};
