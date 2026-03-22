let notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']; // Array of notes
let osc;

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator(); // Create a new oscillator
  osc.setType('sine'); // Set the type of oscillator
  osc.amp(0); // Set the initial volume to zero
}

function draw() {
  background(220);
}

function mouseClicked() {
  playRandomNote();
}

function playRandomNote() {
  let randomIndex = floor(random(notes.length)); // Pick a random index from the notes array
  let randomNote = notes[randomIndex]; // Get the random note
  let freq = noteToFreq(randomNote); // Convert the note to frequency
  osc.freq(freq); // Set the frequency of the oscillator
  osc.start(); // Start the oscillator
  osc.amp(0.5); // Set the volume
  setTimeout(stopSound, 500); // Stop the sound after 0.5 seconds
}

function stopSound() {
  osc.stop(); // Stop the oscillator
}

function noteToFreq(note) {
  // Mapping of note names to frequencies
  let noteMap = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88
  };
  return noteMap[note];
}
