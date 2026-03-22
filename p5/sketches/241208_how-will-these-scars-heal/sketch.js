//How Will These Scars Heal?; December, 2024. 
//http://127.0.0.1:3000/08Dec_HowWillTheseScarsHeal/index.html

// I'm thinking of Sakina. We've broken up. It hurts. The pain feels insurmountable. 

let scars = []; 

let myText = []; 

function setup() {
createCanvas(1000, 562);

blendMode(SUBTRACT); 

//convertLetterToPoints(string, xPos, yPos, maxWidth = Infinity, maxHeight = Infinity, gridSize = 3, fontSize = 24, font = "Arial", horAlignment = "LEFT", verAlignment = "TOP")
myText = convertLetterToPoints("how will these scars heal", 0, height/2-150, width, height, 5, 145, "Arial", CENTER); 

for (let i = 0; i<myText.length; i++){
scars.push(new Scar(myText[i].x, myText[i].y)); 
}
background (0); 

}

function draw() {
//background(0);

for (let i = 0; i<scars.length; i+=1){
scars[i].display();
scars[i].moving=true; 

/*

if (frameCount % 65 == 0) { // every second
  // Determine a random number of scars to open
  let count = int(random(50, 300)); // e.g., 1 to 5 scars; adjust range as needed
  let selectedIndices = []; // Store indices already selected

  for (let j = 0; j < count; j++) {
    let num;
    do {
      num = int(random(scars.length)); // Random index in scars
    } while (selectedIndices.includes(num)); // Avoid duplicates
    
    selectedIndices.push(num);
    scars[num].moving = true; // Open the scar
  }
  for (let i = 0; i < scars.length; i++) {
    if (!selectedIndices.includes(i)) {
      scars[i].moving = false;
    }
  }
}
*/

}
//noLoop(); 
}


class Scar{
//A scar is essentially two columns of tightly packed vertices, spread randomly / with some noise horizontally.
//Couldn't achieve exactly what I wanted. so now, it's a strip of vertices with a TRIANGLE_FAN construction. 

constructor(initX, initY){
this.initX = initX;
this.initY = initY; 

this.length = random(5,7); 
this.verGap = 1; 
const ampRange = 10; 
this.amplitude = random(0, ampRange); 

var possibleTimes = [60, 100, 180]; 
this.timeKeep = random(possibleTimes); 

this.col = 255; 

this.angle = random(0, TWO_PI); 
this.mover = 0;

this.moving = false; 
}

display(){


push(); 
translate (this.initX, this.initY); 

noFill(); 
noStroke(); 
fill (0); 

rotate (this.angle); 

beginShape(); 

for (let i = 0; i<this.length; i+=this.verGap){
vertex (0, i); 

var pace = noise(frameCount)*0.00005; 

if (this.moving==true){
fill (255, 5); 
this.mover=map(sin(frameCount*0.09), -1,1, 0, this.amplitude); 
}else{
this.mover=-0; 
}
vertex (this.mover, i+noise(i*frameCount*pace)*20); 
}

endShape(); 

pop(); 
}

}

/*

var length = random(50,100); 
const verGap = 5; 

push(); 
translate (width/2, height/2); 

fill (255);
noStroke();  
beginShape(TRIANGLE_FAN); 
for (let i = 0; i<=length; i+=verGap){
const amplitude = 100; 
var variance = (noise(random(0,1)))*amplitude; 
vertex (0+variance, i); 
}

endShape(CLOSE); 
pop() 
*/

