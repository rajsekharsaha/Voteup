// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDc0LPuRl1K6W6rBeZU_kOVsiPGDof4Gkg",
    authDomain: "best-8c0e6.firebaseapp.com",
    projectId: "best-8c0e6",
    storageBucket: "best-8c0e6.appspot.com",
    messagingSenderId: "765419235049",
    appId: "1:765419235049:web:00e0863554e4d85f60f278",
    measurementId: "G-TKRDTR487L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Add an authentication state change listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        const profileContainer = document.getElementById('profile-container');
        const nameElement = document.getElementById('name');
        const emailElement = document.getElementById('email');
        const profilePictureElement = document.getElementById('profile-picture');

        // Update the profile information on the page
        nameElement.textContent = user.displayName || "N/A";
        emailElement.textContent = user.email || "N/A";
        profilePictureElement.src = user.photoURL || "";
        console.log("User Photo URL:", user.photoURL);

        profileContainer.style.display = 'block'; // Display the container
    } else {
        // User is signed out
        console.log("User is signed out");
    }
});

document.getElementById('edit_profile').addEventListener('click', function () {
    // Redirect to another HTML page
    window.location.href = "edit_profile.html";
});