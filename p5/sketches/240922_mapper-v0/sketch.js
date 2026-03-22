// Mapper v0; 22 September - ? 2024. 

//testing link – http://127.0.0.1:3000/22Sept_Mapper/index.html

let nodes = []; 
let margin = 100; 

var fontSize = 16; 

function setup(){
createCanvas (windowWidth, windowHeight); 
rectMode (CENTER); 
textAlign(CENTER); 
}

function draw(){
background (0); 

for (let i = 0; i<nodes.length; i++){
nodes[i].display();
}

}

function keyReleased(){
if (keyCode === ENTER){
nodes.push(new Node (0)); 
}
else if(keyCode === 191&&nodes.length>0){ // '/' to create a new sub-branch
nodes.push(new Node (1));
}
else if(keyCode === 188 &&nodes.length>0){ // ',' to create a new alt branch
nodes.push(new Node(2)); 
}
else if (keyCode !== ENTER && keyCode !== BACKSPACE && nodes.length > 0 && keyCode!==188){
//Input for most recent    
var recent = nodes.length-1; 
nodes[recent].txt+=key; 
}
}


function findPosition(){    
    if (nodes.length>0){
    for (let i = 0; i<nodes.length; i++){
        var xPos = random(margin, width-margin); 
        var yPos = random(margin, height-margin); 

        var distance = dist(xPos, yPos, nodes[i].x, nodes[i].y)

        if (distance<100){
            xPos = random(margin, width-margin); 
            yPos = random(margin, height-margin); 
        }else{
            return [xPos, yPos]; 
        }
    }
}else{
    var xPos = random(margin, width-margin); 
    var yPos = random(margin, height-margin); 
    return [xPos, yPos]; 
}
}

function generateSubBranchPosition(){
    //get the most recent new node. 
    var recent = nodes.length-1; 
    var fatherX = nodes[recent].x;
    var fatherY = nodes[recent].y; 

    var xPos = fatherX;
    var yPos = fatherY+nodes[recent].h+30; 

    return [xPos, yPos, fatherX, fatherY+(nodes[recent].h/2)]; 
}

function generateAltBranchPosition(){
    //get the most recent sub-branch
    var recent = nodes.length-1; 

    while (nodes[recent].type != 1) {
        recent--; 
    }

    var xPos = nodes[recent].x+(nodes[recent].w*2); 
    var yPos = nodes[recent].y; 

    return [xPos, yPos]; 

}


/* find pos 2
function findPosition2() {
    let xPos, yPos;
    let isValid = false;

    while (!isValid) {
        xPos = random(margin, width - margin);
        yPos = random(margin, height - margin);
        isValid = true;  // Assume it's valid until proven otherwise

        // Check against existing nodes for overlap or proximity
        for (let i = 0; i < nodes.length; i++) {
            let existingNode = nodes[i];

            // Check if the distance between nodes is too small (you can adjust the threshold)
            let distance = dist(xPos, yPos, existingNode.x, existingNode.y);
            if (distance < 60) {
                isValid = false;  // Not valid, need to regenerate positions
                break;
            }
        }
    }

    return [xPos, yPos];  // Return valid position
}
    */


class Node{
constructor(type){
this.type = type; //0 is for new node, while connectors are 1.    

if (this.type == 0){
this.pos = findPosition(); 
}else if (this.type==1){
this.pos = generateSubBranchPosition(); 
}else if(this.type==2){
this.pos = generateAltBranchPosition(); 
}
this.x = this.pos[0]; 
this.y = this.pos[1]; 

this.txt = ""; 

this.w = 30; 
this.h = fontSize*2; 

this.activeState = false; //boolean for inactive / active. 
}

display(){

 //connectors
if (this.type==1){
    stroke (255);
    strokeWeight (1); 
    line (this.pos[2], this.pos[3], this.x, this.y); 
}

//box
fill(0); 
stroke (255); 

this.w = textWidth(this.txt)*2; 
rect (this.x, this.y, this.w, this.h); 

//text
fill (255); 
noStroke(); 
textSize(fontSize); 
text (this.txt, this.x, this.y+(fontSize/4)); 
}

}

/*
Write this later. 
function windowResized(){
 //supposed to draw a clear() to clear whatever is drawn on the canvas.   
setup(); 
}
*/