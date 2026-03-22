class Letter{
    constructor(letter, x,y, angle){
        this.l = letter; 
        this.x = x; 
        this.y = y; 

        this.a = angle; 
    }

    display(){
        noStroke(); 

        textSize (tSize); 

        rectMode(CENTER, CENTER); 
        textAlign (CENTER, CENTER); 

        push();
        translate (this.x, this.y); 
        rotate (this.a); 

        fill (255); 
        rect (0,0,textWidth(this.l)*2, tSize*1.5)

        fill (0); 
        text (this.l, 0,0); 
        pop(); 
    }
}
