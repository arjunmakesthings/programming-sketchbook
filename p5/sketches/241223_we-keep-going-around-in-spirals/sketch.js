//textRecursion Trial 2, May 2024.

let message = "we keep going around in spirals";
let baseAngleStep = 0; // Initial angle step for each character
let baseRadiusStep = 0; // Initial radius increment for each character

function setup() {
  createCanvas(800, 800);
  //background (255); 
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke(); 
  textSize(36);

  angleMode(DEGREES); 
}

function draw() {
  background(255); // Clear the background each frame

  let angle = 0;
  let radius = 0;

  for (let i = 0; i < message.length; i++) {
    let x = width / 2 + cos(angle) * radius;
    let y = height / 2 + sin(angle) * radius;

    push();
    translate(x, y);
    rotate(angle); // Rotate text to align with the spiral
    text(message[i], 1*10, 0);
    pop();

    angle += baseAngleStep;
    radius += baseRadiusStep;
    baseAngleStep += 0.0005; // Gradually increase the angle step
    baseRadiusStep += 0.0001; // Gradually increase the radius step
  }
}
