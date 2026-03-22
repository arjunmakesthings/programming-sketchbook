function setup(){
createCanvas (1000,1000); 
angleMode (DEGREES); 
background (190); 
}

function draw(){

strokeWeight (0.5); 
stroke (0);
noStroke(); 
  
push(); 
translate (width/2, height/2); 
beginShape(); 
fill (0);
for (let a = 0; a<=360; a++){
const r = 300; 
var x = r*sin(a); 
var y = r *cos(a); 
vertex (x,y);
}
endShape(); 

pop(); 
noLoop(); 
}