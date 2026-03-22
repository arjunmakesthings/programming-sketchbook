//how will these scars heal?; february, 2025. 

//s leaving hurts so much. i wonder how will these scars ever heal?
//hence the sketch. i want to express what it feels like.

//first, i will resolve the mechanism for a single scar: 

// a scar is basically a contour appearing on a tightly packed surface. 

let surfaces = []; 

let bg = 255; 

function setup() {
createCanvas(1000, 562); //in 16:9 aspect ratio. 

createSurface(); 
}

function createSurface(){
surfaces [0] = new Surface(200, 200, 200, 200); 
}

function draw() {
background(bg);

for (let surface of surfaces){
surface.display(); 
}

scar(0); 

noLoop(); 

}

function scar(surfaceIndex){
// a scar opens inside a surface. 

//calculating landmarks of the scar: 

//the top-x is simple, since it is the center of the surface: 
let topMostX = surfaces[surfaceIndex].left_x + (surfaces[surfaceIndex].w/2); //in the center of the surface. 

//the top-y is a random position between the surface's y position and it's (y-position+height). 
let topMostY = int(random(surfaces[surfaceIndex].left_y, surfaces[surfaceIndex].left_y+surfaces[surfaceIndex].h)); 

// console.log(`topMostY of scar is ${topMostY}, while it's left_y is ${surfaces[surfaceIndex].left_y} and left_y+height is ${surfaces[surfaceIndex].left_y+surfaces[surfaceIndex].h}.`); //debug-comment to check if topMostY of the scar is actually inside the surface. 

//the bottom-x is again the center of the screen, exactly the same as topMostX. 
let bottomMostX = surfaces[surfaceIndex].left_x + (surfaces[surfaceIndex].w/2); //in the center of the surface.

//the bottom-y is a random position between the top-most-y and the surface's height . 
let bottomMostY = int(random(topMostY, surfaces[surfaceIndex].left_y+surfaces[surfaceIndex].h)); 


//drawing points: 
fill (bg); 

beginShape(); 
//since the scar is an anti-clockwise contour, there is a vertical-list of vertices below the top-most point. 

vertex (topMostX, topMostY);//top-most point. 

const vertGap = 0.5;

for (let y = topMostY+vertGap; y<bottomMostY-vertGap; y+=vertGap){
//a row of left-points here: 
let x = random(surfaces[surfaceIndex].left_x, topMostX);
const variance = random(-2,2); 

vertex (x+variance, y);
}

for (let y = bottomMostY-vertGap; y>=topMostY; y-=vertGap){
//a row of right-points here: 

let x = random(topMostX, surfaces[surfaceIndex].left_x + surfaces[surfaceIndex].w);
const variance = random(-2,2); 

vertex (x+variance, y);
}
endShape(CLOSE);

}


class Surface{
constructor(left_x, left_y, w, h){
this.left_x = left_x; 
this.left_y = left_y; 
this.w = w; 
this.h = h; 
}

display(){
fill (0); 
noStroke(); 

beginShape(); 
vertex (this.left_x, this.left_y); //top-left. 

vertex (this.left_x+this.w, this.left_y) //top-right. 


vertex (this.left_x+this.w, this.left_y+this.h); //bottom-right. 

vertex (this.left_x, this.left_y+this.h); //bottom-left. 
endShape(CLOSE); 
}
}