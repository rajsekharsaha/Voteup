// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updateEmail } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";
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
const database = getDatabase();
const storage = getStorage();

const editProfileForm = document.getElementById('editProfileForm');

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userRef = ref(database, "users/" + user.uid);

        editProfileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newUsername = document.getElementById('username').value;
            const newEmail = document.getElementById('email').value;

            //disable button
            const submitButton = document.getElementById("edit_profile");
            submitButton.disabled = true;
            submitButton.innerHTML = "Loading...";

            // Prepare the data to be updated
            const newData = {
                username: newUsername,
                email: newEmail,
            };

            // Update user's email in authentication
            try {
                await updateEmail(user, newEmail);
            } catch (error) {
                console.error(error);
                // Handle email update errors


                // Restore the submit button's state
                submitButton.innerHTML = "Edit profile";
                submitButton.disabled = false;
            }

            // Handle profile photo update
            const profilePhotoInput = document.getElementById('profilePhoto');
            if (profilePhotoInput.files.length > 0) {
                const photoFile = profilePhotoInput.files[0];

                const storagePath = `profile_photos/${user.uid}/${photoFile.name}`;
                const storageRefPath = storageRef(storage, storagePath);

                // Upload the file to Firebase Storage
                await uploadBytes(storageRefPath, photoFile);

                // Get the download URL of the uploaded image
                const downloadURL = await getDownloadURL(storageRefPath);

                newData.profilePhotoURL = downloadURL;
            }

            // Update user data in the database
            await set(userRef, newData);

            // Provide feedback to the user
            const feedbackElement = document.getElementById('feedback');
            const profileLink = document.getElementById('profile_link');
            feedbackElement.textContent = 'Profile updated successfully';
            profileLink.innerHTML = '<a href="profile.html" class="btn btn-primary rounded w-100">View Profile</a>';


            // Restore the submit button's state
            submitButton.innerHTML = "Edit profile";
            submitButton.disabled = false;


            // Optional: Refresh the page or perform other actions
        });
    } else {
        // User is not logged in, redirect to login page
        window.location.href = "login.html";
    }
});


