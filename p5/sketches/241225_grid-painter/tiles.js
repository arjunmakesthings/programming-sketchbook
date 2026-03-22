class Tile{
    constructor(x, y, s){
      this.x = x; 
      this.y = y; 
      this.s = s;
      this.c = 0; 
    }
     
     display(){
       //fill (this.c);
       
       noFill();
       strokeWeight (0.5);
       stroke (100);
       
       rect (this.x, this.y, this.s, this.s);
     }
    
   }