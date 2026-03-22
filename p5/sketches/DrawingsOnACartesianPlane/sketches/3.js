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

  for (n = 0; n<360; n+=1){
    var r = 100; 
    var end = 360; 
    var divisor = 2.5; 

    var x1 = (r*cos(n)); 
    var y1 = (r*sin(n-end)); 
    var x2 = x1-n/divisor;
    var y2 = y1-n/divisor; 
    var x3 = x1+n/divisor;
    var y3 = y1+n/divisor; 

    line (x1,y1,x3,y3);
    line (x2,y2,x3,y3);
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
  for n = 0, 1, 2 ... 360,

  draw a line from (x1, y1) to (x2, y2) where:
  x1 = 100*cos(n)
  y1 = (100*sin(n-360))
  x2 = x1-n/2.5;
  y2 = y1-n/2.5;

  and draw a line from (x2, y2) to (x3, y3) where:
  x3 = x1+n/2.5
  y3 = y1+n/2.5
  `;

  text(displayText, boundingBox.x, boundingBox.y + boundingBox.h / 2);
  pop();
}

function  mousePressed(){
save ('#.webp'); 
let cropped = get(0, 0, 600, 600); 
cropped.save('only-art.webp')
}