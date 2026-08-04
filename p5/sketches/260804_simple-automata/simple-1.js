/*
simple automata.

think of a row being a series of 0 & 1s.

[0,1,0,1 ... n].
*/

let rows = [];

const cell_size = 10;
const n = Math.floor(100 / cell_size);

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

let initial_conditions = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];

function setup() {
  createCanvas(100, 100);
  noStroke();

  make_first_row(initial_conditions);

  while (rows.length < n) {
    make_row();
  }

  noLoop();
}

function draw() {
  background(255);

  for (let y = 0; y < rows.length; y++) {
    show_row(rows[y], y);
  }
}

function make_first_row(vals) {
  rows.push([...vals]);
}

function make_row() {
  const last = rows[rows.length - 1];
  const next = [];

  for (let i = 0; i < last.length; i++) {
    // treat outside cells as white (0)
    const left = i > 0 ? last[i - 1] : 0;
    const center = last[i];
    const right = i < last.length - 1 ? last[i + 1] : 0;

    // convert three bits into an integer from 0–7
    const neighborhood = (left << 2) | (center << 1) | right;

    next.push(rule[neighborhood]);
  }

  rows.push(next);
}

function show_row(row, y) {
  for (let x = 0; x < row.length; x++) {
    fill(row[x] ? 0 : 255);
    square(x * cell_size, y * cell_size, cell_size);
  }
}
