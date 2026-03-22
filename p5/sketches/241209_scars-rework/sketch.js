//These Scars Won't Heal; December, 2024. 

let myText = []; 

function setup() {
createCanvas(1000, 562); //in 16:9 aspect ratio. 

//convertLetterToPoints(string, xPos, yPos, maxWidth = Infinity, maxHeight = Infinity, gridSize = 3, fontSize = 24, font = "Arial", horAlignment = "LEFT", verAlignment = "TOP")
myText = convertLetterToPoints("how will these scars heal", 0, height/2-150, width, height, 5, 145, "Arial", CENTER); 

background (190); 

for (let i = 0; i<myText.length; i+=2){
createShapes(myText[i].x, myText[i].y, 5,5); 
}
}

function createShapes(left, top, w, h){
var right = left + w; 
var bottom = top + h; 

noStroke(); 

beginShape(); 
vertex (left, top); // LEFT TOP
vertex (right, top); 
vertex (right, bottom); 
vertex (left, bottom); 

beginContour(); 
var leftInside = random(left, (left+w/2)); //from left to midpoint
var topInside = random(top, (top+h/2)); 
var bottomInside = random(topInside, bottom); 
var rightInside = random(leftInside, right); 

const deviationRange = 10; 
var gap = 5; 

vertex (leftInside, topInside); //left-top-point

for (let y = topInside; y<=bottomInside; y+=gap){
var deviation = random(-deviationRange,deviationRange); 
vertex (leftInside+deviation, y); //left-line
}

vertex (rightInside, bottomInside); //right-bottom-point

for (let y = bottomInside; y>=topInside; y-=gap){
var deviation = random(-deviationRange,deviationRange); 
vertex (rightInside+deviation, y); //right-line
}

endContour(); 

endShape(CLOSE); 

}

function draw() {
//background(190);

noLoop(); 
}

/*
//going to use a contour cut out from a solid shape.
//exterior vertices have to be clockwise winding. 
var left = 100; 
var top = 100; 

var w = 100; //left + w gives right-most coordinates. 
var h = 100; //top + h gives bottom-most coordinates. 

var right = left + w; 
var bottom = top + h; 

beginShape(); 
vertex (left, top); // LEFT TOP
vertex (right, top); 
vertex (right, bottom); 
vertex (left, bottom); 

beginContour(); 
/* flow:
- first, pick a point on the left side of the square. 
- now draw an array of points below, until the desired height. 
- next, find a point on the right side of the square. 
- draw an array of points above, until the desired height. 
- finally, join the last right point and the left point. 
*/

/*
var leftInside = random(left, (left+w/2)); //from left to midpoint
var topInside = random(top, (top+h/2)); 
var bottomInside = random(topInside, bottom); 
var rightInside = random(leftInside, right); 

const deviationRange = 10; 
var gap = 5; 

vertex (leftInside, topInside); //left-top-point

for (let y = topInside; y<=bottomInside; y+=gap){
var deviation = random(-deviationRange,deviationRange); 
vertex (leftInside+deviation, y); //left-line
}

vertex (rightInside, bottomInside); //right-bottom-point

for (let y = bottomInside; y>=topInside; y-=gap){
var deviation = random(-deviationRange,deviationRange); 
vertex (rightInside+deviation, y); //right-line
}

endContour(); 

endShape(CLOSE); 
*/