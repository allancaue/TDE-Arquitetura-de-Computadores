// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase (substitua pelos seus dados)
const firebaseConfig = {
    apiKey: "AIzaSyBWkKqsyUMoZj1-yLN0MP4w96QEke7tZps",
    authDomain: "tde-arquitetura-de-computadore.firebaseapp.com",
    databaseURL: "https://tde-arquitetura-de-computadore-default-rtdb.firebaseio.com",
    projectId: "tde-arquitetura-de-computadore",
    storageBucket: "tde-arquitetura-de-computadore.firebasestorage.app",
    messagingSenderId: "616163505406",
    appId: "1:616163505406:web:4faf7397f1d44f6352e1af",
    measurementId: "G-RTVPK3PNQB"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte a instância de autenticação
export const auth = getAuth(app);

// Exporte o Firestore
export const db = getFirestore(app);