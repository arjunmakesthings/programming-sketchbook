/*
with matt; 
august 19, 2026. 
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

let all_lines = [];

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(windowWidth, windowHeight); //square.
}

function draw() {
  background(255);

  for (let i = 0; i < 10; i++) {
    draw_line();
  }

  noLoop();
}

function draw_line(sw = 255, lifespan = 100) {
  let origins = get_start_end_points();

  const dev_point = createVector(
    random(50, width - 50),
    random(50, height - 50),
  );

  for (i = 0; i < 10; i++) {
    // const dev_point = createVector(0, 0);

    let line_start;
    let line_end;
    if (i !== 0) {
      line_start = origins.start.copy().add(i * 20);
      line_end = origins.end; //.copy().add(i * 20);
    } else {
      line_start = origins.start.copy();
      line_end = origins.end.copy();
    }

    stroke(0);

    const gap = 2;
    const seg_length = 5;

    let seg_start = line_start.copy();
    let seg_end = line_start.copy();

    const get_segment_length = (d) =>
      map(d, 0, line_start.dist(line_end), 1, 100);

    const is_inbounds = () =>
      seg_end.x >= 0 &&
      seg_end.x <= width &&
      seg_end.y >= 0 &&
      seg_end.y <= height;

    while (seg_end.dist(line_end) > seg_length && is_inbounds()) {
      // while (i < 20) {
      //calculate how far along dev line do you want to be:
      let dir = p5.Vector.sub(line_end, seg_start);
      dir.normalize();

      let d = seg_start.dist(line_end);

      dir.mult(map(d, 0, line_start.dist(line_end), 1, 100));

      let dev_dir = p5.Vector.sub(line_end, dev_point);
      dev_dir.normalize();

      dev_dir.mult(map(d, 0, dev_point.dist(line_end), 1, 100));

      seg_end = seg_start.copy().add(dir).add(dev_dir);

      stroke(0, 0, 0);
      strokeWeight(1);
      line(seg_start.x, seg_start.y, seg_end.x, seg_end.y);

      dir.normalize().mult(gap);
      dev_dir.normalize().mult(gap);
      seg_start = seg_end.copy().add(dir).add(dev_dir);

      // dev_point.add(dev_dir);
    }
  }
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

  for (let l of all_lines) {
    while (is_intersecting(start, end, l[0], l[1])) {
      end = get_new_coord(r, start, end, l[0], l[1]);
    }
  }

  all_lines.push([start, end]);
  return { start: start, end: end };
}

// function is_intersecting(s, e, r) {
//   let t = 0;
//   let u = 0;
//   for (l of all_lines) {
//     let x = [s.x, l[0].x, l[1].x, e.x];
//     let y = [s.y, l[0].y, l[1].y, e.y];

//     // console.log(x,y);

//     noLoop();

//     t =
//       ((x[0] - x[2]) * (y[2] - y[3]) - (y[0] - y[2]) * (x[2] - x[3])) /
//       ((x[0] - x[1]) * (y[2] - y[3]) - (y[0] - y[1]) * (x[2] - x[3]));

//     u =
//       -((x[0] - x[1]) * (y[0] - y[2]) - (y[0] - y[1]) * (x[0] - x[2])) /
//       ((x[0] - x[1]) * (y[2] - y[3]) - (y[0] - y[1]) * (x[2] - x[3]));

//     const reduce_end = (start, end) => {
//       // console.log(start)
//       start = start - end;
//       // console.log(start);
//     };

//     console.log(t, u);

//     if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
//       let d_intersecting = t <= 1;
//       let d2_intersecting = u <= 1;

//       switch (r) {
//         case 0:
//           if (d_intersecting) reduce_end(e.x, l[0].x);

//           if (d2_intersecting) reduce_end(e.x, l[1].x);
//           break;
//         case 1:
//           if (d_intersecting) reduce_end(e.y, l[0].y);

//           if (d2_intersecting) reduce_end(e.y, l[1].y);
//           break;
//         case 2:
//           if (d_intersecting) reduce_end(l[0].x, e.x);

//           if (d2_intersecting) reduce_end(l[1].x, e.x);
//           break;
//         case 3:
//           if (d_intersecting) reduce_end(l[0].y, e.y);

//           if (d2_intersecting) reduce_end(l[1].y, e.y);
//       }

//       return true;
//     }
//   }
//   return false;
// }
