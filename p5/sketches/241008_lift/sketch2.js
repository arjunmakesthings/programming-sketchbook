//Sakina's Lift; October, 2024. 

let margin = 100; 
let r = 50; 

function setup() {
    createCanvas(1000, 1000);
    rectMode(CENTER); 
    angleMode (DEGREES); 
    noStroke(); 
  }
  
  function draw() {
    background(0);

    var t = frameCount/60; 

    for (let x = margin; x<=width-margin; x+=r){
      for (let y = margin; y<=height-margin; y+=r){
      fill (255); 
      ellipse (x, y, r); 

      push(); 
      translate (x,y); 

      //debug
      /*
      rotate (45); 
      fill ('red'); 
      */

      //actual
      fill (0); 
      rotate (sin(x+t)*800); 

      square (0,0,r-10); 
      pop(); 
      }
    }
  }