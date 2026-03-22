class Brush {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.s = 0;

        this.minSize = 1;
        this.maxSize = 20; 

        this.newX = x;
        this.newY = y;

        this.interval = random([120, 180, 240, 300, 360]);

        this.c = color(
            random(["#ecf39e", "#90a955", "#4f772d", "#31572c", "#132a13"])
        );

        this.col = random(10, 200);
        this.c.setAlpha(5); 

        //this.c.setAlpha(100); 

        var n = int(random(tiles.length));

        this.newX = tiles[n].x;
        this.newY = tiles[n].y;

        //this.easing = 0.0005;
        this.easing = 0.05;

        this.noiseOffsetX = random(10);
        this.noiseOffsetY = random(10);

        this.some = random(0.08, 0.05); 
    }

    display() {
        noStroke();

        //stroke (0); 
        //strokeWeight (0.5)

        fill (this.c); 
        square(this.x, this.y, this.s);
        //ellipse(this.x, this.y, this.s);

        this.s = map(noise(frameCount*this.some), 0, 1, this.minSize, this.maxSize); 

       this.col = map(noise(frameCount*this.some), 0, 1, 10, 220); 
    }


    move() {
        let dx = this.newX - this.x;
        let dy = this.newY - this.y;

        this.x += dx * this.easing;
        this.y += dy * this.easing;

        if (abs(dx) < 1 && abs(dy) < 1) {
            var n = int(random(tiles.length));
            this.newX = tiles[n].x;
            this.newY = tiles[n].y;
        }
    }
}
