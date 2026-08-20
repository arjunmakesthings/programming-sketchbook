function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  const s = createVector(0, height / 2);
  const e = createVector(width, height / 2);

  const s1 = createVector(width / 2, 0);
  const e1 = createVector(width / 2, 100);

  line(s.x, s.y, e.x, e.y);
  line(s1.x, s1.y, e1.x, e1.y);

  console.log(is_intersecting(s, e, s1, e1));

  noLoop();
}

function is_intersecting(s, e, s1, e1) {
  let t = 0;
  let u = 0;

  let x = [s.x, e.x, s1.x, e1.x];
  let y = [s.y, e.y, s1.y, e1.y];

  t =
    ((x[0] - x[2]) * (y[2] - y[3]) - (y[0] - y[2]) * (x[2] - x[3])) /
    ((x[0] - x[1]) * (y[2] - y[3]) - (y[0] - y[1]) * (x[2] - x[3]));

  u =
    -((x[0] - x[1]) * (y[0] - y[2]) - (y[0] - y[1]) * (x[0] - x[2])) /
    ((x[0] - x[1]) * (y[2] - y[3]) - (y[0] - y[1]) * (x[2] - x[3]));

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return true;
  } else {
    return false;
  }
}
