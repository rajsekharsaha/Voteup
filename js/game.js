const firebaseConfig = {
    apiKey: "AIzaSyDc0LPuRl1K6W6rBeZU_kOVsiPGDof4Gkg",
    authDomain: "best-8c0e6.firebaseapp.com",
    projectId: "best-8c0e6",
    storageBucket: "best-8c0e6.appspot.com",
    messagingSenderId: "765419235049",
    appId: "1:765419235049:web:00e0863554e4d85f60f278",
    measurementId: "G-TKRDTR487L"
};

firebase.initializeApp(firebaseConfig);



// Your Firebase configuration and initialization code

// ... Your Firebase configuration and initialization code ...

var imageArray = []; // Array to store fetched images
var imageContainer = document.getElementById("imageContainer");
var userPoints = {};
var database = firebase.database();
var userPointsRef = database.ref("userPoints");
var skipButton = document.getElementById("skipButton");


// Fetch photos from the Firebase Realtime Database
function fetchPhotos() {
    var database = firebase.database();
    var usersRef = database.ref("users");

    usersRef.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var user = childSnapshot.val();
                var profileImageUrl = user.profilePhotoURL; // Use the correct property name
                var username = user.username; // Get the username
                imageArray.push({ profileImageUrl, username });
            });

            if (imageArray.length >= 2) {
                displayRandomPhotos(); // Display random photos without the need for a vote button
            } else {
                imageContainer.textContent = "Not enough photos available for voting.";
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Display random photos for voting
function displayRandomPhotos() {

    imageContainer.innerHTML = ""; // Clear existing content

    var randomIndex1 = Math.floor(Math.random() * imageArray.length);
    var randomIndex2 = Math.floor(Math.random() * imageArray.length);

    while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * imageArray.length);
    }

    var photo1 = imageArray[randomIndex1];
    var photo2 = imageArray[randomIndex2];

    // Create card components with images and usernames
    var card1 = createCard(photo1.profileImageUrl, photo1.username);
    var card2 = createCard(photo2.profileImageUrl, photo2.username);

    // Clear existing content and append new cards
    imageContainer.innerHTML = "";
    imageContainer.appendChild(card1);
    addVsText();
    imageContainer.appendChild(card2);
}

// Create a card component
function createCard(imageUrl, username) {
    var card = document.createElement("div");
    card.className = "card m-2";
    card.style.width = "300px"; // Set card width

    var img = document.createElement("img");
    img.src = imageUrl;
    img.className = "card-img-top clickable-image";
    img.style.height = "250px"; // Set image height

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    var usernameElement = document.createElement("p");
    usernameElement.className = "card-text text-center fw-bolder";
    usernameElement.textContent = username;

    cardBody.appendChild(usernameElement);
    card.appendChild(img);
    card.appendChild(cardBody);

    var pointsElement = document.createElement("p");
    pointsElement.className = "card-points text-center text-success";
    pointsElement.textContent = "Points: " + (userPoints[username] || 0); // Default to 0 points

    cardBody.appendChild(usernameElement);
    cardBody.appendChild(pointsElement); // Add points element below username

    //skip button
    

    // Add click event listener to the image
    img.addEventListener("click", function () {
        handleImageClick(username);
    });

    return card;
}

// Add "vs" text between the images
function addVsText() {
    var vsText = document.createElement("p");
    vsText.className = "text-center my-4 mx-3";
    vsText.textContent = "Vs";

    imageContainer.appendChild(vsText);
}

// Handle image click
function handleImageClick(username) {
    if (!userPoints[username]) {
        userPoints[username] = 0;
    }

    userPoints[username]++;

    // Update points in the database
    userPointsRef.child(username).set(userPoints[username]);

    console.log(username, "earned a point. Total points:", userPoints[username]);

    updatePointsUI(username);

    // Refresh photos for voting
    displayRandomPhotos();
}




//featch points
function fetchUserPoints() {
    userPointsRef.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var username = childSnapshot.key;
                var points = childSnapshot.val();
                userPoints[username] = points;
                updatePointsUI(username);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Fetch user points when the page loads
fetchUserPoints();


// Update UI to show user points
function updatePointsUI(username) {
    var points = userPoints[username] || 0; // Get the user's points or default to 0

    // Find the card element corresponding to the username
    var card = document.querySelector(`[data-username="${username}"]`);
    if (card) {
        var pointsElement = card.querySelector(".card-points");
        if (pointsElement) {
            pointsElement.textContent = "Points: " + points;
        }
    }
}



// Fetch photos when the page loads
fetchPhotos();


// Get references to elements

skipButton.addEventListener("click", function () {
    displayRandomPhotos();
});





