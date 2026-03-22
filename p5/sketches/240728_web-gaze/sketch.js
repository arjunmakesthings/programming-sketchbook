//Web Gaze Test

//Webgazer p5 Link
//adapted sketch from Golan Levin 
//https://github.com/golanlevin/lectures/blob/master/lecture_face/toolkits.md
//and updated to work with new Facemesh version of WebGazer.js
//more consistent tracking and less loss of the face during tracking . 

//CLICK while looking at the cursor to launch sketch and begin training! 

//ref https://www.jspsych.org/v7/extensions/webgazer/

var myX = 100;
var myY = 100;
var lmyX, lmyY;

webgazer.setRegression('ridge')
  .setTracker('clmtrackr')
  .setGazeListener(function(data, clock) {
    // console.log(data);
    // console.log(clock);
    if (data == null) {
      return;
    }
    myX = data.x; //these x coordinates are relative to the viewport
    myY = data.y; //these y coordinates are relative to the viewport
  });
lmyX = myX;
lmyY = myY;
webgazer.begin();
webgazer.showPredictionPoints(true);


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(234);
  textAlign(LEFT, TOP);
  textSize(14);
}

function draw() {
  background(234);
  fill(0);
  noStroke();
  text("click on black circles whilst looking at them to calibrate." + "\n" + "\n" + "repeat 3 times" + "\n" + "\n" + "Afterwards, see if the white ellipse moves freely with the tracking of your eyes", 350, 20, 200, 300)

  drawCalibrateCircles();

  //tracking circle 
  stroke(255, 0, 0);
  fill(255);
  lmyX = lerp(lmyX, myX, 0.05);
  lmyY = lerp(lmyY, myY, 0.05);
  ellipse(lmyX, lmyY, 120, 120);
}

function drawCalibrateCircles() {
  noStroke();
  fill(0);
  ellipse(windowWidth - 100, windowHeight - 700, 40, 40) //top right
  ellipse(windowWidth - 100, windowHeight - 100, 40, 40) //bottom right
  ellipse(100, windowHeight - 100, 40, 40) //bottom left
  ellipse(windowWidth / 2, windowHeight - 700, 40, 40) //center top
  ellipse(windowWidth / 2, windowHeight - 100, 40, 40) //center bottom
  ellipse(windowWidth / 2, windowHeight / 2, 40, 40) //center 

}