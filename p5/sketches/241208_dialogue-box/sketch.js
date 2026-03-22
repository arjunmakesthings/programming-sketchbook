let blink = true;
let interval;
let showText = true;
let introShow = true;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set an interval to toggle the visibility of the text
  interval = setInterval(() => {
    showText = !showText;
  }, 1000); // Increase the interval duration to 1000 milliseconds (1 second)
}

function draw() {

  if (introShow==true){
  introBox();
  }else{
background (255); 
  }
}

function introBox() {
  background(0);
}

function mouseClicked() {
    introShow=false; 
}
