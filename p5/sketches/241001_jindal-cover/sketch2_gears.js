//alt jindal cover sketch; october, 2024. 

let font; 

let tileSize = 10; 
let b = 2; 

function preload() {
  font = loadFont("Piazzolla_24pt-BoldItalic.ttf");
}

function setup(){
  createCanvas(1920, 1080);
  textToPoints = convertLetterToPoints("Giving Up Control", 200, 200, width - 400, height - 300, 10, 300, font, CENTER, CENTER);

  background (0); 

}

function draw(){
  var t = frameCount/60; 
  const amp = 10;

  fill (255); 

  for (let i = 0; i < textToPoints.length; i+=3) {
    push(); 
    translate(textToPoints[i].x, textToPoints[i].y); 
    for (let x = 0; x <= 5; x += 2) {
      for (let y = 0; y <= 10; y += 5) {
        let ang = (t + sin(i + t)) * 0.2;
        rotate(ang);
        let rectWidth = (sin(i + t)) * 3;
        rect(x + sin(y + t) * amp, y, rectWidth, 20);
      }
    }
    pop(); 
  }
}