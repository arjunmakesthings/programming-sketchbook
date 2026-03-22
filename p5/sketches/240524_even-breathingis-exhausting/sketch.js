//evenBreathingisExhausting, May 2024.

let message = "even breathing is exhausting";

let angle = 0;
let radius = 90;

function setup() {
  createCanvas(800, 800);
  background(255); //set background before sketch starts
  textAlign(CENTER, CENTER);
  textSize(14);
  fill(0);

  angleMode(DEGREES); //Radians to degrees
}

function draw() {
  background(255);

  for (let i = 0; i < message.length; i++) {
    let angle = ((TWO_PI * message.length * i) / message.length) * 2; //change i divisor to reduce gap between letters

    let x = width / 2 + cos(angle) * radius;
    let y = height / 2 + sin(angle) * radius;

    push();
    translate(x, y);
    rotate(map(i, 0, message.length, 0, 360));
    text(message[i], 0, 0);
    pop();
    radius += sin(frameCount) / 25; //increase divisor to make it smaller
  }
}

function mousePressed() {
  //save("frame.jpeg");
}
