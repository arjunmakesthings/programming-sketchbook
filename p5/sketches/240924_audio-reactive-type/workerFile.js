function findPosition(){
var xPos = Math.round(Math.random(20, 40));
var yPos = Math.round(Math.random(20, 40)); 

return [xPos, yPos]; 
}

let position = findPosition(); 

console.log(position[0], position[1]); 
