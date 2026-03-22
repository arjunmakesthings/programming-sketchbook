//Unnamed; Month, Year. 

let containerWidth = 160; 
let containerHeight = 192; 

let num = 30; 
let sizeOfCirc = 4; 

let n = []; 

function setup() {
createCanvas(800, 800); //in 16:9 aspect ratio. 
}

function draw() {
background(190);

//container
push(); 
translate (width/2-containerWidth/2, height/2-containerHeight/2); 
rect (0,0, 160, 192);

//particle
fill ('red'); 

for (let x = 0; x<=containerWidth; x+=6){
    for (let y = 0; y<=containerHeight; y+=6){
    circle (x,y,sizeOfCirc); 
    n.push(x); 
    }
}

console.log(n); 


pop(); 

noLoop(); 
}