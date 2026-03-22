//sketching; squares and sine; september 2024.

let margin = 200;
let w = 800;
let h = 25; 

let amp = 70;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER); 
}

function draw() {
  //background('#176383');
  background(0);

  var t = frameCount / 60;

  fill(255);
  //noFill(); 

  for (let x = margin; x <= width - margin; x += w/2) {
    for (let y = margin; y <= height - margin; y += h) {
      push(); 
      translate (x + sin(y + t) * amp, y); 
      //var ang = map(sin(t), -1, 1, 0, TWO_PI); 
      var ang = (t+sin(y+t))*0.2
      rotate (ang)
      rect(0, 0, w*(sin(y+t)*0.4), h);
      pop(); 
    }
  }
}
