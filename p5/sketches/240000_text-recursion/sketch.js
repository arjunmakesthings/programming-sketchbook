//textRecursion Trial 1, May 2024.

let message = "i'm so messed up";

let angle = 1;

function setup() {
  createCanvas(800, 800);

  //textAlign(CENTER, CENTER);
  fill(0);
  textSize(24);
  angleMode(DEGREES);
}

function draw() {
  background(255);
  for (let x = 50; x <= width; x += 200) {
    for (let y = 0; y < height-90; y += 50) {
      for (let i = 0; i < message.length; i++) {
        push(); 
        translate (x + i * 9, 400+sin(y)*(i*100)); 
        rotate(sin(i*angle)*200);
        text(message[i], 0,0 );
        angle+=0.0003; 
        pop(); 
      }
    }
  }
}
