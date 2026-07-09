/*
select hotspots away from each other, recursively, by drawing circles. 
*/

function setup() {
  createCanvas(800, 800);
  background(255);

  // let spots = find_spots(width, height, 5, 20);
  let spots = find_spots(width, height, 20, 100);

  // console.log(spots);
}

/*
for a canvas of width w & height h, and a min-radius specified between points, 
return tuples of x, y coordinates such that; 
coordinates are away by min-radius, 
and are somewhat uniformally distributed across space. 
*/
function find_spots(w, h, n, min_spacing) {
  let posis = Array.from({ length: n }, () => []);
  let size = min_spacing;
  //check if co-centric circles min_spacing apart can fit onto the space:
  const can_fit = Math.floor(Math.min(w, h) / min_spacing) >= n;

  //we now do two branches:
  const origin = createVector(width / 2, height / 2);
  if (can_fit) {
    //randomly plot them on the circles (they will always be at-least min-spacing apart).
    for (let i = 0; i < n; i++) {
      let theta = random(TWO_PI);
      let x = origin.x + (size / 2) * cos(theta);
      let y = origin.y + (size / 2) * sin(theta);
      noFill();
      stroke(0);
      strokeWeight(0.5);
      circle(origin.x, origin.y, size);
      strokeWeight(10);
      stroke(255, 0, 0);
      point(x, y);
      size += min_spacing;
    }
  } else {
    let circle_count = 0;
    while (origin.x + size / 2 < w && origin.y + size / 2 < h) {
      noFill();
      stroke(0);
      strokeWeight(0.5);
      circle(origin.x, origin.y, size);
      size += min_spacing;
      circle_count++;
    }

    let spots_on_each = Math.ceil(n / circle_count);
    //reset size:
    size = min_spacing;

    let drawn = 0;

    for (let i = 0; i < circle_count; i++) {
      //draw the original circle:
      noFill();
      stroke(0);
      strokeWeight(0.5);
      circle(origin.x, origin.y, size);

      let start_theta = random(TWO_PI);
      let inc = TWO_PI / circle_count;
      let theta = start_theta;

      for (let j = 0; j < spots_on_each && drawn < n; j++) {
        let x = origin.x + (size / 2) * cos(theta);
        let y = origin.y + (size / 2) * sin(theta);
        stroke(255, 0, 0);
        strokeWeight(10);
        point(x, y);
        theta += inc;

        drawn++;
      }

      size += min_spacing;
    }
  }

  return posis;
}
