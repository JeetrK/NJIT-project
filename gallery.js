let mCurrentIndex = 0; 
let mImages = []; 
const mUrl = "images.json"; // Your local JSON file
const mWaitTime = 5000;
let mTimer = null;

$(document).ready(() => {
  $(".details").hide(); // Hide details initially

  // Start automatic slideshow
  startTimer();

  // More Indicator toggle
  $(".moreIndicator").click(() => {
    $(".moreIndicator").toggleClass("rot90 rot270");
    $(".details").slideToggle();
  });

  // Next / Previous buttons
  $("#nextPhoto").click(() => showNextPhoto());
  $("#prevPhoto").click(() => showPrevPhoto());

  // Load JSON data via AJAX
  fetchJSON();
});

// Fetch JSON and load images
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: "json",
    success: function (data) {
      mImages = data.images;  // Store the images in mImages array
      swapPhoto();            // Display first image immediately
    },
    error: function (xhr, status, err) {
      console.error("Error loading JSON:", err);
    }
  });
}

// Update displayed photo based on index
function swapPhoto() {
  if (mImages.length === 0) return;

  let img = mImages[mCurrentIndex];

  $("#photo").attr("src", img.imgPath);
  $(".location").text("artist: " + img.artist);
  $(".description").text("album: " + img.album);
  $(".date").text("Rating: " + img.rating); // Changed from 'Date' to 'Rating'
}

// Next image (wrap)
function showNextPhoto() {
  mCurrentIndex++;
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0;
  }
  swapPhoto();
}

// Previous image (wrap)
function showPrevPhoto() {
  mCurrentIndex--;
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1;
  }
  swapPhoto();
}

// Timer function
function startTimer() {
  if (mTimer !== null) clearInterval(mTimer);

  mTimer = setInterval(() => {
    showNextPhoto();
  }, mWaitTime);
}

