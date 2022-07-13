var x = 200;
var y = 200;


class Player{
    constructor(x, y, startCell){
        this.x = x;
        this.y = y;

        this.currentCell = -1;
    }

    update(state){
        this.draw();
        this.movement(state);
    }

    draw(){
        fill("cyan");
        //console.log(this.x, this.y);
        circle(this.x, this.y, 10);
        
    }
    
    movement(state){
        if(keyIsPressed){
            if(keyIsDown(LEFT_ARROW) && !state.touchingLeft){
                this.x--;
            } else if(keyIsDown(RIGHT_ARROW) && !state.touchingRight){
                this.x++;
            }
            if(keyIsDown(UP_ARROW) && !state.touchingTop){
                this.y--;
            } else if(keyIsDown(DOWN_ARROW) && !state.touchingBottom){
                this.y++;
            }
        }
    }
}
