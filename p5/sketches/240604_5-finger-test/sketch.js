//5Finger Test

let video;
let handpose;
let predictions = [];
let modelLoaded = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  handpose = ml5.handpose(video, () => {
    modelLoaded = true;
  });
  handpose.on('predict', results => predictions = results);
}

function draw() {
  background(255);

  // Flip the video horizontally

  //Fix flipping of video by including everything within the push-pop translation
  push(); 
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  drawKeypoints();
  pop(); 

  if (modelLoaded) {
    fill(0);
    textSize(24);
    text("Model loaded", 10, height - 20); 
  }

}

function drawKeypoints() {
  if (predictions.length > 0) {
    let hand = predictions[0].landmarks; // Extracting landmarks from the first prediction

    let fingertips = [hand[4], hand[8], hand[12], hand[16], hand[20]]; // Thumb, Index, Middle, Ring, Pinky tips

    // Draw fingertip points
    strokeWeight(7);
    noFill();
    stroke("red");

    fingertips.forEach(tip => {
      point(tip[0], tip[1]);
    });
  }
}
