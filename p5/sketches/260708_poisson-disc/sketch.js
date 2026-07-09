/*
implementing poisson-disc sampling from: https://www.youtube.com/watch?v=flQgnCUxHlw&t=67s

paper: https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf
*/

let spacing = 10; //r in paper.
let tries = 30; //k in paper.

let grid = [];

let size = spacing / Math.sqrt(2); // r / sqrt(dimensions) from paper.

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.
  createCanvas(800, 800); //square.
  background(255);

  /*
  initialize n(2 in our case)-dimensional bacgrkound grid. 
  */
  const columns = Math.floor(width / size);
  const rows = Math.floor(height / size);

  for (let i = 0; i<columns * rows; i++){
    //for each item in the grid, fill it with -1.
    grid[i] = -1; 
  }

  /*
  select initial sample
  */


}
