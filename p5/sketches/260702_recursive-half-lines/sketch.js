/*
recursive lines.

from a random point n on a canvas, draw a line of arbitary length l. 

now, keep drawing lines of l/shrink, until l < =2, in such a way that: 
the line is perpendicular to the previous one.
*/

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square.
  angleMode(DEGREES);
}

function draw() {
  background(255);

  let l = 100;
  let start = createVector(100, 100);

  draw_line(start, l);

  noLoop();
}

const min = 1;
const shrink = 0.9;

function draw_line(start, l, state = 0) {
  if (l <= min) return;

  let end;

  switch (state) {
    case 0:
      end = createVector(start.x + l, start.y);
      break;
    case 1:
      end = createVector(start.x, start.y + l);
      break;
    case 2:
      end = createVector(start.x - l, start.y);
      break;
    case 3:
      end = createVector(start.x, start.y - l);
      break;
  }

  line(start.x, start.y, end.x, end.y);

  state = (state + 1) % 4;
  draw_line(end, l * shrink, state);
}
