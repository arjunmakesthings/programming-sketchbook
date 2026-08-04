/*
to show representations of elementary cellular automata:
*/

const cell_size = 10;
const margin = 50;

let cols;
let total_rows;
let rows = [];

// define rule:
const rule = {
  0b111: 1,
  0b110: 0,
  0b101: 1,
  0b100: 0,
  0b011: 0,
  0b010: 1,
  0b001: 0,
  0b000: 1,
};

function setup() {
  createCanvas(800, 800);

  strokeWeight(1);
  stroke(0);
  textAlign(CENTER, CENTER);

  cols = floor((width - margin * 2) / cell_size);
  total_rows = floor((height - margin * 2) / cell_size);

  make_first_row();

  while (rows.length < total_rows) {
    make_row();
  }

  noLoop();
}

function draw() {
  background(255);

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < cols; x++) {
      show_cell(rows[y][x], x, y);
    }
  }
}

function make_first_row() {
  const row = [];

  // alternating initial condition
  for (let i = 0; i < cols; i++) {
    row.push(i % 2);
  }

  rows.push(row);
}

function make_row() {
  const last = rows[rows.length - 1];
  const next = [];

  for (let i = 0; i < cols; i++) {
    const left = i > 0 ? last[i - 1] : 0;
    const center = last[i];
    const right = i < cols - 1 ? last[i + 1] : 0;

    const neighborhood = (left << 2) | (center << 1) | right;

    next.push(rule[neighborhood]);
  }

  rows.push(next);
}

function show_cell(state, x, y) {
  const px = margin + x * cell_size;
  const py = margin + y * cell_size;

  if (state) {
    draw_one(px, py);
  } else {
    draw_zero(px, py);
  }
}

function draw_zero(x, y) {
  noStroke(); 
  textSize(8); 
  text("hi", x, y);
}

function draw_one(x, y) {
  noStroke(); 
  textSize(8); 
  text("bye", x, y);
}

function mousePressed() {
  saveCanvas("frame", "webp");
}
