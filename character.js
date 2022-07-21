const PLAYER_WIDTH = 48;
const PLAYER_HEIGHT = 38;

let idleLeft, idleRight, walkLeft, walkRight, count=2;
class Player{
    constructor(x, y, startCell){
        this.x = x;
        this.y = y;

        this.currentCell = -1;
        walkLeft = loadImage('assets/walkLeft.gif');
        walkRight = loadImage('assets/walkRight.gif');
        idleLeft = loadImage('assets/idleLeft.gif');
        idleRight = loadImage('assets/idleRight.gif');
        this.cups = [];
        this.cups[0] = loadImage('assets/cup1.png');
        this.cups[1] = loadImage('assets/cup2.png');
        this.cups[2] = loadImage('assets/cup3.png');
        this.shuffleCups();
        this.visibleCups = this.cups.length;
    }

    update(state, scale){
        this.draw();
        this.movement(state, scale);

    }

    draw(){

        push();

        let tx = width/2 - PLAYER_WIDTH/2; // top left corner for centering
        let ty = height/2 - PLAYER_HEIGHT/2;

        if (keyIsPressed && keyCode >= 37 && keyCode <= 40){ // Only arrows!
            if (keyIsDown(LEFT_ARROW)) count = 1;
            else if (keyIsDown(RIGHT_ARROW))  count = 2;

            if(count == 1) image(walkLeft, tx, ty);
            else image(walkRight, tx, ty);
        } else {
            if(count == 1)
                image(idleLeft, tx, ty);
            if(count == 2)
                image(idleRight, tx, ty);
        }


        image(this.cups[0], tx +15, ty - this.cups[0].height+9);
        if (this.visibleCups > 1)
            image(this.cups[1], tx +15, ty - this.cups[0].height - this.cups[1].height+9);
        if (this.visibleCups > 2)
            image(this.cups[2], tx +15, ty - this.cups[0].height - this.cups[1].height - this.cups[2].height+9);

        pop();
    }

    movement(state, scale){
        if(keyIsPressed){
            if(keyIsDown(LEFT_ARROW) && !state.touchingLeft){
                this.x -= TILE_WIDTH*0.1 * scale/2;
            } else if(keyIsDown(RIGHT_ARROW) && !state.touchingRight){
                this.x += TILE_WIDTH*0.1 * scale/2;
            }
            if(keyIsDown(UP_ARROW) && !state.touchingTop){
                this.y -= TILE_WIDTH*0.1 * scale/2;
            } else if(keyIsDown(DOWN_ARROW) && !state.touchingBottom){
                this.y += TILE_WIDTH*0.1 * scale/2;
            }
        }
    }

    /*
        Function added by Randy Le
        Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        Uses an edited Fisher-Yates/(Knuth) Shuffle to scramble the coffee cup order
    */
    shuffleCups() {
        let currentIndex = this.cups.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.cups[currentIndex], this.cups[randomIndex]] = [
            this.cups[randomIndex], this.cups[currentIndex]];
        }
    }

    takeCup() {
        this.visibleCups--;
        if (this.visibleCups <= 0) {
            this.visibleCups = this.cups.length;
            this.shuffleCups();
        }
    }
}