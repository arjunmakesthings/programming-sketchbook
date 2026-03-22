//Computer Painter, v2.0. 

//Started on 28th September, 2024. 

//Thought: A brushStroke has a starting position (originX, originY), brushWidth (the breadth of the stroke), startingAngle, distance (that it has to travel), pace (speed at which it is supposed to travel), colour & opacity of that colour, how much the bristles have frayed (frayness), fineness (how close or apart the bristles are from each other), bristleWidth (how small or big are the bristles) and direction that the stroke is supposed to move in. 

let brushStrokes = []; 

function setup() {
    createCanvas(500, 500);

    for (let i = 0; i<160; i++){

      /*
      PARAMETERS

      //brush selection
      - brushWidth = how thick the end-stroke is supposed to be. think of it like paintbrush 'size' (breadth).
      - frayness = how far apart (vertically) are the bristles from each other? 
      - fineness = how far apart (horizontally) are the bristles from each other?
      - bristleWidth = how thick are the bristles themselves?

      //colour
      - colour = what (all) colours do you want in your painting?
      - opacity = how opaque or transparent do you want your strokes to be?

      //starting position
      - margin = set the margin for your composition.
      - originX, originY = starting x and y position on the canvas.
      - startingAngle = at what angle do you place your paintbrush.

      //travel
      - directionToMove = what direction are you going to move your brush in?
      - distance = what distance should the paintbrush travel?
      - pace = how fast should the paintbrush travel?
      */

      //brush selection
      let brushWidth = int(random(3,80)); 
      let frayness = random(-1,1);
      let fineness = int(random(1,2));  
      let bristleWidth = int(random(1,2)); 

      //colour
      let colour = random(['#638d96','#567b89', '#39546d', '#283f54', '#13273e']); 
      let opacity = 255; 

      //starting position
      let margin = 0; 
      let originX = int(random(margin, width-margin)); 
      let originY = int(random(margin, height-margin)); 
      let startingAngle = random(0, TWO_PI); 

      //travel
      let directionToMove = int(random([1,2,3,4])); 
      //let directionToMove = 4; 

      let distance = 100; 
      let pace = random(0.05,0.2); 
      let rotationPace = random(0.05, 0.1)

      brushStrokes[i] = new brushStroke(brushWidth, frayness, fineness, bristleWidth, colour, opacity, margin, originX, originY, startingAngle, directionToMove, distance, pace, rotationPace); 
    }

    angleMode (DEGREES); 

    background (255); 
  }
  
  function draw() {

    for (let i = 0; i<brushStrokes.length; i++){
      brushStrokes[i].display();
      brushStrokes[i].move();
    }
  }