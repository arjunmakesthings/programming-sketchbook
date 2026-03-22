let handpose; // Declaring a variable to store the handpose model
let video; // Declaring a variable to store the video capture
let predictions = []; // Array to store hand tracking predictions

function setup() {
  createCanvas(640, 480, WEBGL); // Creating a canvas
  video = createCapture(VIDEO); // Creating a video capture element
  video.size(width, height); // Setting the size of the video capture element
  handpose = ml5.handpose(video, modelReady); // Initializing the handpose model with video input
  handpose.on('predict', results => { // Event listener for predictions
    predictions = results; // Storing the hand tracking predictions
  });
}

function modelReady() {
  console.log('Model ready!'); // Logging a message when the model is ready
}

function draw() {
  background(220); // Setting the background color

  translate(-width / 2, -height / 2); // Translating the origin to the center of the canvas

  if (predictions.length > 0) { // Checking if there are hand tracking predictions
    let hand = predictions[0].landmarks; // Extracting landmarks from the first prediction

    // Drawing bottle on the hand
    let thumbTip = hand[4]; // Extracting thumb tip landmark
    let indexTip = hand[8]; // Extracting index finger tip landmark
    let middleTip = hand[12]; // Extracting middle finger tip landmark
    let ringTip = hand[16]; // Extracting ring finger tip landmark
    let pinkyTip = hand[20]; // Extracting pinky finger tip landmark

    let bottleHeight = dist(thumbTip[0], thumbTip[1], pinkyTip[0], pinkyTip[1]); // Calculating bottle height
    let bottleRadius = bottleHeight / 4; // Calculating bottle radius

    push(); // Saving the current drawing style
    translate(indexTip[0], indexTip[1], -bottleHeight / 2); // Translating to the position of index finger tip
    rotateY(millis() / 1000); // Rotating the bottle over time
    drawBottle(bottleHeight, bottleRadius); // Drawing the bottle
    pop(); // Restoring the previous drawing style
  }

  // Display video feed
  texture(video); // Applying the video feed as a texture
  plane(width, height); // Creating a plane to display the video feed
}

function drawBottle(height, radius) {
  let detailY = 24; // Setting the detail along the y-axis
  let detailX = 1; // Setting the detail along the x-axis
  let angle = TWO_PI / detailX; // Calculating the angle increment

  beginShape(TRIANGLE_STRIP); // Starting a shape with triangle strip mode
  for (let i = 0; i < detailX + 1; i++) { // Looping through the detail along the x-axis
    let x = cos(angle * i) * radius; // Calculating x-coordinate
    let z = sin(angle * i) * radius; // Calculating z-coordinate
    vertex(x, -height / 2, z); // Creating a vertex at the bottom of the bottle
    vertex(x, height / 2, z); // Creating a vertex at the top of the bottle
  }
  endShape(); // Ending the shape
}
