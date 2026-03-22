//coding is my happy place; June, 2024. 

let t = "coding is my happy place";

let margin = 100; 

function setup() {
    createCanvas(1000, 1000);

    textSize(180); 
    textAlign (CENTER, CENTER); 
  }

  function draw(){
    background (255); 

    fill (0); 

    text (t, width/8, height/22, width-width/4, height-margin); 
  }

  