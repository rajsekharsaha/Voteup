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

    usersRef.once("value")
        .then(function (snapshot) {
            var rowDiv = document.createElement("div");
            rowDiv.className = "row";

            snapshot.forEach(function (childSnapshot, index) {
                if (index % 4 === 0) {
                    imageContainer.appendChild(rowDiv);
                    rowDiv = document.createElement("div");
                    rowDiv.className = "row";
                }

                var user = childSnapshot.val();
                var profileImageUrl = user.profilePhotoURL; // Use the correct property name
                var username = user.username;

                // Create a Bootstrap card

                var card = document.createElement("div");
                card.className = "col-lg-3 col-md-6 col-12";

                var cardInner = document.createElement("div");
                cardInner.className = "card mt-4";

                // Create image element
                var img = document.createElement("img");
                img.src = profileImageUrl;
                img.className = "card-img-top";
                img.style.width = "100%"; // Set width to 100% for responsiveness
                img.style.height = "300px"; // Set image height

                cardInner.appendChild(img);

                // Create card body
                var cardBody = document.createElement("div");
                cardBody.className = "card-body";

                // Create username element
                var usernameElement = document.createElement("p");
                usernameElement.className = "card-text";
                usernameElement.className = "text-center fw-bold";
                usernameElement.textContent = username;
                cardBody.appendChild(usernameElement);

                cardInner.appendChild(cardBody);
                card.appendChild(cardInner);
                rowDiv.appendChild(card);
            });

            imageContainer.appendChild(rowDiv);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Call the function when the page loads
window.onload = displayUserImages;
