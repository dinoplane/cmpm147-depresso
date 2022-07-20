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
        this.cup1 = loadImage('assets/cup1.png');
        this.cup2 = loadImage('assets/cup2.png');
        this.cup3 = loadImage('assets/cup3.png');
    }

    update(state, scale){
        this.draw();
        this.movement(state, scale);

    }

    draw(){
        push();

        if(keyIsPressed && keyIsDown(LEFT_ARROW)){
            image(walkLeft, width/2, height/2);
            image(this.cup1, width/2 +12, height/2 - 16);
            image(this.cup2, width/2 +12, height/2 - 16);
            image(this.cup3, width/2 +12, height/2 - 16);
            count = 1;
        }
        else if(keyIsPressed && keyIsDown(RIGHT_ARROW)){
            image(walkRight, width/2, height/2);
            image(this.cup1, width/2 +12, height/2 - 16);
            image(this.cup2, width/2 +12, height/2 - 16);
            image(this.cup3, width/2 +12, height/2 - 16);
            count = 2;
        }
        else if(keyIsPressed && keyIsDown(DOWN_ARROW)){
            if(count == 1) {
                image(walkLeft, width/2, height/2);
                image(this.cup1, width/2 +12, height/2 - 16);
                image(this.cup2, width/2 +12, height/2 - 16);
                image(this.cup3, width/2 +12, height/2 - 16);
            }
            else {
                image(walkRight, width/2, height/2);
                image(this.cup1, width/2 +12, height/2 - 16);
                image(this.cup2, width/2 +12, height/2 - 16);
                image(this.cup3, width/2 +12, height/2 - 16);
            }
        }
        else if(keyIsPressed && keyIsDown(UP_ARROW)){
            if(count == 1) {
                image(walkLeft, width/2, height/2);
                image(this.cup1, width/2 +12, height/2 - 16);
                image(this.cup2, width/2 +12, height/2 - 16);
                image(this.cup3, width/2 +12, height/2 - 16);
            }
            else {
                image(walkRight, width/2, height/2);
                image(this.cup1, width/2 +12, height/2 - 16);
                image(this.cup2, width/2 +12, height/2 - 16);
                image(this.cup3, width/2 +12, height/2 - 16);
            }
        }
        else{
            if(count == 1) {
                image(idleLeft, width/2, height/2);
                image(this.cup1, width/2 +12, height/2 - 16);
                image(this.cup2, width/2 +12, height/2 - 16);
                image(this.cup3, width/2 +12, height/2 - 16);
            }
            if(count == 2) {
                image(idleRight, width/2, height/2);
                image(this.cup1, width/2 +12, height/2 - 16);
                image(this.cup2, width/2 +12, height/2 - 16);
                image(this.cup3, width/2 +12, height/2 - 16);
            }
        }

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
}