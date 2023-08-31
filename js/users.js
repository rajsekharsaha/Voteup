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

function displayUserImages() {
    var database = firebase.database();
    var usersRef = database.ref("users");

    var imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = ""; // Clear any existing content

    usersRef.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var user = childSnapshot.val();
                var profileImageUrl = user.profilePhotoURL; // Use the correct property name
                var username = user.username;

                // Create a Bootstrap card
                var card = document.createElement("div");
                card.className = "card mb-2 p-2";

                // Create card body
                var cardBody = document.createElement("div");
                cardBody.className = "d-flex align-items-center";

                // Create user image element
                var userImage = document.createElement("img");
                userImage.src = profileImageUrl;
                userImage.className = "col-5 rounded-circle me-2 img-thumbnail border img-border";
                userImage.style.width = "70px";
                userImage.style.height = "70px";

                cardBody.appendChild(userImage);

                // Create username element
                var usernameElement = document.createElement("p");
                usernameElement.className = "mb-0 col-5 text-start";
                usernameElement.textContent = username;

                cardBody.appendChild(usernameElement);

                // Create add button
                var addButton = document.createElement("button");
                addButton.className = "btn btn-primary btn-sm ms-auto mx-end col-lg-1 col-md-1 col-2";
                addButton.textContent = "Add";

                cardBody.appendChild(addButton);

                card.appendChild(cardBody);
                imageContainer.appendChild(card);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Call the function when the page loads
window.onload = displayUserImages;