//The Weight of My Thoughts; Arjun, August 2024.

//Ensure you've added the matter.js file to your index.html file.

//Most libraries are namespaced to avoid clashes with other language-specific variables. We create variables to avoid using matter.something every single time.
var Engine = Matter.Engine,
  //Render = Matter.Render, //matter.js has an in-built renderer as well. However, since we're using p5, this isn't necessary for us.
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

//global variables that will be used later:
var engine;
var runner;

//this is where you can declare your 'bodies' for later:
var sentences = [];

//this is for the ground:
var ground;
var leftWall;
var RightWall;

//Initial position of letters; consider margin.
var xPos = 100;
var yPos = 100;

//Initialise noise variable. Idk why it's xoff but just is for now.
var xoff = 0;
var ang = 0;

var typedSentence = "";
var tSize = 28;

function setup() {
  createCanvas(windowWidth, windowHeight);

  setupMatterJS();
}

function setupMatterJS() {
  //physics engine takes rect from center, center; so doing the same for p5
  rectMode(CENTER, CENTER);
  textAlign(CENTER, CENTER);

  // Matter is a physics engine. So, we create an engine in the program:
  engine = Engine.create();

  // This is where we can create bodies. Any initialisations of arrays can also go here.
  //particle = Bodies.rectangle (width/2, 0, 100,100);

  makeGrounds();

  // All bodies are composited, along with adding them to a 'world'.

  // A runner keeps updating the engine and syncs it with the browser frame-rate.
  runner = Runner.create();
  Runner.run(runner, engine);
}

function makeGrounds() {
  // This is where we're creating grounds

  // Create the bottom ground
  ground = Bodies.rectangle(width / 2, height - 100, width - 180, 20, {
    isStatic: true,
  });

  // Create the left wall
  leftWall = Bodies.rectangle(100, height / 2, 20, height - 180, {
    isStatic: true,
  });

  // Create the right wall
  rightWall = Bodies.rectangle(width - 100, height / 2, 20, height - 180, {
    isStatic: true,
  });

  // Add all bodies to the world
  Composite.add(engine.world, [ground, leftWall, rightWall]);
}

function draw() {
  background(0);

  for (let i = 0; i < sentences.length; i++) {
    sentences[i].display();
  }

  //displayBoundaries();
}

function displayBoundaries() {
  //display all of them
  fill("red");
  rect(width / 2, height - 100, width - 180, 20);
  rect(100, height / 2, 20, height - 180);
  rect(width - 100, height / 2, 20, height - 180);
}

function keyTyped() {
  if ((keyCode != ENTER) & (key != " ")) {
    typedSentence += key;

    //actual display of letters
    /*
    xoff+=0.001; 
    xPos += textWidth(key)*random(2, 3, 5);
    ang += noise(xoff);

    letters.push(new Letter(key, xPos, yPos, ang));
    */
  } else if ((key == " ") | (key == ENTER)) {
    sentences.push(
      new Sentence(
        typedSentence,
        random(
          width / 2 - textWidth(typedSentence),
          width / 2 + textWidth(typedSentence)
        ),
        yPos
      )
    );
    //xPos += textWidth('OO') * 10;
    typedSentence = "";
  }
}
