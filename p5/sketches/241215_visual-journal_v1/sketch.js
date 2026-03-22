//Visual Journal v1; August 2024.

let letters = [];

//Initial position of letters; consider margin.
var xPos = 100;
var yPos = 100;

//Initialise noise variable. Idk why it's xoff but just is for now.
var xoff = 0;
var ang = 0;

var tSize = 24; 

function setup() {
  createCanvas(windowWidth, windowHeight);

  //background(0);
}

function draw() {
  background(0);

  for (let i = 0; i < letters.length; i++) {
    letters[i].display();
  }

  // console.log(xPos, textWidth(key)); //debug
}

function keyTyped() {
  if (keyCode != ENTER) {

    // automatic line break
    if (xPos > width - 100) {
      yPos += tSize * 2; //consider this leading; at the moment double of text size.
      xPos = 100;
    }

    //actual display of letters
    xoff++; 
    xPos += textWidth(key)*random(2, 3, 5);
    ang += noise(xoff);

    letters.push(new Letter(key, xPos, yPos, ang));

  } else if (key == " ") {
    xPos += textWidth(O) * 3;
  }

      // forced line break
      if (keyCode == ENTER) {
        yPos += tSize * 2.5; //consider this after-para
        xPos = 100;
      }
}
