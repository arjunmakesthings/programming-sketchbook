//mapper redo; january 2025. 

//in this file, i am going to focus on the logic and not worry about styling.

//master node array. everything created or deleted is stored here. 
let nodes = []; 
let states = ["inactive", "active"]; 
let nodeType = ["new", "sub", "alt"]; 

const STATES = Object.freeze({
INACTIVE: "inactive", 
ACTIVE: "active"
}); 

const NODE_TYPE = Object.freeze({
NEW: "new", 
SUB: "sub", 
ALT: "alt"
}); 

function preload(){

}

function setup() {
createCanvas (windowWidth, windowHeight);   

//new object to test
node[0] = new Node (); 

}
function draw() {
background(0);

//run through all nodes and display them.
for (node of nodes){
node.display(); 
}

console.log(NODE_TYPE.NEW); 

}

//this is the key handler. i, unfortunately, have to use the default p5 function to run whenever a key is pressed.
function keyPressed(){

if (key===ENTER){
nodes.push(new Node(findPosition())); 
}

}

class Branch{

}

class Node{
constructor(type){
this.type = type; 

this.pos = findPosition(this.type);  

this.x = this.pos.x; 
this.y = this.pos.y; 

//this.state = state; 
}

}

Node.prototype.display = function(){
rect(this.x, this.y, 50,50); 
}

//function to find a valid position for a node on the canvas.
function findPosition(){
return [width/2, height/2]; 
}