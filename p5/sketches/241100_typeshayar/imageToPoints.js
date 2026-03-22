function makePointsFromImage(gridSize){

    let points = []; 

    push(); 

    image (img, 0, 0, 1920, 1080); 

    loadPixels();
    for (let y = 0; y < height; y += gridSize) {
      for (let x = 0; x < width; x += gridSize) {
        let px = get(x, y);
        let r = px[0];
        if (r < 200) {
          points.push(createVector(x, y));
        }
      }
    }
    pop();
  
    return points; // Return an array of points

  }