// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1sFulzvCy-mkqrH1F_feCqaAssJTFx2o",
    authDomain: "reewa-homes-website.firebaseapp.com",
    projectId: "reewa-homes-website",
    storageBucket: "reewa-homes-website.firebasestorage.app",
    messagingSenderId: "663602174899",
    appId: "1:663602174899:web:d92c1f7430bafe49e089c6",
    measurementId: "G-WPHQQ2ZFD8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services and export for use in other files
window.firebaseAuth = firebase.auth();
window.firebaseDb = firebase.firestore();
