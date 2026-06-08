//square subdivision.

//given a set of starting coordinates, draw yourself over & over again with shrinking widths & alternating colours; until you reach an end point.

let sw = false;

let svg_tog = false;

function setup() {
  createCanvas(1000, 1000);

  rectMode(CENTER, CENTER);

  //angleMode(DEGREES); 
}

function draw() {
  beginRecordSVG(this, "output.svg"); 
  background(255);
  draw_sq2(width / 2, height / 2, 700, 0);

  endRecordSVG(); 
  noLoop();
}

function draw_sq2(x, y, w, a, c_switch = true) {
  if (w < 1) return;

  let p1 = createVector(-w / 2, -w / 2);
  let p2 = createVector(w / 2, -w / 2);
  let p3 = createVector(w / 2, w / 2);
  let p4 = createVector(-w / 2, w / 2);

  let mult = 10;
  p1.add(random() * mult);
  p2.add(random() * mult);
  p3.add(random() * mult);
  p4.add(random() * mult);

  stroke(c_switch ? 100 : 0);
  strokeWeight(random()*2); 
  noFill(); 

  push();
  translate(x, y);
  rotate (a);
  beginShape();
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p3.x, p3.y);
  vertex(p4.x, p4.y);
  endShape(CLOSE);
  pop();

  a+=0.015; 

  draw_sq2(x, y, w - 5, a, !c_switch);
}

function mousePressed(){
  svg_tog = true;
}
