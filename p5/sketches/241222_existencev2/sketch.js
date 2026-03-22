//Existence 1, November 2024. 

//this was an experiment to test the workings of cells. i haven't resolved the cells looking like cells here. 

let cells = []; 

let minRadius = 20; 
let maxRadius = 80; 

let margin = 50;

let numOfCells = 30; 

function setup() {
createCanvas(1000, 1000);
background(0);

angleMode(DEGREES); 

for (let i = 0; i<numOfCells; i++){
//i want to create new cells, but in such a way that the new cells don't overlap. the custom function allows that and returns with a non-overlapping position for each cell. 
var newCellLocations = checkValidPositions(); 

cells[i] = new Cell(newCellLocations[0],newCellLocations[1], newCellLocations[2] ); 
}

}

function checkValidPositions(){
let validPosition = false; //since this flag will turn true in the end, i start this function by declaring it false. 
let newX, newY, newRadius;

while (!validPosition) {
newRadius = int(random(minRadius, maxRadius));  
newX = random(margin + newRadius, (width - margin) - newRadius);
newY = random(margin + newRadius, (height - margin) - newRadius); 

validPosition = true;  // assume that whatever is chosen is valid. then check. 

for (let i = 0; i < cells.length; i++) {
let d = dist(cells[i].centerX, cells[i].centerY, newX, newY); 
if (d < cells[i].r + newRadius) {
validPosition = false; // set to false if overlap is found
break; // exit the loop early as it's already invalid
}
}
}

return [newX, newY, newRadius]; 
}

function draw() {

for (let i = 0; i<cells.length; i++){
cells[i].display(); 
}

connectors(); 

noLoop(); 
}

function connectors() {

for (let i = 0; i < cells.length; i++) {
let cell1 = int(random(0, cells.length)); 
let cell2 = int(random(0, cells.length)); 

while (cell1 === cell2) {
cell2 = int(random(0, cells.length));
}

stroke (255); 
line (cells[cell1].centerX, cells[cell1].centerY, cells[cell2].centerX, cells[cell2].centerY); 
}
}

class Cell {
constructor(centerX, centerY, radius){
this.centerX = centerX; 
this.centerY = centerY; 
this.r = radius; 

this.gap = 5; 
}

display(){
//x = r*cos(a)
//y = r*sin(a)

push(); 

translate (this.centerX, this.centerY); 

for (let a = 0; a<=360; a+=this.gap){
var x = this.r*cos(a); 
var y = this.r*sin(a); 

stroke(255); 
strokeWeight (2); 
point(x, y); 
}
pop(); 

}
}