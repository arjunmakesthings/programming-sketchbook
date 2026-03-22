//TypeShayar Explorations

var points = []; 

let img;

let black = "#050606";
let pink = "#edbed7";
let green = "#65c189"; 

var waveOffset = 20; 
var waveSpeed = 0.06; 
var waveHeight = 15; 

let cols = [green, pink]; 
let colChoice = []; 


function preload(){
  img = loadImage("TS24_SingleLine_BlackOnWhite.png");
}

function setup() {
    createCanvas(1920, 1080);

    points = makePointsFromImage(7);

    for (let i = 0; i<points.length; i++){
      colChoice.push(random([green,pink])); 
    }

    clear(); 



  }
  
  function draw() {
   background(black); 

   dancingInTheDark(); 
  }

  function dancingInTheDark(){

    strokeWeight (2.5); 
  

    for (let i = 0; i<points.length; i+=1){
      let wave = sin(i+waveOffset)*waveHeight; 

      stroke (colChoice[i]); 

      line (points[i].x+wave, points[i].y, points[i].x, points[i].y); 
    }

    waveOffset+=waveSpeed; 
  }

