/*
an idea to refract light through points on letterforms.

largely motivated by the fact that the plotter at recurse center takes in lines.
*/

let font;
let groups;

let segments = [];

let org_intensity = 100000;

let bounds = [];

async function setup() {
  font = await loadFont("./CormorantGaramond-Regular.ttf");
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square.
  background(255);

  bounds.push([createVector(0, 0), createVector(width, 0)]); // top
  bounds.push([createVector(width, 0), createVector(width, height)]); // right
  bounds.push([createVector(width, height), createVector(0, height)]); // bottom
  bounds.push([createVector(0, height), createVector(0, 0)]); // left

  textFont(font);
  textSize(200);
  strokeWeight(1);
  stroke(0);
  textAlign(CENTER, CENTER);

  // textSize ( 200);

  groups = font.textToContours("god help", width / 2, height / 2 - 70, {
    sampleFactor: 0.8,
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
}

function draw() {
  // redraw_text();
  pass_light(createVector(0.1, width/2), 0.05, org_intensity);
  noLoop();
}

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
// ...existing code...

const REFRACTION_FACTOR = 0.2;

function reflect_angle(heading, segment) {
  const seg_vec = p5.Vector.sub(segment[1], segment[0]);
  const seg_ang = atan2(seg_vec.y, seg_vec.x);
  return 2 * seg_ang - heading;
}

function refract_angle(heading, segment) {
  const seg_vec = p5.Vector.sub(segment[1], segment[0]);
  const seg_ang = atan2(seg_vec.y, seg_vec.x);
  const normal_ang = seg_ang + HALF_PI;

  const delta = atan2(sin(normal_ang - heading), cos(normal_ang - heading));
  return heading + delta * REFRACTION_FACTOR;
}

function pass_light(pos, heading, intensity) {
  const l1_s = pos;
  const l1_e = createVector(
    pos.x + cos(heading) * 10000,
    pos.y + sin(heading) * 10000,
  );

  let collision_point = null;
  let collided_segment = null;
  let min_d = Infinity;
  let hit_type = null;

  for (const s of segments) {
    const checking_point = collides(l1_s, l1_e, s[0], s[1]);
    if (checking_point == null) continue;

    const d = dist(l1_s.x, l1_s.y, checking_point.x, checking_point.y);
    if (d < min_d) {
      min_d = d;
      collision_point = checking_point;
      collided_segment = s;
      hit_type = "segment";
    }
  }

  for (const t of bounds) {
    const checking_point = collides(l1_s, l1_e, t[0], t[1]);
    if (checking_point == null) continue;

    const d = dist(l1_s.x, l1_s.y, checking_point.x, checking_point.y);
    if (d < min_d) {
      min_d = d;
      collision_point = checking_point;
      collided_segment = t;
      hit_type = "bound";
    }
  }

  if (collision_point !== null) {
    stroke(0);
    line(l1_s.x, l1_s.y, collision_point.x, collision_point.y);

    const new_ang =
      hit_type === "bound"
        ? reflect_angle(heading, collided_segment)
        : refract_angle(heading, collided_segment);

    const eps = 1.0;
    const new_pos = createVector(
      collision_point.x + cos(new_ang) * eps,
      collision_point.y + sin(new_ang) * eps,
    );

    if (intensity > 1) {
      pass_light(new_pos, new_ang, intensity - 1);
    }
    return;
  }

  console.log("didn't collide");
}

// ...existing code...