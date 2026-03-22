//Grid Paint 4; Arjun, February 2023.

let margin = 100;

let tiles = [];
let tileSize = 50;


let brushes = [];
let num = 50;

function setup() {
  createCanvas(1000, 1000, WEBGL);
  rectMode(CENTER);
  


  //Creating tiles
  for (let x = margin + tileSize / 2; x <= width - tileSize / 2 - margin; x += tileSize) {
    for (let y = margin + tileSize / 2; y <= height - tileSize / 2 - margin; y += tileSize) {
      tiles.push(new Tile(x, y, tileSize));
      //others.push(new Other(x, y)); 
    }
  }

  //Create brush
  for (let i=0;i<num; i++){
    brushes[i] = new Brush (tiles[tiles.length/2].x, tiles[8].y); 
  }

  background(0);
}

function draw() {
  //background(0);

  translate(-width / 2, -height / 2);


  for (let i = 0; i < tiles.length; i++) {
    //tiles[i].display();
  }

  for (let i=0;i<num; i++){
    brushes[i].display(); 
    brushes[i].move(); 
  }

}

function mousePressed() {
  save('frame.jpeg');
}
