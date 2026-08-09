import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc,
  increment,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCrag9I2Jhy7VtHCabGWCw4Pt6AoJ0Hgjo",
  authDomain: "absurd-lab.firebaseapp.com",
  projectId: "absurd-lab",
  storageBucket: "absurd-lab.firebasestorage.app",
  messagingSenderId: "989176389764",
  appId: "1:989176389764:web:f656f6db4e31de39bc22d1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 挂载到全局，兼容现有代码
window.db = db;
window.firestoreHelpers = {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc,
  increment,
  getDocs
};