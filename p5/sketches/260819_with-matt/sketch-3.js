/*
with michael yang; 
at recurse-center; 
august 20, 2026. 
*/

/*
the program makes line segments from each of the four corners. 

possible_starts = []; 

the objective of each line segment is to reach the opposite end. 

possible_ends is mapped to possible_starts. 

possible_ends = []; 

on the end, one parameter is randomised. 

with every iteration that the program makes the line, the strength of the line reduces. 

as it collides with another line, it dies. 

how long does the program survive? 
*/

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square.
}

function draw() {
  background(255);
  draw_line();

  noLoop();
}

function draw_line() {
  let origins = get_start_end_points();

  let start = origins.start;
  let end = origins.end;

  let cp = createVector(random(50, width - 50), random(50, height - 50));

  strokeWeight(10);
  stroke(255, 0, 0);
  point(start.x, start.y);
  point(end.x, end.y);
  stroke(0, 255, 0);
  point(cp.x, cp.y);

  // let d = seg_current.dist(end);

  // while (d > 1){
  //   let x = bezierPoint
  // }

  let temp_buffer = [];

  let prev_point = start.copy();
  let total_d = 0;
  let seg_start = prev_point.copy();

  let sw = true;

  for (let t = 0; t < 1; t += 0.001) {
    let x = bezierPoint(start.x, cp.x, cp.x, end.x, t);
    let y = bezierPoint(start.y, cp.y, cp.y, end.y, t);

    let curr_point = createVector(x, y);

    let d = prev_point.dist(curr_point);

    total_d += d;

    if (total_d > 100 * (1 - t)) {
      stroke(0);
      // point(curr_point.x, curr_point.y);
      total_d = 0;

      strokeWeight(1);
      if (sw) {
        line(seg_start.x, seg_start.y, curr_point.x, curr_point.y);
      }
      seg_start = curr_point.copy();
      sw = !sw; 
    }
    prev_point = curr_point.copy();
  }

  // for (let w = 0; w < 10; w += 0.01) {
  //   let d_to_cp = cp.copy().sub(seg_current.copy()).normalize();
  //   let d_to_end = end.copy().sub(seg_current.copy()).normalize();

  //   let str_w = 100;
  //   let str = Math.pow(str_w * 0.9, 1 - w);

  //   d_to_cp.mult(1-w).add(d_to_end.mult(w));

  //   seg_current.add(d_to_cp);

  //   stroke (0);
  //   point(seg_current.x, seg_current.y);
  // }
}

//helper to define start & end points:
function get_start_end_points() {
  let start = createVector(0, 0);
  let end = createVector(0, 0);
  const r = Math.floor(random(0, 4));

  switch (r) {
    case 0:
      //l -> r.
      start.x = 0;
      start.y = random(0, height);

      end.x = width;
      end.y = random(0, height);
      break;
    case 1:
      // t -> b.
      start.x = random(0, width);
      start.y = 0;

      end.x = random(0, width);
      end.y = height;
      break;
    case 2:
      //r -> l.
      start.x = width;
      start.y = random(0, height);

      end.x = 0;
      end.y = random(0, height);
      break;
    case 3:
      //b -> t.
      start.x = random(0, width);
      start.y = height;

      end.x = random(0, width);
      end.y = 0;
  }
  return { start: start, end: end };
}
