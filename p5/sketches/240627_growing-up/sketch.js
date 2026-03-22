//Growing Up Is A Pain; June, 2024. 

let t = "growing up";
let hMultiplier = 9; 
let vMultiplier = 2; 
let tSize = 16; 

let startX = 0; 

function setup() {
    createCanvas(1000, 1000);
    smooth(); 

    //Text Styling
    textFont ("Garamond"); 
    fill (0); 
    noStroke(); 
    textAlign (CENTER, CENTER); 
  }
  
  function draw() {
    background(255);

    for (let y = 20; y<=height-20; y+=50){
        for (let x = 20; x<=width-20; x+=230){
          for (let i = 0; i<t.length; i++){
            textSize (140+tSize); 
            tSize =  sin(frameCount*0.03)*100; 
            text (t[i], x+(i*20), y)
          }
        }
      }
   // noLoop(); 

  }