//unnamed; month, year.

let sqs = [];

let changed_node = 0;
let target_node = 0;

function setup() {
  // createCanvas(1000, 562); //in 16:9 aspect ratio.

  createCanvas(800, 800); //square.

  let w = 200;

  for (let y = w; y <= height - w; y += w) {
    for (let x = w; x <= width - w; x += w) {
      sqs.push(new SQ(x, y, w));
    }
  }
  
}

function draw() {
    background(0);
  if (frameCount % 60 == 0) {
    //select one node, and move it to one of the others.
    changed_node = floor(random(4));

    let choices = [0, 1, 2, 3];
    choices.splice(changed_node, 1);

    target_node = random(choices);
  }

  for (let sq of sqs) {
    sq.display("filled");
    sq.move();
  }
}

class SQ {
  constructor(x, y, w) {
    //takes the center point; calculates corner coordinates based on that.

    //4 points. lt, rt, rb, lb.
    this.ltx = x - w / 2;
    this.lty = y - w / 2;

    this.rtx = x + w / 2;
    this.rty = y - w / 2;

    this.rbx = x + w / 2;
    this.rby = y + w / 2;

    this.lbx = x - w / 2;
    this.lby = y + w / 2;

    this.new_x = this.ltx;
    this.new_y = this.lty;

    this.lerp_amt = 0.07;

    this.alpha=10; 
  }

  display(mode) {
    if (mode === "points") {
      stroke(255);
      strokeWeight(5);

      point(this.ltx, this.lty);
      point(this.rtx, this.rty);
      point(this.rbx, this.rby);
      point(this.lbx, this.lby);
    } else if (mode === "filled") {
        stroke (255, 100); 
        strokeWeight (0.5); 
        fill (255); 
      beginShape();
      vertex(this.ltx, this.lty);
      vertex(this.rtx, this.rty);
      vertex(this.rbx, this.rby);
      vertex(this.lbx, this.lby);
      endShape(CLOSE);
    }

    this.alpha-=5; 
  }

  move() {
    if (changed_node == 0) {
      //top left:

      let tx, ty;

      if (target_node == 1) {
        tx = this.rtx;
        ty = this.rty;
      } else if (target_node == 2) {
        tx = this.rbx;
        ty = this.rby;
      } else {
        tx = this.lbx;
        ty = this.lby;
      }

      this.ltx = lerp(this.ltx, tx, this.lerp_amt);
      this.lty = lerp(this.lty, ty, this.lerp_amt);
    } else if (changed_node == 1) {
      //top right:

      let tx, ty;

      if (target_node == 0) {
        tx = this.ltx;
        ty = this.lty;
      } else if (target_node == 2) {
        tx = this.rbx;
        ty = this.rby;
      } else {
        tx = this.lbx;
        ty = this.lby;
      }

      this.rtx = lerp(this.rtx, tx, this.lerp_amt);
      this.rty = lerp(this.rty, ty, this.lerp_amt);
    } else if (changed_node == 2) {
      //bottom right:

      let tx, ty;

      if (target_node == 0) {
        tx = this.ltx;
        ty = this.lty;
      } else if (target_node == 1) {
        tx = this.rtx;
        ty = this.rty;
      } else {
        tx = this.lbx;
        ty = this.lby;
      }

      this.rbx = lerp(this.rbx, tx, this.lerp_amt);
      this.rby = lerp(this.rby, ty, this.lerp_amt);
    } else if (changed_node == 3) {
      //bottom left:

      let tx, ty;

      if (target_node == 0) {
        tx = this.ltx;
        ty = this.lty;
      } else if (target_node == 1) {
        tx = this.rtx;
        ty = this.rty;
      } else {
        tx = this.rbx;
        ty = this.rby;
      }

      this.lbx = lerp(this.lbx, tx, this.lerp_amt);
      this.lby = lerp(this.lby, ty, this.lerp_amt);
    }
  }
}
