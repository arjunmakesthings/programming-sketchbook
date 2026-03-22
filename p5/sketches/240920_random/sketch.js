//sketching; circles and sine; september 2024.

let w = 50;
let margin = 0;

let amp = 200;

function setup() {
  createCanvas(1000, 1000);
  noStroke();
}

function draw() {
  //background('#176383');
  background(255);

  var t = frameCount / 60;

  //fill(255);

  for (let x = margin; x <= width - margin; x += 300) {
    for (let y = margin; y <= height - margin; y += w / 2) {

      fill (62, 210+(sin(y+t))*10, 198)
      circle(x + sin(x + y + t) * amp, y, w + sin(y + t) * 100);
    }
  }
}
