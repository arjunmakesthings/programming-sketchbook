//11 October, 2024.

//colour declarations. all from flexoki light: https://stephango.com/flexoki
let bg = "#FFFCF0"; //bg.
let numLineCol = "#DAD8CE"; //lightui-2.
let drawingCol = "#6F6E69"; //tx-2.
let txCol = "#343331"; //dark theme ui-2.

let font;
let font2;

function preload() {
  font = loadFont("fonts/SourceCodePro-ExtraLight.ttf");
  font2 = loadFont("fonts/SourceCodePro-Regular.ttf");
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
  translate(600, 300);
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
  stroke(drawingCol);
  strokeWeight (0.5); 

  //main drawing goes here:

  for (let x = -250; x <=250; x+=50) {
    for (let y = -250; y <=250; y+=50) {
      line (x, sin(y)+x, sin(x), y); 
  }
}

//end
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
  textLeading(20);
  textFont(font2);
  textAlign(LEFT, CENTER);

  let displayText = 
  `
  for x = -250, -200, -150 ... 250, 
  for y = -250, -200, -150 ... 250, 

  draw a line from (x, sin(y)+x) to (sin(x), y)
  `;

  text(displayText, boundingBox.x, boundingBox.y + boundingBox.h / 2);
  pop();
}

function  mousePressed(){
save ('#.webp'); 
let cropped = get(0, 0, 600, 600); 
cropped.save('only-art.webp')
}
