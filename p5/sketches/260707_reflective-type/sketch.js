/*
an idea to refract light through points on letterforms.

largely motivated by the fact that the plotter at recurse center takes in lines.
*/

let font;

let segments = [];
let groups;

let org_intensity = 100;

let n = 100;

let outer_bounds = [];

let inc = 10;

let svg_tog = true;

let col = 0;

async function setup() {
  font = await loadFont("./CormorantGaramond-Regular.ttf");
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square.
  background(255);

  textSize(500);
  textAlign(CENTER, CENTER);

  groups = font.textToContours("cry", width / 2, height / 2 - 70, {
    sampleFactor: 0.9,
  });

  for (let i = 0; i < groups.length; i++) {
    for (let j = 0; j < groups[i].length; j++) {
      const curr = createVector(groups[i][j].x, groups[i][j].y);
      const next = createVector(
        groups[i][(j + 1) % groups[i].length].x,
        groups[i][(j + 1) % groups[i].length].y,
      );
      segments.push([curr, next]);
      // stroke(255, 0, 0);
      // line(curr.x, curr.y, next.x, next.y);
    }
  }

  outer_bounds.push([createVector(0, 0), createVector(width, 0)]);
  outer_bounds.push([createVector(width, 0), createVector(width, height)]);
  outer_bounds.push([createVector(width, height), createVector(0, height)]);
  outer_bounds.push([createVector(0, height), createVector(0, 0)]);
}

function draw() {
  // for (let x = 10; x < width - 10; x += inc) {
  //   pass_light(
  //     createVector(x, height - 10),
  //     0,
  //     org_intensity,
  //     false,
  //     true,
  //   );
  // }

  // for (let y = 10; y < height - 10; y += inc) {
  //   pass_light(createVector(10, y), 0, org_intensity, false, true);
  // }

  // for (let x = width - 10; x > 10; x -= inc) {
  //   pass_light(
  //     createVector(x, 10),
  //     0,
  //     org_intensity,
  //     false,
  //     true,
  //   );
  // }

  // for (let y = height - 10; y > 10; y -= inc) {
  //   pass_light(
  //     createVector(0, y),
  //     0,
  //     org_intensity,
  //     false,
  //     true,
  //   );
  // }

  if (svg_tog == true) {
    beginRecordSVG(this, "output.svg");
  }

  const jit_inc = 0.001;
  // top-left corner: rays head down-right (PI/4)
  for (let x = 0.1; x < width - 0.1; x += inc) {
    pass_light(
      createVector(x, 0.1),
      PI / 4 + noise(x) * jit_inc,
      org_intensity,
      false,
      true,
    );
  }
  for (let y = 0.1; y < height - 0.1; y += inc) {
    pass_light(
      createVector(0.1, y),
      PI / 4 + noise(y) * jit_inc,
      org_intensity,
      false,
      true,
    );
  }
  // top-right corner: rays head down-left (3*PI/4)
  for (let x = 0.1; x < width - 0.1; x += inc) {
    pass_light(
      createVector(x, 0.1),
      (3 * PI) / 4 + noise(x) * jit_inc,
      org_intensity,
      false,
      true,
    );
  }
  for (let y = 0.1; y < height - 0.1; y += inc) {
    pass_light(
      createVector(width - 0.1, y),
      (3 * PI) / 4 + noise(y) * jit_inc,
      org_intensity,
      false,
      true,
    );
  }
  // bottom-left corner: rays head up-right (-PI/4)
  for (let x = 0.1; x < width - 0.1; x += inc) {
    pass_light(
      createVector(x, height - 0.1),
      -PI / 4 + noise(x) * jit_inc,
      org_intensity,
      false,
      true,
    );
  }
  for (let y = 0.1; y < height - 0.1; y += inc) {
    pass_light(
      createVector(0.1, y),
      -PI / 4 + noise(y) * jit_inc,
      org_intensity,
      false,
      true,
    );
  }
  // bottom-right corner: rays head up-left (-3*PI/4)
  for (let x = 0.1; x < width - 0.1; x += inc) {
    pass_light(
      createVector(x, height - 0.1),
      (-3 * PI) / 4 + noise(x) * jit_inc,
      org_intensity,
      false,
      true,
    );
  }
  for (let y = 0.1; y < height - 0.1; y += inc) {
    pass_light(
      createVector(width - 0.1, y),
      (-3 * PI) / 4 + noise(y) * jit_inc,
      org_intensity,
      false,
      true,
    );
  }

  // pass_light(createVector(1, height / 2), 0.05, org_intensity, true);

  if (svg_tog) {
    endRecordSVG();
  }

  noLoop();
}

