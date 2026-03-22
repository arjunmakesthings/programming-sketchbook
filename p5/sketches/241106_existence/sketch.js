//Existence, November 2024. 

let cells = []; 

let minRadius = 20; 
let maxRadius = 80; 

let margin = 50;

let numOfCells = 30; 

function setup() {
    createCanvas(1000, 1000);
    background(0);

    angleMode(DEGREES); 

    cells.push(new Cell (width/2, height/2, int(random(minRadius, maxRadius)))); 

    for (let i = 0; i<numOfCells; i++){
      var newCellLocations = checkValidPositions(); 
      cells[i] = new Cell(newCellLocations[0],newCellLocations[1], newCellLocations[2] ); 
    }
    
  }

  function checkValidPositions(){
    let validPosition = false;
    let newX, newY, newRadius;

    while (!validPosition) {
        newRadius = int(random(minRadius, maxRadius));  
        newX = random(margin + newRadius, (width - margin) - newRadius);
        newY = random(margin + newRadius, (height - margin) - newRadius); 

        validPosition = true;  // Assume the position is valid until proven otherwise

        for (let i = 0; i < cells.length; i++) {
            let d = dist(cells[i].centerX, cells[i].centerY, newX, newY); 
            if (d < cells[i].r + newRadius) {
                validPosition = false; // Set to false if overlap is found
                break; // Exit the loop early as it's already invalid
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

  function connectors(){
    let num1 = int(random(0, cells.length)); 
    let num2 = int(random(0, cells.length)); 

    let a1 = int(random(0, 360)); 

    stroke (255); 
    strokeWeight (0.5); 

    line(cells[num1].centerX, cells[num1].centerY, cells[num2].centerX, cells[num2].centerY);
  }

  class Cell {
    constructor(centerX, centerY, radius){
      this.centerX = centerX; 
      this.centerY = centerY; 
      this.r = radius; 

      this.gap = 20; 
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