//textRecursion Trial 2, May 2024.

let message = "we keep going around in spirals we keep going around in spirals we keep going around in spirals we keep going around in spirals we keep going around in spirals";
let baseAngleStep = 0; // Initial angle step for each character
let baseRadiusStep = 0; // Initial radius increment for each character

function setup() {
  createCanvas(800, 800);
  background(255); // Set background once
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(22);

  angleMode(DEGREES);

  let angle = 0;
  let radius = 0;

  for (let i = 0; i < message.length; i++) {
    let x = width / 2 + cos(angle) * radius;
    let y = height / 2 + sin(angle) * radius;

    push();
    translate(x, y);
    rotate(angle); // Rotate text to align with the spiral
    text(message[i], 0, 0);
    pop();

    angle += baseAngleStep;
    radius += baseRadiusStep;
    baseAngleStep += 0.1; // Increase the angle step for visible effect
    baseRadiusStep += 0.03; // Increase the radius step for visible effect
  }
}

function draw() {
  // The draw function is not needed as the drawing is static
}

function mousePressed(){
save ("frame.jpeg"); 
}
