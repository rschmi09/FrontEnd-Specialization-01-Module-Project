// src/firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3Qgl1oDCyRe1QzhZdOV5wog9XbB7N5JQ",
  authDomain: "e-commerce-app-17796.firebaseapp.com",
  projectId: "e-commerce-app-17796",
  storageBucket: "e-commerce-app-17796.firebasestorage.app",
  messagingSenderId: "346901469406",
  appId: "1:346901469406:web:e6b58af45263a6e53d8a4f"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };