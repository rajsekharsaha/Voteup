// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js"; // Add this line
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
const database = getDatabase(); // Initialize the Realtime Database

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var username = document.getElementById("username").value; // Capture the username

    createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            // Registration successful
            const user = userCredential.user;

            // Store user data in the Realtime Database
            const userDataRef = ref(database, "users/" + user.uid);
            set(userDataRef, {
                username: username, // Use the captured username value
                email: user.email
            })
            .then(() => {
                alert("Thank you to join us");
                // Redirect to login.html after successful registration
                window.location.href = "dashboard.html";
            })
            .catch(error => {
                alert("Registration failed. " + error.message);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Registration failed. " + errorMessage);
        });
});

const staticDataRef = ref(database, "staticData");
set(staticDataRef, {
    example: "This is static data"
});



// Function to check if the user is logged in
function checkLoginStatus() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            window.location.href = "dashboard.html";
            // console.log("User is logged in:", user.email);
            // Redirect to dashboard.html or perform actions accordingly
        } else {
            // User is not logged in
            console.log("User is not logged in");
            // You might want to show a login form or perform other actions
        }
    });
}

// Call the function when the page loads
window.onload = function () {
    checkLoginStatus();
};


//block previous page
function blockPreviousPage() {
    history.pushState(null, null, location.href);
    window.onpopstate = function (event) {
        history.go(1);
    };
}

