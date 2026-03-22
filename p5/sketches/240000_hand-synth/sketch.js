//Single Hand Synthesizer

let video;
let handpose;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  handpose = ml5.handpose(video, modelReady);
  handpose.on('predict', gotPredictions);
}

//To tell whether model has loaded or not
function modelReady() {
  text ("Model loaded", 50, 50); 
}

function gotPredictions(results) {
  predictions = results;
}

function draw() {
  background(255);
  // Flip the video horizontally
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  drawKeypoints();

  console.log (predictions.length); 
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    let prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j++) {
      let point = prediction.landmarks[j];
      fill(255, 0, 0);
      noStroke();
      ellipse(point[0], point[1], 10, 10);
    }
  }
}