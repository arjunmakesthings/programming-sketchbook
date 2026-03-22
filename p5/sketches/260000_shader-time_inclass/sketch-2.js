//unnamed; month, year. 

let shaper = 0; 
let inc = false;

let half_size = 100; 
let st_weight = 50; 

function setup() {
createCanvas(400, 400, WEBGL); //in 16:9 aspect ratio. 
}

function draw() {
  background(0);

  // //flats:
  // push();
  // beginShape(TRIANGLES);

  // //a line:
  // vertex(-half_size, -half_size);
  // vertex(-half_size, -half_size + st_weight);
  // vertex(half_size, -half_size + st_weight);

  // vertex(half_size, -half_size);
  // vertex(-half_size, -half_size);
  // vertex(half_size, -half_size + st_weight);

  // endShape();
  // pop();

  // //bottom line:
  // push();
  // beginShape(TRIANGLES);
  // translate(0, half_size);
  // vertex(-half_size, -half_size);
  // vertex(-half_size, -half_size + st_weight);
  // vertex(half_size, -half_size + st_weight);

  // vertex(half_size, -half_size);
  // vertex(-half_size, -half_size);
  // vertex(half_size, -half_size + st_weight);
  // endShape();
  // pop();

  //sides:

  push();
  beginShape(TRIANGLES);

  //a line:
  vertex(-half_size, -half_size);
  vertex(half_size, -half_size + st_weight);
  vertex(half_size, -half_size);

  //   vertex(half_size, -half_size);
  //   vertex(-half_size, -half_size);
  //   vertex(half_size, -half_size + st_weight);

  endShape();
  pop();

  //   //bottom line:
  //   push();
  //   beginShape(TRIANGLES);
  //   translate(0, half_size);
  //   vertex(-half_size, -half_size);
  //   vertex(-half_size, -half_size + st_weight);
  //   vertex(half_size, -half_size + st_weight);

  //   vertex(half_size, -half_size);
  //   vertex(-half_size, -half_size);
  //   vertex(half_size, -half_size + st_weight);
  //   endShape();
  //   pop();
}

function mousePressed(){
    shaper++;

    if (shaper > 2){
        shaper = 0; 
    }
}