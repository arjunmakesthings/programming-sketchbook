/*
name; date.
what:
*/

let shader_1; 

function preload(){
  shader_1 = loadShader("./vert.vert", "./frag.frag")
}

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800, WEBGL); //square.
  pixelDensity(1); 
  noStroke(); 
}


function draw() {
  // background (255); 
  
  shader(shader_1);
  shader_1.setUniform("u_res", [width, height]);
  shader_1.setUniform("u_time", millis() / 1000.0);
  rect(0, 0, width, height);
}