const CELL_SIZE = 10;
const RULE_NUMBER = 11;

let cols;
let rows;
let grid = [];
let rule = [];

function setup() {
  createCanvas(800, 800);

  cols = floor(width / CELL_SIZE);
  rows = floor(height / CELL_SIZE);

  rule = makeRule(RULE_NUMBER);

  // first generation
  grid.push(new Array(cols).fill(0));
  grid[0][floor(cols / 2)] = 1;

  noLoop();
  generate();
}

function draw() {
  background(255);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x]) {
        fill(0);
      } else {
        fill(255);
      }

      noStroke();
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generate() {
  while (grid.length < rows) {
    let prev = grid[grid.length - 1];
    let next = new Array(cols).fill(0);

    for (let i = 1; i < cols - 1; i++) {
      let left = prev[i - 1];
      let center = prev[i];
      let right = prev[i + 1];

      let index = (left << 2) | (center << 1) | right;

      next[i] = rule[index];
    }

    grid.push(next);
  }
}

function makeRule(n) {
  let r = [];

  for (let i = 0; i < 8; i++) {
    r[i] = (n >> i) & 1;
  }

  return r;
}
