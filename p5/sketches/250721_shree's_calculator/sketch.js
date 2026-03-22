// shree's calculator; july, 2025

let img;

//settings for underlying image:
let transp = 50;
let transparency = true; //flag for transparent underlying image.

let stage = 0; 
/*
note: 
0 -> torque %
1 -> pressure alt.
2 -> oat
3 -> itt
4 -> oat-2
5 -> ng %
*/

let last_point_created = []; //array to keep track of the last point created.

function preload() {
  img = loadImage("graph_with_numbers.png");
}

function setup() {
  let canvas = createCanvas(1262, 543);
  canvas.parent("canvas-container");

  cursor(CROSS);
}
function draw_underlying_image() {
  img.resize(640 * 2, 0);
  image(img, 0, 0, 0);
  noStroke();

  if (transparency == true) {
    fill(255, transp);
    rect(0, 0, width, height);
  }
}

function draw() {
  background(255);
  draw_underlying_image();
  draw_guide_lines();
}

function draw_guide_lines() {
  strokeWeight(1);
  stroke(0);

  line(
    last_point_created[0],
    last_point_created[1],
    last_point_created[0],
    mouseY
  );
}

function mousePressed() {
  plot(mouseX, mouseY);
}

function plot(x, y) {
  strokeWeight(10);
  stroke(0);
  point(x, y);

  last_point_created = [];
  last_point_created.push(x, y);
}
