//TypeShayar Explorations

var points = []; 

let img;

let black = "#050606";
let pink = "#edbed7";
let green = "#65c189"; 

let gridSize = 5; 

let colArray = []; 


function preload(){
  img = loadImage("TS24_SingleLine_BlackOnWhite.png");
}

function setup() {
    createCanvas(1920, 1080);

    points = makePointsFromImage(gridSize);

    for (let i = 0; i<points.length; i++){
      colArray.push(random([black, pink, green])); 
    }

    clear(); 


  }
  
  function draw() {
   background(black); 

   wave(); 
  }

  let waveOffset = 0; // Starting wave offset for animation
  let waveSpeed = 1; // Adjust speed of wave movement
  let waveHeight = 20; // Amplitude of the waves

  let h = 211; 
  let s = 82; 
  let l = 24; 

  function wave(){
    noStroke(); 
    

    for (let i = 0; i<points.length; i++){
      let wave = int(sin((i + waveOffset) / 50) * waveHeight);
    
      let col2 = map(wave, -25 ,25, 30, 70);
      
      fill (colArray[i]); 

    
    square (points[i].x-wave/20, points[i].y-wave, 5+wave/2); 
    }
    
    waveOffset += waveSpeed;
  }

