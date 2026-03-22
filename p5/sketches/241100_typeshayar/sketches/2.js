//TypeShayar Explorations

var points = []; 

let img;

let black = "#050606";
let pink = "#edbed7";
let green = "#65c189"; 

var waveOffset = 20; 
var waveSpeed = 0.06; 
var waveHeight = 15; 

let colChoice = []; 


function preload(){
  img = loadImage("TS24_SingleLine_BlackOnWhite.png");
}

function setup() {
    createCanvas(1920, 1080);

    points = makePointsFromImage(10);


    for (let i = 0; i<points.length; i++){
      colChoice.push(random([green,pink])); 
    }

    clear(); 

  }
  
  function draw() {
   background(black); 

   gears(); 
  }

  function gears(){
    var t = frameCount/60; 
    const amp = 10;
  
    for (let i = 0; i < points.length; i+=2) {
      push(); 
      strokeWeight (0.5); 
      fill (colChoice[i]); 

      rectMode (CENTER); 
      translate(points[i].x, points[i].y); 
      for (let x = 0; x <= 10; x += 2) {
        for (let y = 0; y <= 10; y += 20) {
          let ang = (t + sin(i + t)) * 0.2;
          //rotate(ang);
          let rectWidth = (sin(i + t)*12);
          rect(x, y, rectWidth, rectWidth*1.2);
        }
      }
      pop(); 
    }
  }

