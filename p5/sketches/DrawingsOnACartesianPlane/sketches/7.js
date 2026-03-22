//Art With The Cartesian Coordinate System; October 2024.

/*Notes on the Setup:
- I'm using a 600x600 canvas for drawing, with the number line going from -250, 250 (a 500 cm long / wide line). 
- The visible increments are 100. 
*/

//colour declarations. all from flexoki light: https://stephango.com/flexoki
let bg = "#FFFCF0"; //bg.
let numLineCol = "#DAD8CE"; //lightui-2.
let drawingCol = "#6F6E69"; //tx-2.
let txCol = "#343331"; //dark theme ui-2.

let font;
let font2; 

function preload() {
  font = loadFont("fonts/SourceCodePro-ExtraLight.ttf");
  font2 = loadFont ("fonts/SourceCodePro-Regular.ttf"); 
}

function setup() {
  createCanvas(1200, 600);
  background(bg);
}

function draw() {
  stroke(drawingCol);
  push();
  translate(300, 300);
  numLine();
  scale(1, -1);
  //drawing here: 
  mainDrawing();

  pop(); 

  push(); 
  translate (600, 300)
  algorithmDisplay(); 
  pop(); 

  noLoop();
}


function numLine() {
  stroke(numLineCol);
  line(-250, 0, 250, 0); //horizontal
  line(0, -250, 0, 250); //vertical

  textFont(font);
  textSize(8);
  fill(numLineCol);
  textAlign(CENTER, CENTER);

  //markings
  var numberText = -250;

  for (let x = -250; x <= 250; x += 50) {
    line(x, -5, x, 5); //horizontal markings.
    line(-5, x, 5, x); //vertical markings.

    noFill();
    //text
    // remove zeroes from the loop.
    if (numberText !== 0) {
      text(numberText, x, 10);
      text(numberText, 17, -x - 1.5);
    }

    numberText += 50;
  }
  text("0", 10, 10); //draw zero a little to the right.
}

function mainDrawing() {
stroke (drawingCol);
strokeWeight (0.5); 
//main drawing goes here:

var gap = 10; 

//right
for (let x=0;x<250; x+=gap){
line(x, 0, x+gap, x+gap); //right ascending
line(x+gap, x+gap, x+gap, 0); //top to bottom

line(x, 0, x+gap, ((x-gap)*-1)); //bottom
line(x+gap, ((x-gap)*-1), x+gap, 0); //top to bottom
}

for (let x = 0; x>-250; x-=gap){
line (x, 0, x-gap, (x-gap)*-1); //top
line (x-gap, (x-gap)*-1, x-gap, 0); //top

line(x, 0, x-gap, x+gap); //bottom
line(x-gap, x+gap, x-gap, 0); //bottom
}


}

function algorithmDisplay() {
  push(); 
  // Define the bounding box
  let boundingBox = { x: 50, y: -250, w: 500, h: 500 }; // Adjust size as needed

  // Draw the bounding box
noFill(); 
noStroke(); 
rect(boundingBox.x, boundingBox.y, boundingBox.w, boundingBox.h);

  // Set text properties and display sample text
  fill(txCol); // Black text color
  noStroke(); 
  textSize(12);
  textLeading (20); 
  textFont (font2); 
  textAlign(LEFT, CENTER);

  let displayText = 
  `
  for x = 0, 10, 20 ... 250, 

  draw lines from: 
  (x, 0) to (x+10, x+10), 
  (x+10, x+10) to (x+10, 0)
  (x, 0) to (x+10, (x-10)*-1)
  (x+10, (x-10)*-1) to (x+10, 0)

  for x = 0, -10, -20 ... -250, 

  draw lines from: 
  (x, 0) to (x-10, (x-10)*-1), 
  (x-10, (x-10)*-1) to (x-10, 0), 
  (x, 0) to (x-10, x+10),
  (x-10, x+10) to (x-10, 0)
  `

  text(displayText, boundingBox.x, boundingBox.y + boundingBox.h/2); 
  pop(); 
}

function  mousePressed(){
save ("#.webp"); 
let cropped = get(0, 0, 600, 600); 
cropped.save('only-art.webp')
//save ("#.jpeg"); 
}