class Sentence {
  constructor(t, x, y) {
    this.t = t;
    this.x = x;
    this.y = y;

    // Adjust density and remove slop
    this.body = Bodies.rectangle(
      this.x, 
      this.y, 
      textWidth(this.t) * 1.82, 
      tSize * 1.2, 
      {
        friction: 1,           // High friction to reduce sliding
        restitution: 0.0005,        // No bouncing
        mass: 0,        // Adjust density to reduce overlap
        inertia: Infinity,     // Prevent rotation
        frictionAir: 0.005      // Slight air resistance to slow down
      }
    );
    Composite.add(engine.world, this.body); 
  }

  display() {
    fill(255);
    textSize(tSize);

    textFont ("Crimson Pro"); 

    push();
    translate(this.body.position.x, this.body.position.y);

    // Debug: Show the bounding box
    fill(255);
    strokeWeight (1); 
    stroke (0); 
    rect(0, 0, textWidth(this.t) * 1.82, tSize * 1.2);

    // Display the text
    fill(0);
    noStroke(); 
    text(this.t, 0, 0);
    pop();
  }
}
