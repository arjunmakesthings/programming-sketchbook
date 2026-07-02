/*
recursive lines.

from a random point n on a canvas, draw a line of arbitary length l. 

now, keep drawing lines of l/shrink, until l < =2, in such a way that: 
the line is perpendicular to the previous one.
*/

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square.
  angleMode (DEGREES);
}

function draw() {
  background(255);

  let l = 100;

  let start = createVector(100, 100);

  draw_line(start, l);

  noLoop();
}

function draw_line(start, l, state = -1) {
  //vis settings:
  strokeWeight(1);
  stroke(0);
  
  line(start.x, start.y, start.x + l, start.y);

  push();
  translate (start.x + l, start.y); 
  rotate (360); 
  line (0,0,0,l/2); 
  pop();
}
