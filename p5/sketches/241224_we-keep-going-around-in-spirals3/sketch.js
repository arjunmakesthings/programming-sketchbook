//textRecursion Trial 3, May 2024.

let message = "who even am i and why was i born";

let angle = 180;
let radius = 300;

let angle3 = 180;

function setup() {
  createCanvas(800, 800);
  background(255); // Set background once
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(14);

  angleMode (DEGREES); 

}

function draw() {
  // The draw function is not needed as the drawing is static


  background(255);

  for (let i = 0; i < message.length; i++) {
    for (let r = 20; r<=400; r+=5){
    let angle = (TWO_PI * message.length) * i;

    let x = width / 2 + cos(r+angle3) * r/2;
    let y = height / 2 + sin(r+angle) * radius;

    push();
    translate(x, y);
    //rotate(angle);
    text(message[i], 0, 0);
    pop();

    //radius+=0.04;

    angle3 +=0.0008;
  }
}
}

function mousePressed() {
  //save("frame.jpeg");
}
