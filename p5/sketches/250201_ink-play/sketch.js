//inkBlot play; february, 2025. 

//this was an unintended output from the project i'm working with at slow-studio. 

let particles = []; 
let inkParticles = []; 

const margin = 100; 

function setup() {
createCanvas(1000, 562, WEBGL); //in 16:9 aspect ratio. 
rectMode (CENTER); //to center the text box. 
//angleMode (DEGREES); //use degrees instead of radians. 

background (255); //white background, change to texture if needed. 

translate (-width/2, -height/2); 


for (let x = margin; x<=width-margin; x+=50){
for (let y = margin; y<=height-margin; y+=50){
createInkBlotParticles(x, y);
}
}

}

function draw() {
translate (-width/2, -height/2); 
for (let particle of particles){
particle.display(); 
particle.move(); 
}

}


function mousePressed(){
createInkBlotParticles(mouseX, mouseY); 
}

function createInkBlotParticles(centerX, centerY){
//run through 0 to 360 degrees and create a particle at each. 

for (let i = 0; i<=360; i++){
const radius = 500; 
let angle = radians(i); 
let x = centerX + sin(angle)*radius;
let y = centerY + cos(angle)*radius;

particles.push(new Particle(x, y, angle, radius)); 

}

}

class Particle{
constructor(x, y, angle, radius){
this.x = x; 
this.y = y; 
this.angle = angle; 
this.radius = radius; 
}

display(){
strokeWeight (0.5); 
stroke (0, 10); 
noFill(); 

point (this.x, this.y);
}

move(){
const scaleMax = 16; //scale noise from [0,1] to [0,max]. 
const noiseRangeShift = scaleMax/2; //shift range from [0,max] to [-max/2, max/2]. 
const spreadSpeed = 0.05; 

let noiseX = noise(this.x*0.01, this.y*0.01)*scaleMax - noiseRangeShift;
let noiseY = noise(this.y*0.01, this.x*0.01)*scaleMax - noiseRangeShift; 

this.x+=sin(this.angle)*spreadSpeed + noiseX; 
this.y+=sin(this.angle)*spreadSpeed + noiseY; 


}

}