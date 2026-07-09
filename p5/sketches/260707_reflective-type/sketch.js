/*
an idea to refract light through points on letterforms.

largely motivated by the fact that the plotter at recurse center takes in lines.
*/

let font;
let points;

let n = 2;

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

  points = font.textToPoints("t", width / 2, height / 2 - 70, 200, {
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

    let target = random(points);

    switch (edge) {
      case 1:
        start = createVector(5, random(5, height - 5));
        break;
      case 2:
        start = createVector(width - 5, random(5, height - 5));
        break;
      case 3:
        start = createVector(random(5, width - 5), 5);
        break;
      case 4:
        start = createVector(random(5, width - 5), height - 5);
        break;
    }

    vel = p5.Vector.sub(createVector(target.x, target.y), start)
      .normalize()
      .mult(random(2, 4));

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
  let iterations = 0;
  const max_iterations = 50;

  while (iterations < max_iterations) {
    pos.add(vel);

    keep_in_bounds(pos, vel); 

    for (let p of points) {
      //if current position collides with point, reverse velocity; else keep moving.

      let d = dist(pos.x, pos.y, p.x, p.y);

      if (d < 2) {
        i = 2;
        draw_line(start, pos, i);

        let tangent = radians(p.alpha); //use p.alpha from textToPoints
        let incoming = vel.heading();
        let bounced = 2 * tangent - incoming;

        vel = p5.Vector.fromAngle(bounced).mult(vel.mag());

        // vel.mult(-1);
        start = pos.copy();
      } else {
        i = 1;
        draw_line(start, pos, i);
      }
    }
    iterations++;
  }
}

function keep_in_bounds(pos, vel){
  if (pos.x < 0 || pos.x >= width){
    vel.x*=-1;
  }
  if (pos.y < 0 || pos.y >= height){
    vel.y*=-1;
  }
}

function draw_line(start, end, i) {
  let intensity = i;
  stroke(i == 1 ? 190 : 0);
  strokeWeight(i);
  line(start.x, start.y, end.x, end.y);
}
