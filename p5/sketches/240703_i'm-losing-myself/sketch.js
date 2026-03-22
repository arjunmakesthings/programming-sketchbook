//I'm Losing Myself, June 2024.

let message =
  "i'm losing myself";

let horSpacing = 1;

let margin = 100;

let tSize = 12;

function setup() {
  createCanvas(800, 800);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textSize(tSize);
  fill(0);

  angleMode(DEGREES);
}

function draw() {
  background(255);

  var t = frameCount / 60;

  translate(width / 2, height / 2); 

  for (let i= 0; i<message.length; i++){
    noStroke(); 
    var a = 10; 
    var x = 300-i*40; 
    var y = i*8; 
    var ySpeed = (sin(t*i*4)); 
    var xSpeed = sin(t*10); 
    text(message, x*xSpeed, y*ySpeed);

    a+=200; 

    strokeWeight (0.5); 
    stroke (100); 
    line (x, y, x*xSpeed, y*ySpeed); 
  }
}

function mousePressed() {
  //save("frame.jpeg");
}
