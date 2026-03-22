class Letter{
    constructor(letter, x,y, angle){
        this.l = letter; 
        this.x = x; 
        this.y = y; 

        this.a = angle; 
    }

    display(){
        fill (255); 
        noStroke(); 

        textSize (24); 

        push();
        translate (this.x, this.y); 

        rotate (this.a); 
        text (this.l, 0,0); 
        pop(); 
    }
}
