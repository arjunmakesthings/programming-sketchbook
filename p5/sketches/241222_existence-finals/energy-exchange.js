//Existence — Energy Exchange; December, 2024.
let margin = 50; 

//FOR CELLS
let cells = []; 
//let numOfCells = 900; 

let numOfCells = 2; 

let numConnections = numOfCells*20; 

let minRadius = 50; 
let maxRadius = minRadius*2; 
let variance = 2; 

let cellCol = 255;
let bgCol = 0; 

function setup(){
    //createCanvas (842,842, WEBGL); 

    //A3, 200DPI
    createCanvas(2339, 3307, WEBGL)
    angleMode (DEGREES); 

    background (bgCol); 

    /*
    //for non-random, grid layout: 

    for (let x = margin+maxRadius; x<=width-margin-maxRadius; x+=maxRadius*2){
        for (let y = margin+maxRadius; y<=height-margin-maxRadius; y+=maxRadius*2){
            cells.push( new Cell(x, y, int(random(minRadius, maxRadius)))); 
        }
    }
    */

    for (let i = 0; i < numOfCells; i++) {
    let newCellLocations = checkValidPositions(); 
    cells[i] = new Cell(newCellLocations[0], newCellLocations[1], newCellLocations[2]); 
    }




}

function draw() {
    translate (-width/2, -height/2); 

    for (let i = 0; i < cells.length; i++) {
    cells[i].display(); 
}

connectors(); 

noLoop(); 
}

class Cell{
    constructor(centerX, centerY, radius) {
    this.centerX = centerX; 
    this.centerY = centerY; 
    this.r = radius; 

    //this.gap = int(map(this.r, minRadius, maxRadius, maxGap, minGap));
    this.gap=10;

    this.perimeterPoints = [];
    }

    display() {

        for (let n = 5; n<=this.r; n+=3){
            push(); 
            translate(this.centerX, this.centerY); 

            beginShape(); 

            for (let a = 0; a <= 360; a += this.gap) {
            let x = (n * cos(a))+random(-variance,variance); 
            let y = (n * sin(a))+random(-variance,variance); 

            // Store each point on the perimeter in the `perimeterPoints` array
           // this.perimeterPoints.push({x: this.centerX + x, y: this.centerY + y});

            stroke(cellCol-50); 
            strokeWeight (0.8); 
            //fill (cellCol); 
            noFill(); 

            vertex(x, y); 
            }
            endShape(CLOSE); 
            pop(); 
        }
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
    if (d < cells[i].r*2 + newRadius*2) {
    validPosition = false; // set to false if overlap is found
    break; // exit the loop early as it's already invalid
    }
    }
    }

    return [newX, newY, newRadius]; 
}

function connectors(){
    for (let i = 0; i < numConnections; i++) {
    let cell1 = int(random(0, cells.length)); 
    let cell2 = int(random(0, cells.length)); 

    while (cell1 === cell2) {
    cell2 = int(random(0, cells.length));
    }


    strokeWeight (0.07); 
    stroke (cellCol-50); 
    line (cells[cell1].centerX, cells[cell1].centerY, cells[cell2].centerX, cells[cell2].centerY); 
    }
    }

function mousePressed(){
save("frame.jpeg"); 
}


