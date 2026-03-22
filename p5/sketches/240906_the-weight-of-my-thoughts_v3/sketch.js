//visual journal v3; September 2024. 

let str = ""; 

let words = []; 

let initX = 0; 
let intiY = 100; 
let charWidth; 

let tSize = 24;


function setup(){
createCanvas (windowWidth, windowHeight); 

setFontCharacteristics(); 
}

function setFontCharacteristics(){
  textFont ("Victor Mono"); 
  textSize (tSize); 

  charWidth = textWidth('X'); 
}

function draw(){
  background (0); 

  for (let i = 0; i<words.length; i++){
    words[i].display(); 
  }

}

function keyPressed(){
  if (key === ' '){
    words.push(new Word(str, initX)); 

    //resets
    initX += (str.length*charWidth)+(charWidth*1.2); 
    str = ""; 
  }else{
    str+=key; 
  }
}

class Word{
  constructor(written, x){
  this.t = written; 
  
  this.x = x;  
  this.y = height/2; 
  }
  
  display(){
  fill (255); 
  noStroke(); 
  text (this.t, this.x, this.y); 

  //debug
  rectMode (LEFT, TOP); 
  noFill(); 
  stroke (255); 
  rect (this.x, this.y-tSize, textWidth (this.t), tSize); 
  }
  }