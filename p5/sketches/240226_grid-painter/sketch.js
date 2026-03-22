//Grid Paint 4; Arjun, February 2023.

let margin = 0;

let tiles = [];
let tileSize = 20;

let brushes = [];
let num = 1000;

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
  for (let i = 0; i < num; i++) {
    var n = int(random(tiles.length)); 
    brushes[i] = new Brush(tiles[n].x, tiles[n].y);
  }

  background(0);
}

function draw() {
  //background(0);

  translate(-width / 2, -height / 2);


  for (let i = 0; i < tiles.length; i++) {
    //tiles[i].display();
  }

  for (let i = 0; i < num; i++) {
    brushes[i].display();
    brushes[i].move();
  }

}

function mousePressed() {
  save('frame.jpeg');
}
