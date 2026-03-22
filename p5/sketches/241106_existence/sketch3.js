//Existence; November 2024. 

let cells = []; 
let margin = 20;

//FOR CELLS
let numOfCells = 300; 

let minRadius = 15; 
let maxRadius = 50; 
let minGap = maxRadius/10; 
let maxGap = minRadius*2; 

let cellCol = 255; 
let dotSize = 4; 

//FOR CONNECTORS
let numConnections = numOfCells; 
let dashSpacing = 10; 
let dashSize = 2; 
let connectorCol = 170; 

let variance = 5; 

function setup() {
    createCanvas(1000, 1000);
    background(0);
    angleMode(DEGREES); 

    //cells.push(new Cell(width/2, height/2, int(random(minRadius, maxRadius)))); 

    for (let i = 0; i < numOfCells; i++) {
        let newCellLocations = checkValidPositions(); 
        cells[i] = new Cell(newCellLocations[0], newCellLocations[1], newCellLocations[2]); 
    }
}

function checkValidPositions() {
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

    for (let i = 0; i < cells.length; i++) {
        cells[i].display(); 
    }

    //connectors(); 

    noLoop(); 
}

function connectors() {
  for (let i = 0; i < numConnections; i++) {
      let cell1 = int(random(0, cells.length)); 
      let cell2 = int(random(0, cells.length)); 

      while (cell1 === cell2) {
        cell2 = int(random(0, cells.length));
    }

      let point1 = random(cells[cell1].perimeterPoints);
      let point2 = random(cells[cell2].perimeterPoints);

      // Calculate the distance and angle between the two points
      let totalDistance = dist(point1.x, point1.y, point2.x, point2.y);
      let angle = atan2(point2.y - point1.y, point2.x - point1.x);

      // Loop along the line distance, placing dots
      for (let d = 0; d < totalDistance; d += dashSpacing) {
          let x = point1.x + cos(angle) * d;
          let y = point1.y + sin(angle) * d;

          stroke(255, 155);
          strokeWeight(dashSize);
          point(x, y); 
      }
  }
}


class Cell {
    constructor(centerX, centerY, radius) {
        this.centerX = centerX; 
        this.centerY = centerY; 
        this.r = radius; 

        this.gap = int(map(this.r, minRadius, maxRadius, maxGap, minGap));

        this.perimeterPoints = [];
    }

    display() {
        push(); 
        translate(this.centerX, this.centerY); 

        for (let a = 0; a <= 360; a += this.gap) {
            let x = (this.r * cos(a))+random(-variance,variance); 
            let y = (this.r * sin(a))+random(-variance,variance); 

            // Store each point on the perimeter in the `perimeterPoints` array
            this.perimeterPoints.push({x: this.centerX + x, y: this.centerY + y});

            stroke(cellCol); 
            strokeWeight(this.gap*0.2); 
            point(x, y); 
            strokeWeight(this.gap*0.03); 
            line(x,y,0,0); 
        }
        pop(); 
    }
}
