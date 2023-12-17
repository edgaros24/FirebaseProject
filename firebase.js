// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3SOi6zYGdrOJ7o2XMTksh4ic70azHXxw",
  authDomain: "compadproject.firebaseapp.com",
  projectId: "compadproject",
  storageBucket: "compadproject.appspot.com",
  messagingSenderId: "365207133835",
  appId: "1:365207133835:web:91bf3b600671de0b22be8e",
  measurementId: "G-RV2S6W44CR"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { firestore, auth };