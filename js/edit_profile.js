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

// Function to update the user's profile
function updateProfileInfo(user, name, email, profilePicture) {
    updateProfile(user, {
        displayName: name,
        email: email,
        photoURL: profilePicture
    }).then(() => {
        alert("Profile updated successfully");
    }).catch((error) => {
        alert("Profile update failed: " + error.message);
    });
}

// Add event listener for the form submission
document.getElementById('profile-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the updated profile information from the form
    const newName = document.getElementById("name").value;
    const newEmail = document.getElementById("email").value;
    const newProfilePicture = document.getElementById("profile-picture").value;

    // Check if the user is authenticated
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Call the function to update the profile
            updateProfileInfo(user, newName, newEmail, newProfilePicture);
        } else {
            alert("User not authenticated. Please log in.");
        }
    });
});