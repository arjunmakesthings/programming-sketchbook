//New Lander Trial, May 2023.

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  background(0);
}

function draw() {
  fill (255); 
ellipse (mouseX, mouseY, 10,20); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}