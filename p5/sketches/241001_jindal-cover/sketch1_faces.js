let faceMesh;
let video;
let faces = [];
let faceImages = [];
let options = { maxFaces: 10, refineLandmarks: false, flipHorizontal: false };
let textToPoints = [];
let firstFaceDisplayed = false;
let font;

function preload() {
  faceMesh = ml5.faceMesh(options);
  font = loadFont("Piazzolla_24pt-BoldItalic.ttf");
}

function setup() {
  createCanvas(1920, 1080);
  textToPoints = convertLetterToPoints("Giving Up Control", 200, 200, width - 400, height - 300, 10, 300, font, CENTER, CENTER);
  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  setInterval(() => {
    captureFaces();
  }, 2000);
  background(0);
}

function draw() {
  image(video, 10, 10, 160, 120);
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let minX = min(face.keypoints.map(p => p.x)) * (160 / video.width) + 10;
    let maxX = max(face.keypoints.map(p => p.x)) * (160 / video.width) + 10;
    let minY = min(face.keypoints.map(p => p.y)) * (120 / video.height) + 10;
    let maxY = max(face.keypoints.map(p => p.y)) * (120 / video.height) + 10;
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);
    rect(minX, minY, maxX - minX, maxY - minY);
  }

  if (faces.length > 0 && !firstFaceDisplayed) {
    let face = faces[0];
    let minX = min(face.keypoints.map(p => p.x));
    let maxX = max(face.keypoints.map(p => p.x));
    let minY = min(face.keypoints.map(p => p.y));
    let maxY = max(face.keypoints.map(p => p.y));
    let faceImage = video.get(minX, minY, maxX - minX, maxY - minY);
    for (let point of textToPoints) {
      var n = random(0, 30);
      image(faceImage, point.x, point.y, ((maxX - minX) / 4) + n, ((maxY - minY) / 4) + n);
    }
    firstFaceDisplayed = true;
  }

  for (let img of faceImages) {
    image(img.img, img.x, img.y, img.width, img.height);
  }
}

function gotFaces(results) {
  faces = results;
}

function captureFaces() {
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let minX = min(face.keypoints.map(p => p.x));
    let maxX = max(face.keypoints.map(p => p.x));
    let minY = min(face.keypoints.map(p => p.y));
    let maxY = max(face.keypoints.map(p => p.y));
    let faceImage = video.get(minX, minY, maxX - minX, maxY - minY);
    let randomIndex = floor(random(0, textToPoints.length));
    let randomPos = textToPoints[randomIndex];
    var n = random(0, 30);
    faceImages.push({
      img: faceImage,
      x: randomPos.x,
      y: randomPos.y,
      width: ((maxX - minX) / 4) + n,
      height: ((maxY - minY) / 4) + n
    });
    if (faceImages.length > 50) {
      faceImages.shift();
    }
  }
}
