// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getMessaging, isSupported } from 'firebase/messaging';

// ———— YOUR FIREBASE CONFIG (PH PROJECT) ————
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "rentsync-ph.firebaseapp.com",
  projectId: "rentsync-ph",
  storageBucket: "rentsync-ph.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef",
};

// ———— INITIALIZE FIREBASE ————
const app = initializeApp(firebaseConfig);

// ———— EXPORT CORE SERVICES ————
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

// ———— MESSAGING (FCM) ————
let messaging: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}
export { messaging };

// ———— EMULATOR SETUP (DEV ONLY) ————
if (__DEV__) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  console.log('Connected to Firebase Emulators');
}