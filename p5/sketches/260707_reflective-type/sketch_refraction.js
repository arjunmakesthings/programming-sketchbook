/*
an idea to refract light through points on letterforms.

largely motivated by the fact that the plotter at recurse center takes in lines.
*/

let font;

let segments = [];
let groups;

let org_intensity = 100;

let n = 30;

let outer_bounds = [];

async function setup() {
  font = await loadFont("./CormorantGaramond-Regular.ttf");
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square.
  background(255);

  //add bounds:
  outer_bounds.push([createVector(0, 0), createVector(width, 0)]);
  outer_bounds.push([createVector(width, 0), createVector(width, height)]);
  outer_bounds.push([createVector(width, height), createVector(0, height)]);
  outer_bounds.push([createVector(0, height), createVector(0, 0)]);

  textSize(300);
  textAlign(CENTER, CENTER);

  groups = font.textToContours("jagi", width / 2, height / 2 - 70, {
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
}

function draw() {
  for (let i = 0; i < n; i++) {
    let start_points = [createVector(10, 10), createVector(10, height / 2), 
      createVector(width- 10, 10),
      createVector(width- 10, height-10)
    ];

    let start = random(start_points); 
    
    pass_light(start, random(0, TWO_PI), org_intensity, false, true);
  }

  // pass_light(createVector(1, height / 2), 0.05, org_intensity, true);

  noLoop();
}

function pass_light(pos, heading, intensity, inside = false, debug = false) {
  let inside_state = inside;
  const l1_s = pos;
  const l1_e = createVector(
    pos.x + cos(heading) * width * 2,
    pos.y + sin(heading) * height * 2,
  );

  // first ray:
  if (debug && intensity === org_intensity) {
    stroke(255, 0, 0);
    line(l1_s.x, l1_s.y, l1_e.x, l1_e.y);
  }

  let collision_point = null;
  let collided_segment = null;
  let min_d = Infinity;

  let bounce = false;

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
      bounce = true;
    }
  }

  if (collision_point !== null) {
    stroke(0);
    line(l1_s.x, l1_s.y, collision_point.x, collision_point.y);

    const seg_vec = p5.Vector.sub(collided_segment[1], collided_segment[0]);
    const seg_ang = atan2(seg_vec.y, seg_vec.x);
    const eps = 0.5;

    let new_pos;
    let new_ang;

    if (bounce) {
      inside_state = false;
      new_ang = 2 * seg_ang - heading;
      new_pos = createVector(
        collision_point.x + cos(new_ang) * eps,
        collision_point.y + sin(new_ang) * eps,
      );
    } else {
      const air_refract = 1.0;
      const letter_refract = 1.0;

      //refract:
      let normal = seg_ang * HALF_PI;
      let incident = heading - normal;
      incident = atan2(sin(incident), cos(incident));

      let sin_t2 =
        (inside_state
          ? letter_refract / air_refract
          : air_refract / letter_refract) * sin(incident);

      let theta2 = asin(sin_t2);
      new_ang = normal + theta2;

      //new_ang = heading + 20;
      new_pos = createVector(
        collision_point.x + cos(new_ang) * eps,
        collision_point.y + sin(new_ang) * eps,
      );
    }

    if (intensity > 1) {
      pass_light(new_pos, new_ang, intensity - 1);
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
}
