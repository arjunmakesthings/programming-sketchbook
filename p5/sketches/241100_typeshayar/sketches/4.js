//TypeShayar Explorations

var points = [];

let img;

let black;
let pink = "#edbed7";
let green = "#65c189";

let gridSize = 10;

let cells = [];
var t = 0;

let frames = 0; 

let colTog = false; 

function preload() {
  img = loadImage("TS24_SingleLine_BlackOnWhite.png");
}

function setup() {
  createCanvas(1920, 1080);

  black = color('#050606'); 

  pink = color('#edbed7');
  

  green = color('#65c189'); 

  points = makePointsFromImage(gridSize);

  rectMode(CENTER) ;

  //clear();


  for (let i = 0; i < points.length; i++) {
    cells.push(new Cell(points[i].x, points[i].y));
  }
  background(black);
}

function draw() {
  //background(255);
  frames++;

  pink.setAlpha(10); 
  green.setAlpha(10); 

  for (let i = 0; i < cells.length; i++) {
    cells[i].display();
    cells[i].move();

    if (frames==60){
      cells[i].prob = int(random(0, 9));
      //colTog=!colTog; 
    }if (frames==180){
      cells[i].prob = 5; 
      colTog=!colTog; 
    } if (frames==300){
      frames=0; 
    }
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.startingX = x; 
    this.startingY = y; 

    this.d = 300; 

    this.prob = 0;
    
    this.newX = x;
    this.newY = y;

    this.pace = 0.09; 
  }

  display() {

    if (colTog==true){
      fill(green);
    }else{
fill(pink); 
    }
    
    noStroke();

    square(this.x, this.y, gridSize);
  }


    move() {
    
      this.x = lerp (this.x, this.newX, this.pace);
      this.y = lerp (this.y, this.newY, this.pace);
      
      if (this.prob==1){
        this.newX = this.startingX - this.d;
        this.newY = this.startingY - this.d;
      }
      
          if (this.prob==2){
        this.newX = this.startingX; 
        this.newY = this.startingY - this.d;
      }
      
          if (this.prob==3){
        this.newX = this.startingX + this.d;
        this.newY = this.startingY - this.d;
      }
      
          if (this.prob==4){
        this.newX = this.startingX - this.d;
        this.newY = this.startingY;
      }
      
          if (this.prob==5){
        this.newX = this.startingX;
        this.newY = this.startingY;
      }
      
          if (this.prob==6){
        this.newX = this.startingX - this.d;
        this.newY = this.startingY + this.d;
      }
      
          if (this.prob==7){
        this.newX = this.startingX ;
        this.newY = this.startingY + this.d;
      }
      
          if (this.prob==8){
        this.newX = this.startingX + this.d;
        this.newY = this.startingY + this.d;
      }
      
    }
}
