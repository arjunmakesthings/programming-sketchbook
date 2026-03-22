//Boilerplate for getting started with matter.js; Arjun, August 2024. 

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
var particle; 

//this is for the ground: 
var ground; 

function setup() {
  createCanvas(windowWidth, windowHeight);

  //physics engine takes rect from center, center; so doing the same for p5
  rectMode (CENTER); 

  // Matter is a physics engine. So, we create an engine in the program: 
  engine = Engine.create(); 

  // This is where we can create bodies. Any initialisations of arrays can also go here. 
  particle = Bodies.rectangle (width/2, 0, 100,100); 

  // This is where we're creating a ground
  ground = Bodies.rectangle(width/2, height/2, 200, 20, {isStatic: true}); 

  // All bodies are composited, along with adding them to a 'world'. 
  Composite.add(engine.world, [particle, ground]); 

  // A runner keeps updating the engine and syncs it with the browser frame-rate. 
  runner = Runner.create(); 
  Runner.run(runner,engine); 
}

function draw() {

  background(0);

  // Bodies have inherent properties that are namespaced. We can use this to draw things. 
rect (particle.position.x, particle.position.y, 100,100);

//also drawing the ground for reference: 
fill (170); 
rect(ground.position.x, ground.position.y, 200, 20); 

}
