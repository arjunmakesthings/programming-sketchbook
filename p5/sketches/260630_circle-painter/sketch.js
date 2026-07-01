/*
name; date.
what:
*/

let movers = [];

const n = 800;

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square.

  for (let i = 0; i < n; i++) {
    movers.push(
      new Mover(width / 2 + random(-50, 50), height / 2 + random(-50, 50)),
    );
  }
  background(190);
}

function draw() {
  for (let mover of movers) {
    mover.display();
    mover.move();
  }
}

class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.speed = createVector(1, 1);
    this.col = 0;
    this.phase = random(TWO_PI);
    this.mass = 1;

    this.destination = createVector(this.pos.x, this.pos.y);
  }
  display() {
    noStroke();
    this.col = constrain(
      map(sin(frameCount * 0.05 + this.phase), -1, 1, 0, 255),
      0,
      255,
    );
    fill(this.col);

    this.resize();
    circle(this.pos.x, this.pos.y, this.mass);
  }
  resize() {
    const min = 1;
    const max = 5;
    this.mass = min * cos(this.col);

    this.mass = map(this.mass, min * -1, min * 1, min, max);
  }

  move() {
    let d = dist(
      this.pos.x,
      this.pos.y,
      this.destination.x,
      this.destination.y,
    );
    if (d < this.mass) {
      this.destination = createVector(random(width), random(height));
    }

    let direction = p5.Vector.sub(this.destination, this.pos);
    direction.normalize();

    let speed = this.mass * 0.05;
    speed *= this.speed.x + this.speed.y;

    direction.mult(speed);
    this.pos.add(direction);
    this.constrain();
  }
  constrain() {
    if (
      this.pos.x - this.mass / 2 <= 0 ||
      this.pos.x + this.mass / 2 >= width
    ) {
      this.speed.x *= -1;
    }
    if (
      this.pos.y - this.mass / 2 <= 0 ||
      this.pos.y + this.mass / 2 >= height
    ) {
      this.speed.y *= -1;
    }
  }
}
