// Gaze Tracking Research Tool; August 2024. 

/*
Note – 

I'm building this on top of existing work:

1) Golan Levin: https://github.com/golanlevin/lectures/blob/master/lecture_face/toolkits.md
2) Webgazer Library: https://webgazer.cs.brown.edu
3) Webgazer Reference: ref https://www.jspsych.org/v7/extensions/webgazer/
*/

//initial coordinates for points and declarations
var myX = 100;
var myY = 100;
var lmyX, lmyY;

var op = 255;
let callibrateToggle = false;
let clearedBackground = false;

let regFont; 

// intro
let introTog = true;

let videoRecorder; 

function preload(){
regFont = loadFont ("JetBrainsMono-Light.ttf"); 
}

// Initialize webgazer
webgazer
  .setRegression("ridge") //regression is the predictive model that the program is using
  .setTracker("TFFacemesh") //tracker type / model
  .setGazeListener(function (data) { //add a listener
    if (data == null) {
      return; //if nothing is received return null
    }
    myX = data.x; // get latest x coordinate, assign it to myX
    myY = data.y; // get latest y coordinate, assign it to myY
  })
  .begin(); //start
webgazer.showPredictionPoints(true); //This is for the red dot (actual prediction point)

lmyX = myX; //set last known position
lmyY = myY; //set last known position

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  videoRecorder = new p5.VideoRecorder();
  videoRecorder.onFileReady = showAndSaveVideo;
}

function draw() {
  if (introTog) {
    introBox(); 
  } else {
    mainSoftware();
  }
}

function introBox() {
  background(0); 
  textAlign(LEFT, CENTER); 
  fill(255); 
  noStroke(); 

  textFont (regFont); 
  textSize (16); 
  
  text(
    "Hi, welcome to this open-source gaze-tracking research tool." +
    "\n" +
    "\n" +
    "I built this as a dirty prototype to check the feasibility of using webgazer.js over expensive eye-tracking devices for digital product research." +
    "\n" +
    "\n" +
    "It works, but has obvious limitations. eye movement is far too fast for a webcam to persistently & accurately keep track. However, I believe this tool can be used in scenarios where eye movement is extreme and points are looked at for longer durations." +
    "\n" +
    "\n" +
    "Tap anywhere to continue (you'll have to do a simple calibration exercise).",
    width / 2 - 250,
    height / 2 - 400,
    500,
    800
  );
}

function mainSoftware() {
  if (callibrateToggle) { 
    callibrate();
  } else {
    if (!clearedBackground) {
      op = 10;
      background(0);
      clearedBackground = true;
    }
  }

  // Tracking circle
  fill(255, op);
  lmyX = lerp(lmyX, myX, 0.5); //change lerp values for faster prediction but less smoother transition between points.
  lmyY = lerp(lmyY, myY, 0.5); //change lerp values for faster prediction but less smoother transition between points.
  ellipse(lmyX, lmyY, 50, 50);
}

function callibrate() {
  background(230);
  fill (0); 

  op = 255;

  textAlign (LEFT, CENTER); 
  textFont(regFont);
  text(
    "Calibration exercise:" +
    "\n" +
    "\n" +
    "Click on each black circle whilst looking at them. Do this till the white circle is following your gaze accurately. " +
    "\n" +
    "\n" +
    "Once you're done, pressing 'c' will exit the calibration mode and begin tracking. Have your screen recorder on and hop onto the webpage to be tested as soon as you press 'c'. When done, come back to this page and press 't' to download a WebM video of the eye movement.",
    width / 2 - 250,
    height / 2-400,
    500,
    800
  );

  fill(50);
  ellipse(windowWidth - 100, windowHeight - 700, 40, 40); // Top right
  ellipse(100, windowHeight - 700, 40, 40); // Top left
  ellipse(windowWidth - 100, windowHeight - 100, 40, 40); // Bottom right
  ellipse(100, windowHeight - 100, 40, 40); // Bottom left
  ellipse(windowWidth / 2, windowHeight - 700, 40, 40); // Center top
  ellipse(windowWidth / 2, windowHeight - 100, 40, 40); // Center bottom
  //ellipse(windowWidth / 2, windowHeight / 2, 40, 40); // Center
}

function keyPressed() {
  if (key === "c" || key === "C") {
    callibrateToggle = !callibrateToggle;
    videoRecorder.start();
    clearedBackground = false; // Reset the flag when toggling mode
  }

  if (key === 't'){
    videoRecorder.stop();
  }
}

function showAndSaveVideo() {
  //  Get url of recorded video
  let videoURL = videoRecorder.url;
  //  Create video player element with recording as source
  let vid = createVideo(videoURL);
  vid.showControls();
  //  Download the recording
  videoRecorder.save("myVideo");
}

function mouseClicked() {
  if (introTog) {
    callibrateToggle = true; // initialise callibration
    introTog = false; //ensuring introTog can't be changed again
  }
}
