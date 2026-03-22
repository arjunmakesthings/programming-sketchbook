// Mapper v1; 24 September, 2024. 

//testing link – http://127.0.0.1:3000/24Sept_Mapper-v1/index.html

let nodes = []; 
let margin = 300; 

let font; 
var fontSize = 16; 

function preload(){
font = loadFont ('JetBrainsMono-Light.ttf'); 
}

function setup(){
createCanvas (windowWidth, windowHeight); 
rectMode (CENTER); 
textAlign(CENTER); 
textFont (font); 
}

function draw(){
background (0); 

for (let i = 0; i<nodes.length; i++){
nodes[i].display();
nodes[i].sizeCalculation();
}
}

function ui(){

}

function keyPressed(){
if (keyCode === ENTER){
nodes.push(new Node (0)); //create a new node.
}
else if(keyCode === 191&&nodes.length>0&&key!== '?'){
nodes.push(new Node (1)); //'/' to create a sub-branch. 
}
else if(keyCode === 188 &&nodes.length>0){ 
nodes.push(new Node(2)); //',' to create an alt branch.
}
else if (keyCode !== ENTER && keyCode !== BACKSPACE && nodes.length > 0 && keyCode!==188 &&keyCode !== SHIFT | key == '?'){
//Input for most recent    
var recent = nodes.length-1; 
nodes[recent].txt+=key; //change text of most recent. 
}
}

function findPosition(type){
    var type = type; 

    if (nodes.length>0){
        //this means that previous nodes have been created before. 

        //get the last made node and coordinates. 
        var recent = nodes.length-1; 
        var recentX = nodes[recent].x; 
        var recentY = nodes[recent].y; 

        if (type == 0){
            //declare variables that are needed
            var xPos, yPos, d;
            let validPosition = false;

            // generate new position and check for overlap
            while (!validPosition) {
                xPos = random(margin, width - margin);
                yPos = random(margin, height - margin);
                validPosition = true; // assume it's true until proven otherwise

                // check distance of new position against all other nodes
                for (let i = 0; i < nodes.length; i++){
                    d = dist(nodes[i].x, nodes[i].y, xPos, yPos);
                    if (d < nodes[i].w+10) {
                        validPosition = false; // overlap detected, regenerate
                        break;
                    }
                }
            }
            return [xPos, yPos]; 
        }
    else if (type==1){
        //this means that this is a sub-branch.

        var xPos = recentX; 
        var yPos = (recentY+nodes[recent].h)+30;

        return [xPos, yPos, recentX, recentY]; 

    }

    else if(type==2){
        //this means that this is an alt branch. 

        var xPos = (recentX+nodes[recent].w)+30; 
        var yPos = recentY; 

        //here, we also need the last main node from which this alt branch is going. 

        let i = nodes.length-1; 

        while(i>=0){
            if (nodes[i].type === 0){
            //previous node was a new node, so return that
                return [xPos, yPos, nodes[i].x, nodes[i].y]; 
            } else if (nodes[i].type===1 && nodes[i-1].type===0){
              //previous node was a sub-branch, but the node before was new. so return the new node.
              return [xPos, yPos, nodes[i-1].x, nodes[i-1].y];
            } else if(nodes[i].type===1 && nodes[i-1].type===1){
                //previous two nodes were sub-branches. return the previous sub-branch. 
                return [xPos, yPos, nodes[i-1].x, nodes[i-1].y];
            }else if(nodes[i-1].type===2 && nodes[i].type===1){
                //previous node was a sub-branch, but the one before was an alt branch. exception case. 
                return [xPos, yPos, nodes[i-1].x, nodes[i-1].y];
            }
            i--; 
        }
    }
}
    else{
    //this is the first node in the program. make this in the center of the canvas. 
    let xPos = width/2; 
    let yPos = height/2; 
    return [xPos, yPos]; 
}
}

class Node{
constructor(type){
this.type = type; //0 is a new node, 1 is a sub-branch and 2 is an alt-branch. 

this.pos = findPosition(this.type); 

this.x = this.pos[0]; 
this.y = this.pos[1]; 

this.txt = ""; 

this.w = 100; 
this.h = fontSize*2; 

this.activeState = false; //boolean for inactive / active. 
}

display(){

 //connector for sub-branch
if (this.type==1 || this.type ==2){
    push(); 
    stroke (255);
    strokeWeight (1); 
    line (this.pos[2], this.pos[3]+(this.h/2), this.x, this.y); 
    pop(); 
}

//box
fill(0); 
stroke (255); 

rect (this.x, this.y, this.w, this.h); 

//text
fill (255); 
noStroke(); 
textSize(fontSize); 
text (this.txt, this.x, this.y+(fontSize/4)); 
}

sizeCalculation(){
if (textWidth(this.txt)>=(this.w*0.9)){
    this.w=textWidth(this.txt)+(textWidth(this.txt)*0.3); 
}
}

}
