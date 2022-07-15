class Player{
    constructor(x, y, startCell){
        this.x = x;
        this.y = y;

        this.currentCell = -1;
    }

    update(state, scale){
        this.draw();
        this.movement(state, scale);
    }

    draw(){
        push();
        fill("cyan");
        
        circle(width/2, height/2, 10);
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