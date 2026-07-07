/*
an idea to refract light through points on letterforms.

largely motivated by the fact that the plotter at recurse center takes in lines.
*/

let font;
let points;

let n = 1000;

function preload() {
  font = loadFont("./CormorantGaramond-Regular.ttf");
}

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square.
  background(255);

  textFont(font);
  textSize(300);
  strokeWeight(1);
  stroke(255);
  textAlign(CENTER, CENTER);

  points = font.textToPoints("stuck", width / 2, height / 2 - 70, 200, {
    sampleFactor: 0.95,
  });
  //^ returns an array of points with x,y,rotation (alpha).

  // text ("t", width/2, height/2 - 70);
}

function draw() {
  for (let i = 0; i < n; i++) {
    //start at a random edge of the canvas.
    let edge = Math.floor(random(1, 5));
    let start;
    let vel;

    switch (edge) {
      case 1:
        start = createVector(5, random(5, height - 5));
        vel = createVector(random(1, 3), random(-2, 2));
        break;
      case 2:
        start = createVector(width - 5, random(5, height - 5));
        vel = createVector(random(-3, -1), random(-2, 2));
        break;
      case 3:
        start = createVector(random(5, width - 5), 5);
        vel = createVector(random(-2, 2), random(1, 3));
        break;
      case 4:
        start = createVector(random(5, width - 5), height - 5);
        vel = createVector(random(-2, 2), random(-3, -1));
        break;
    }

    pass_light(start, vel);
  }
  // redraw_text();
  noLoop();
}

function redraw_text() {
  textFont(font);
  textSize(300);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);

  text("t", width / 2, height / 2 - 70);
}

function pass_light(start, vel) {
  let pos = start.copy();

  while (check_bounds(pos)) {
    pos.add(vel);
    for (let p of points) {
      //if points collide, reverse velocity; else keep moving.

      let d = dist(pos.x, pos.y, p.x, p.y);

      if (d < 2) {
        draw_line(start, pos);

        let tangent = radians(p.alpha); // use p.alpha from textToPoints
        let incoming = vel.heading();
        let bounced = 2 * tangent - incoming;

        vel = p5.Vector.fromAngle(bounced).mult(vel.mag());

        vel.mult(-1);
        start = pos.copy();
      }
    }
  }
}

function check_bounds(pos) {
  return pos.x >= 0 && pos.x <= width && pos.y >= 0 && pos.y <= height;
}

function draw_line(start, end) {
  stroke(0);
  strokeWeight(0.5);
  line(start.x, start.y, end.x, end.y);
}
