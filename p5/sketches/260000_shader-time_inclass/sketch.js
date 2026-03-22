//unnamed; month, year. 

let shaper = 0; 
let inc = false;

function setup() {
createCanvas(1000, 562, WEBGL); //in 16:9 aspect ratio. 
}

function draw() {
background(0);

push();
translate (mouseX-width/2, mouseY-height/2); 

    push(); 
    translate (0,0); 

    if (shaper == 0){
    box(20, 20);
    }
    else if (shaper == 1) {
        sphere (20,20); 
    }
    else if (shaper == 2){
        torus (20,20); 
    }
    pop(); 

pop(); 
}

function mousePressed(){
    shaper++;

    if (shaper > 2){
        shaper = 0; 
    }
}