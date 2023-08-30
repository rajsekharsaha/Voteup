// Get references to the image elements
const firstImg = document.getElementById('firstImg');
const lastImg = document.getElementById('lastImg');

// Define an array of photo URLs
const photoUrls = [

  'https://picsum.photos/202',
  'https://picsum.photos/204',
  'https://picsum.photos/205',
  // Add more photo URLs here
];

// Initialize the current photo index with a random index
let currentPhotoIndex = Math.floor(Math.random() * photoUrls.length);

// Function to change the displayed photos
function changePhotos(clickedImg) {
  // Choose a random index for the other photo
  let randomIndex = Math.floor(Math.random() * photoUrls.length);
  while (randomIndex === currentPhotoIndex) {
    // Make sure the random index is not the same as the current photo index
    randomIndex = Math.floor(Math.random() * photoUrls.length);
  }

  // Update the source of the images
  firstImg.src = (clickedImg === firstImg) ? firstImg.src : photoUrls[randomIndex];
  lastImg.src = (clickedImg === lastImg) ? lastImg.src : photoUrls[randomIndex];

  // Reset the hover effect
  firstImg.style.transform = 'scale(1)';
  lastImg.style.transform = 'scale(1)';

  // Update the current photo index
  currentPhotoIndex = randomIndex;
}

// Attach the changePhotos function to the image click events
firstImg.addEventListener('click', () => changePhotos(firstImg));
lastImg.addEventListener('click', () => changePhotos(lastImg));
