/*
select hotspots away from each other, recursively, by drawing circles. 
*/

function setup() {
  createCanvas(800, 800);
  background(255);

  let spots = find_spots(width, height, 20, 20);

  //test:

  for (let i = 0; i<spots.length; i++){
    strokeWeight(10); 
    stroke(0); 

    point(spots[i][0], spots[i][1]); 
  }
}

/*
for a canvas of width (w) & height (h), 
return tuples of {x,y} coordinates for unique points such that: 

- points are min-distance away from each other
- and are somewhat uniformally distributed across space.
*/
function find_spots(w, h, n, min_spacing) {
  let posis = []; 
  let size = min_spacing;

  //check if co-centric circles min_spacing apart can fit onto the space:
  const can_fit = Math.floor(Math.min(w, h) / min_spacing) >= n;

  //based on that, do either of the two branches:
  const origin = createVector(width / 2, height / 2);
  if (can_fit) {
    //randomly plot them on the circles (they will always be at-least min-spacing apart).
    for (let i = 0; i < n; i++) {
      let theta = random(TWO_PI);
      let x = origin.x + (size / 2) * cos(theta);
      let y = origin.y + (size / 2) * sin(theta);
      /* to see:
        // noFill();
        // stroke(0);
        // strokeWeight(0.5);
        // // circle(origin.x, origin.y, size);
        // strokeWeight(10);
        // stroke(255, 0, 0);
        // point(x, y);
      */
      posis.push([x, y]);
      size += min_spacing;
    }
  } else {
    //see how many can fit:
    let circle_count = 0;
    while (origin.x + size / 2 < w && origin.y + size / 2 < h) {
      /*to see:
        noFill();
        stroke(0);
        strokeWeight(0.5);
        circle(origin.x, origin.y, size);
      */
      size += min_spacing;
      circle_count++;
    }
    const spots_on_each = Math.ceil(n / circle_count);

    //reset size:
    size = min_spacing;

    let drawn = 0;

    for (let i = 0; i < circle_count; i++) {
      let start_theta = random(TWO_PI);
      let inc = TWO_PI / circle_count;
      let theta = start_theta;

      for (let j = 0; j < spots_on_each && drawn < n; j++) {
        let x = origin.x + (size / 2) * cos(theta);
        let y = origin.y + (size / 2) * sin(theta);
        /*to see:
          stroke(255, 0, 0);
          strokeWeight(10);
          point(x, y);
        */
        posis.push([x, y]);
        theta += inc;
        drawn++;
      }
      size += min_spacing;
    }
  }
  return posis;
}
