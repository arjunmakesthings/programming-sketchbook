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

  const padding = 50;

  let l = 100;

  for (let x = 0; x <= width; x += l) {
    for (let y = 0; y <= height; y += l) {
      let start = createVector(x, y);
      draw_points(start, l);
    }
  }

  noLoop();
}

const min = 0.2;
const shrink = 0.955;

function draw_points(start, l, state = 0) {
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

  let steps = max(abs(end.x - start.x), abs(end.y - start.y));

  const cx = (start.x + end.x) * random();
  const cy = (start.y + end.y) * random();

  const maxD = dist(width * 0.5, height * 0.5, 0, 0);

  push();
  translate(cx, cy);
  const ang = random(-2, 2);
  rotate(ang);
  for (let i = 0; i <= steps; i++) {
    let x = lerp(start.x, end.x, i / steps);
    let y = lerp(start.y, end.y, i / steps);

    let n =
      noise(frameCount * x * y) * dist(x, y, width / 2, height / 2) * 0.0095;
    const lx = x - cx;
    const ly = y - cy;

    // strokeWeight (lx * ly /10500);

    const px = round(x - cx + n);
    const py = round(y - cy + n);

    const wx = cx + px * cos(ang) - py * sin(ang);
    const wy = cy + px * sin(ang) + py * cos(ang);

    const d = dist(wx, wy, width * 0.5, height * 0.5);

    strokeWeight(map(d, 0, maxD, 1.5, 0.75));

    point(round(lx + n), round(ly + n));
  }
  pop();

  state = (state + 1) % 4;
  draw_points(end, l * shrink, state);
}

// function draw_line(start, l, state = 0) {
//   if (l <= min) return;

//   let end;

//   switch (state) {
//     case 0:
//       end = createVector(start.x + l, start.y);
//       break;
//     case 1:
//       end = createVector(start.x, start.y + l);
//       break;
//     case 2:
//       end = createVector(start.x - l, start.y);
//       break;
//     case 3:
//       end = createVector(start.x, start.y - l);
//       break;
//   }

//   line(start.x, start.y, end.x, end.y);

//   state = (state + 1) % 4;
//   draw_line(end, l * shrink, state);
// }

function mousePressed() {
  save("frame.webp");
}
