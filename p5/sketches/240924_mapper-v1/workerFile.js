function setup() {
    createCanvas(400, 400);
  
    background(200);
  
    // Set the coordinates.
    let x1 = 12;
    let y1 = 60;
    let x2 = 90;
    let y2 = 50;
  
    // Draw the points and a line connecting them.
    line(x1, y1, x2, y2);
    strokeWeight(5);
    point(x1, y1);
    point(x2, y2);
  
    // Calculate the distance.
    let d = dist(x1, y1, x2, y2);
  
    // Style the text.
    textAlign(CENTER);
    textSize(16);
  
    // Display the distance.
    text(nfc(d, 1), 43, 40);

    console.log(d); 
  }