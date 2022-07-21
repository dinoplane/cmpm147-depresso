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
        let tx = width/2 - PLAYER_WIDTH/2; // top left corner for centering
        let ty = height/2 - PLAYER_HEIGHT/2;

        if (keyIsPressed){
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

        image(this.cup1, tx +12, ty - 16);
        image(this.cup2, tx +12, ty - 16);
        image(this.cup3, tx +12, ty - 16);

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