function pass_light(pos, heading, intensity, inside = false, debug = false) {
  console.log("pass light level " + intensity);
  let inside_state = inside;
  const l1_s = pos;
  const l1_e = createVector(
    pos.x + cos(heading) * width * 2,
    pos.y + sin(heading) * height * 2,
  );

  // first ray:
  if (debug && intensity === org_intensity) {
    // stroke(255, 0, 0);
    // line(l1_s.x, l1_s.y, l1_e.x, l1_e.y);
  }

  let collision_point = null;
  let collided_segment = null;
  let min_d = Infinity;

  let wall = false;

  for (let s of segments) {
    const checking_point = collides(l1_s, l1_e, s[0], s[1]);
    if (checking_point == null) continue;

    const d = dist(l1_s.x, l1_s.y, checking_point.x, checking_point.y);
    if (d < min_d) {
      min_d = d;
      collision_point = checking_point;
      collided_segment = s;
    }
  }

  for (let t of outer_bounds) {
    const checking_point = collides(l1_s, l1_e, t[0], t[1]);
    if (checking_point == null) continue;

    const d = dist(l1_s.x, l1_s.y, checking_point.x, checking_point.y);
    if (d < min_d) {
      min_d = d;
      collision_point = checking_point;
      collided_segment = t;
      wall = true;
    }
  }

  if (collision_point !== null) {
    if (inside){
      stroke(0, 0, 255); 
    }else{
      stroke(0, 0, 0); 
    }
    line(l1_s.x, l1_s.y, collision_point.x, collision_point.y);

    const seg_vec = p5.Vector.sub(collided_segment[1], collided_segment[0]);
    const seg_ang = atan2(seg_vec.y, seg_vec.x);

    let new_pos;
    let new_ang = heading;

    if (wall) {
      return;
    } else {
      const ang_inc = 1.5;
      if (inside) {
        new_ang += ang_inc;
      } else {
        new_ang -= ang_inc;
      }
    }

    new_pos = createVector(
      collision_point.x + cos(new_ang),
      collision_point.y + sin(new_ang),
    );

    if (intensity > 1) {
      pass_light(new_pos, new_ang, intensity - 1, !inside);
    }
    return;
  }
  console.log("didn't collide");
}

// helper:
function collides(l1_s, l1_e, l2_s, l2_e) {
  const s1_x = l1_e.x - l1_s.x;
  const s1_y = l1_e.y - l1_s.y;
  const s2_x = l2_e.x - l2_s.x;
  const s2_y = l2_e.y - l2_s.y;

  const denom = -s2_x * s1_y + s1_x * s2_y;
  if (denom === 0) return null; // parallel or collinear

  const s = (-s1_y * (l1_s.x - l2_s.x) + s1_x * (l1_s.y - l2_s.y)) / denom;

  const t = (s2_x * (l1_s.y - l2_s.y) - s2_y * (l1_s.x - l2_s.x)) / denom;

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    return createVector(l1_s.x + t * s1_x, l1_s.y + t * s1_y);
  }

  return null;
}

function mousePressed() {
  // save("frame.jpeg");
  svg_tog = true;
}
