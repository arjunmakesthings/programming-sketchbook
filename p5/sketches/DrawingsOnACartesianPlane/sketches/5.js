//12 October, 2024. 

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
  drawLines(1, 1, 2,2, -1.1, 1.1);
  drawLines(-1, -1, 2,2, 1.1, -1.1);
  drawLines(-1, 1, -2,2, -1.5, 1.5);
  drawLines(1, -1, -2,2, 1.5, -1.5);
  //drawLines(-1, 1, 2,2, -1.1, 1.1);
  //drawLines(1, -1, 2,2, 1.1, -1.1);
}

let iterations = 0; 

function drawLines(x1, y1, x2, y2, xMultiplier, yMultiplier) {
  line(x1, y1, x2, y2);

  if (abs(x2)<250) {
    iterations++; 

    var newx1 = x2; 
    var newy1 = y2; 
    var newx2 = x2*xMultiplier; 
    var newy2 = y2*yMultiplier; 
    var newxMultiplier=(xMultiplier*-1);
    var newyMultiplier=(yMultiplier*-1);

    drawLines (newx1, newy1, newx2, newy2, newxMultiplier, newyMultiplier);
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
  draw lines from (x1, y1) to (x2, y2) where: 
  x1 = 1, -1, -1, 1
  y1 = 1, -1, -1, 1
  x2 = 2, 2, -2, -2
  xVar = -1.1, 1.1, -1.5, 1.5
  yVar = 1.1, -1.1, 1.5, -1.5

  now, draw lines from (x1, y1) to (x2, y2) till |x2|<250 where:
  x1 = previous x2
  y1 = previous y2
  x2 = x2*xVar
  y2 = y2*yVar
  xVar = xVar*(-1)
  yVar = yVar*(-1)
  `

  text(displayText, boundingBox.x, boundingBox.y + boundingBox.h/2); 
  pop(); 
}

function  mousePressed(){
save ('5.webp'); 
let cropped = get(0, 0, 600, 600); 
cropped.save('only-art.webp')
}