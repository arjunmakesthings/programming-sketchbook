let scars = []; 

function setup(){
createCanvas(1000, 562); //in 16:9 aspect ratio. 

scars [0] = new Scar(100, 100, 100, 100); 
}

function draw(){
background (190); 

for (let i = 0; i<scars.length; i++){
scars[i].display(); 
scars[i].move(); 
}
}

class Scar{
constructor(left, top, w, h){
this.left = left; 
this.top = top; 
this.w = w; 
this.h = h; 
this.right = this.left+this.w; 
this.bottom = this.top + this.h;

this.leftInside = random(this.left, (this.left+this.w/2)); 
this.topInside = random(this.top, (this.top+this.h/2)); 
this.bottomInside = random(this.topInside, this.bottom); 
this.rightInside = random(this.leftInside, this.right); 

const deviationRange = 10; 
const gap = 5; 

this.leftRowXs = []; 
this.leftRowYs = []; 
this.rightRowXs = []; 
this.rightRowYs = []; 

for (let y = this.topInside; y<=this.bottomInside; y+=gap){
var deviation = random(-deviationRange, deviationRange); 
this.leftRowXs.push(this.leftInside + deviation); 
this.leftRowYs.push(y); 
}

for (let y = this.bottomInside; y>=this.topInside; y-=gap){
var deviation = random(-deviationRange, deviationRange); 
this.rightRowXs.push(this.rightInside + deviation); 
this.rightRowYs.push(y); 
}

}

display(){
beginShape(); 
vertex (this.left, this.top); 
vertex (this.right, this.top); 
vertex (this.right, this.bottom); 
vertex (this.left, this.bottom); 

beginContour(); 
vertex (this.leftInside, this.topInside);

for (let i = 0; i<this.leftRowXs.length; i++){
var b = sin(frameCount * 0.05); 
var d = map(b, 0, 1, this.left, this.leftRowXs[i]); 

vertex (d, this.leftRowYs[i]); 
}

vertex (this.rightInside, this.bottomInside); 
for (let i = 0; i<this.rightRowXs.length; i++){
var b = sin(frameCount * 0.05); 
var d = map(b, 0, 1, this.right, this.rightRowXs[i]); 

vertex (d, this.rightRowYs[i]); 
}

endContour(); 

endShape(CLOSE); 
}

move(){

}
}