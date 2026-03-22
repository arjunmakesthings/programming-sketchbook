//Name

var xoff = 0; 

var x, y; 

function setup() {
    createCanvas(1000, 1000);

    background (0); 
  }
  
  function draw() {

    background (0); 

    x = noise(xoff)*20; 
    square (x, height/2, 50); 
    xoff++; 
  }