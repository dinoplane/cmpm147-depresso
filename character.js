var x = 200;
var y = 200;

function draw(){
    if(keyIsPressed){
        if(keyCode == LEFT_ARROW){
            x--;
        } else if(keyCode == RIGHT_ARROW){
            x++;
        }
        else if(keyCode == RIGHT_ARROW){
            x++;
        }

    }
    circle(x, y, 100);
}