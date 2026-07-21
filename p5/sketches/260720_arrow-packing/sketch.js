/*
name; date.
what:
*/

let beziers = [];

let avl_spots = [];

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square.

  noFill();
}

function draw() {
  background(255);

  let a = draw_arrow(width / 2, height / 2);

  for (let i = 0; i < 1000; i++) {
    let new_ang = a[1] + PI;

    let result = null;
    let count = 0; 

    while (result == null && count < 500) {
      result = draw_arrow(a[0].x, a[0].y, {
        min: a[1] - 0.7 + PI,
        max: a[1] + 0.7 + PI,
      });
      count++;
    }
    if (result == null) {
      result;
      break;
    } else {
      a = result;
    }
  }

  noLoop();
}

function draw_arrow(x, y, range = { min: 0, max: TWO_PI }) {
  let arrow = new Bezier();

  //compute points:
  arrow.end = createVector(x, y);

  const jit = 10;

  arrow.end.x += random(-jit, jit);
  arrow.end.y += random(-jit, jit);

  let origin_angle = random(range.min, range.max);
  let l = 100;

  arrow.start.x = arrow.end.x + cos(origin_angle) * l;
  arrow.start.y = arrow.end.y + sin(origin_angle) * l;

  let dir = random() < 0.5 ? -1 : 1;

  let mid = p5.Vector.lerp(arrow.start, arrow.end, 0.5);

  let control_angle = origin_angle + (PI / 2) * dir;

  if (control_angle > TWO_PI) {
    control_angle -= TWO_PI;
  }

  let cd = random(100);

  arrow.cp1.x = mid.x + cos(control_angle) * cd;
  arrow.cp1.y = mid.y + sin(control_angle) * cd;

  arrow.cp2 = arrow.cp1;

  let curr = [
    arrow.start.x,
    arrow.start.y,
    arrow.cp1.x,
    arrow.cp1.y,
    arrow.end.x,
    arrow.end.y,
  ];

  //test:
  for (let i = 0; i < beziers.length; i++) {
    if (beziers_collide(beziers[i], curr)) {
      return null;
    }
  }

  //draw:
  // draw_points(arrow);

  //line:
  stroke(0);
  strokeWeight(2);

  bezier(
    arrow.start.x,
    arrow.start.y,
    arrow.cp1.x,
    arrow.cp1.y,
    arrow.cp2.x,
    arrow.cp2.y,
    arrow.end.x,
    arrow.end.y,
  );

  let arrow_heading = p5.Vector.sub(arrow.end, arrow.cp1);
  let arrow_angle = atan2(arrow_heading.y, arrow_heading.x);

  line(
    arrow.end.x,
    arrow.end.y,
    arrow.end.x + cos(arrow_angle + 2.7) * 10,
    arrow.end.y + sin(arrow_angle + 2.7) * 10,
  );

  line(
    arrow.end.x,
    arrow.end.y,
    arrow.end.x + cos(arrow_angle - 2.7) * 10,
    arrow.end.y + sin(arrow_angle - 2.7) * 10,
  );

  let ret = p5.Vector.lerp(mid, arrow.cp1, 0.5);

  beziers.push([
    arrow.start.x,
    arrow.start.y,
    arrow.cp1.x,
    arrow.cp1.y,
    arrow.end.x,
    arrow.end.y,
  ]);

  let new_end_x = mid.x + cos(control_angle + PI) * 20;
  let new_end_y = mid.y + sin(control_angle + PI) * 20;

  let n = createVector(new_end_x, new_end_y);

  avl_spots.push([n, control_angle]);

  return [n, control_angle];
}

function draw_points(arrow) {
  push();

  //anchor points:
  strokeWeight(5);
  stroke(0, 0, 255);
  point(arrow.start.x, arrow.start.y);
  point(arrow.end.x, arrow.end.y);

  //control points:
  stroke(255, 0, 0);
  point(arrow.cp1.x, arrow.cp1.y);
  point(arrow.cp2.x, arrow.cp2.y);

  pop();
}

class Bezier {
  constructor() {
    this.start = createVector(0, 0);
    this.end = createVector(0, 0);
    this.cp1 = createVector(0, 0);
    this.cp2 = createVector(0, 0);
  }
}

// // Each curve: [a1x, a1y, cx, cy, a2x, a2y] — quadratic control used for both cubic control points
// function beziers_collide(A, B, steps = 60) {
//   const pt = (c, t) => {
//     const u = 1 - t;
//     return {
//       x: u * u * c[0] + 2 * u * t * c[2] + t * t * c[4],
//       y: u * u * c[1] + 2 * u * t * c[3] + t * t * c[5],
//     };
//   };

//   const segHit = (p1, p2, p3, p4) => {
//     const d = (p4.x - p3.x) * (p2.y - p1.y) - (p4.y - p3.y) * (p2.x - p1.x);
//     if (Math.abs(d) < 1e-12) return false;
//     const ua =
//       ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / d;
//     const ub =
//       ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / d;
//     return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
//   };

//   for (let i = 0; i < steps; i++) {
//     const a1 = pt(A, i / steps);
//     const a2 = pt(A, (i + 1) / steps);
//     for (let j = 0; j < steps; j++) {
//       const b1 = pt(B, j / steps);
//       const b2 = pt(B, (j + 1) / steps);
//       if (segHit(a1, a2, b1, b2)) return true;
//     }
//   }
//   return false;
// }

function beziers_collide(A, B, steps = 200, separation = 5) {
  function cubic(c, t) {
    const u = 1 - t;

    return {
      x:
        u * u * u * c[0] +
        3 * u * u * t * c[2] +
        3 * u * t * t * c[2] +
        t * t * t * c[4],

      y:
        u * u * u * c[1] +
        3 * u * u * t * c[3] +
        3 * u * t * t * c[3] +
        t * t * t * c[5],
    };
  }

  const ptsA = [];
  const ptsB = [];

  for (let i = 0; i <= steps; i++) {
    ptsA.push(cubic(A, i / steps));
    ptsB.push(cubic(B, i / steps));
  }

  const sep2 = separation * separation;

  for (let i = 0; i < ptsA.length; i++) {
    for (let j = 0; j < ptsB.length; j++) {
      const dx = ptsA[i].x - ptsB[j].x;
      const dy = ptsA[i].y - ptsB[j].y;

      if (dx * dx + dy * dy < sep2) {
        return true;
      }
    }
  }

  return false;
}
