//Everything Is About You; September, 2024.

let margin = 50;

var initX = 200;
var initY = 200;

var xStretch = 20;
var yStretch = 40;

var lettersToPoints = [];

let particles = [];

function setup() {
  createCanvas(1000, 1000);

  //convertLetterToPoints(string, xPos, yPos, maxWidth = Infinity, maxHeight = Infinity, gridSize = 3, fontSize = 24, font = "Arial", horAlignment = "LEFT", verAlignment = "TOP")
  lettersToPoints = convertLetterToPoints(
    "everything is about",
    margin,
    margin + 120,
    width - margin * 2,
    height - margin * 2,
    10,
    190,
    "ARIAL",
    CENTER,
    CENTER
  );

  for (let i = 0; i < lettersToPoints.length; i++) {
    particles.push(new Particle(lettersToPoints[i].x, lettersToPoints[i].y));
  }
  background(0);
}

function draw() {
  //background (0);
  for (let i = 0; i < particles.length; i++) {
    particles[i].display();
  }
}

class Particle {
  constructor(x, y) {
    this.initX = x;
    this.initY = y;

    this.s = 2;
  }

  display() {
    stroke(0);
    strokeWeight(0.1);
    fill(255, 20);

    var seconds = frameCount / 60;

    //yStretch=map(noise(seconds), 0, 1, 10, 50);

    this.x = map(sin(seconds), -1, 1, -xStretch, xStretch);
    this.y = map(this.x * this.x * 6, 0, xStretch * xStretch, 0, yStretch);

    this.s = map(noise(seconds), 0, 1, 3, 20);

    //circle(initX + x, initY - y , 50);

    circle(this.initX + this.x, this.initY - this.y, this.s);
  }
}

/*

function u() {
  fill(255); 

  var seconds = frameCount / 60;

  var x = map(sin(seconds), -1, 1, -xStretch, xStretch);

  //quadratic equation to give parabola y = x*x
  var y = map((x*x)*1, 0, xStretch*xStretch, 0, yStretch); 

  circle(initX + x, initY - y , 50); 
}
*/
