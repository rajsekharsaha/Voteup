// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

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
const analytics = getAnalytics(app);
const auth = getAuth();

const changePasswordForm = document.getElementById("changePasswordForm");
const changePasswordFeedback = document.getElementById("changePasswordFeedback");

changePasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;

    const user = auth.currentUser;

    // Reauthenticate user with current password before changing the password
    const credentials = EmailAuthProvider.credential(user.email, currentPassword);
    user.reauthenticateWithCredential(credentials)
        .then(() => {
            // Current password is correct, proceed to change the password
            if (newPassword === confirmNewPassword) {
                user.updatePassword(newPassword)
                    .then(() => {
                        changePasswordFeedback.textContent = "Password changed successfully";
                        changePasswordFeedback.classList.add("text-success");
                    })
                    .catch(error => {
                        changePasswordFeedback.textContent = "Failed to change password: " + error.message;
                        changePasswordFeedback.classList.add("text-danger");
                    });
            } else {
                changePasswordFeedback.textContent = "New passwords do not match";
                changePasswordFeedback.classList.add("text-danger");
            }
        })
        .catch(error => {
            changePasswordFeedback.textContent = "Authentication failed: " + error.message;
            changePasswordFeedback.classList.add("text-danger");
        });
});