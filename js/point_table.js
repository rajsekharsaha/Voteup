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


var userPoints = {};
var pointTableBody = document.getElementById("pointTableBody");

function fetchUserPoints() {
    var database = firebase.database();
    var userPointsRef = database.ref("userPoints");

    userPointsRef.once("value")
        .then(function (snapshot) {
            userPoints = snapshot.val() || {};
            populatePointTable();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function populatePointTable() {
    pointTableBody.innerHTML = ""; // Clear existing content

    var sortedUsers = Object.keys(userPoints).sort(function (a, b) {
        return userPoints[b] - userPoints[a];
    });

    sortedUsers.forEach(function (username, index) {
        var points = userPoints[username];
        var rank = index + 1;

        var row = document.createElement("tr");
        var rankCell = document.createElement("td");
        var usernameCell = document.createElement("td");
        var pointsCell = document.createElement("td");

        rankCell.textContent = rank;
        usernameCell.textContent = username;
        pointsCell.textContent = points;

        row.appendChild(rankCell);
        row.appendChild(usernameCell);
        row.appendChild(pointsCell);

        pointTableBody.appendChild(row);
    });
}

// Fetch user points and populate point table when the page loads
window.onload = function () {
    fetchUserPoints();
};




// ... (Your existing event listener code)

// Fetch user points and populate point table when the page loads
fetchUserPoints();
populatePointTable();
