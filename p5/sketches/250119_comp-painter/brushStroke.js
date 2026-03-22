class brushStroke{
    constructor(brushWidth, frayness, fineness, bristleWidth, colour, opacity, margin, originX, originY, startingAngle, directionToMove, distance, pace, rotationPace){

      //brush selection
      this.brushWidth = brushWidth;
      this.frayness = frayness; 
      this.fineness = fineness; 
      this.bristleWidth = bristleWidth; 

      //colour
      this.colour = color(colour); 
      this.opacity = opacity; 

      //starting position
      this.margin = margin; 
      this.originX = originX; 
      this.originY = originY; 
      this.startingAngle = startingAngle;

      //travel
      this.directionToMove = directionToMove; 
      this.distance = distance; 
      this.pace = pace; 
      this.rotationPace = rotationPace; 

      //these are variables to store vertex values.
      this.vx=0; 
      this.vy=0;  
      this.vx2 = 0; 

      //this is a trigger to keep track of whether margins have been violated. 
      this.permissionToMove = true; 
      this.d=0; 

    }

    display(){
      strokeWeight (this.bristleWidth); 
      stroke (this.colour, this.opacity);

      push(); 
      beginShape(POINTS); 
      for (let x = this.originX; x<this.originX+this.brushWidth; x+=this.bristleWidth){

        this.vx=(x-this.originX)+this.vx2; 
        this.vy+=random(-this.frayness, this.frayness); 

        vertex (this.vx, this.vy);
      }
      translate (this.originX, this.originY); //this is to reset to origin so that rotation is relative to origin (0,0) of the stroke. 
      rotate (this.startingAngle+=this.rotationPace); 
      endShape(); 
      pop(); 
    }

    move(){

      if (this.directionToMove==1){
        //go above

        this.vy-=this.pace; 
      }
      else if (this.directionToMove==2){
        //go right

        this.vx2+=this.pace; 
      }      
      else if (this.directionToMove==3){
        //go down

        this.vy+=this.pace; 
      }
      else if (this.directionToMove==4){
        //go left

        this.vx2-=this.pace;  
      }
    }
}
    

