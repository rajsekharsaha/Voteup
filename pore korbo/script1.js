
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get references to the image elements
  const firstImg = document.getElementById('firstImg');
  const lastImg = document.getElementById('lastImg');
  
  // Reference to Firestore
  const db = firebase.firestore();
  
  // Listen for authentication state changes
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in, retrieve and display profile photo
      db.collection('users').doc(user.uid).get().then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          firstImg.src = userData.profilePhotoUrl;
        }
      });
    } else {
      // User is signed out, display default photo
      firstImg.src = 'default_photo_url.jpg'; // Replace with your default photo URL
    }
  });
  
  // Attach the changePhotos function to the image click events
  firstImg.addEventListener('click', () => changePhotos(firstImg));
  lastImg.addEventListener('click', () => changePhotos(lastImg));