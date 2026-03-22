//Name

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  }
  
  function draw() {
    background(230);
    fill (0); 
  
    op = 255;
  
    textAlign (LEFT, TOP); 
  
    // Set text to bold for "CALLIBRATION MODE"
   // textFont(boldFont);
    text(
      "CALLIBRATION MODE",
      width / 2 - 250,
      height / 2 ,
      500,
      800
    );
  
    // Set text back to normal for the rest of the content
    //textFont(regFont);
    text(
      "\n" +
      "\n" +
      "Click on each black circle whilst looking at them. Do this till the white circle is following your gaze accurately. " +
      "\n" +
      "\n" +
      "Once you're done, pressing 'c' will exit the callibration mode and begin tracking. Have your screen recorder on and hop onto the webpage to be tested as soon as you press 'c'.",
      width / 2 - 250,
      height / 2 ,
      500,
      800
    );
  
    fill(50);
    ellipse(windowWidth - 100, windowHeight - 700, 40, 40); // Top right
    ellipse(100, windowHeight - 700, 40, 40); // Top left
    ellipse(windowWidth - 100, windowHeight - 100, 40, 40); // Bottom right
    ellipse(100, windowHeight - 100, 40, 40); // Bottom left
    ellipse(windowWidth / 2, windowHeight - 700, 40, 40); // Center top
    ellipse(windowWidth / 2, windowHeight - 100, 40, 40); // Center bottom
    //ellipse(windowWidth / 2, windowHeight / 2, 40, 40); // Center
}