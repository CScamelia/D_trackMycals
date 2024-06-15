// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBM57D0tMtfvW3Bjqw6pW-Ubd7K0CvzZwo',
  authDomain: 'fir-auth-11fad.firebaseapp.com',
  projectId: 'fir-auth-11fad',
  storageBucket: 'fir-auth-11fad.appspot.com',
  messagingSenderId: '718714853178',
  appId: '1:718714853178:web:b1fd0f2c9b4e6c32f56203',
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth };
