var x = 200;
var y = 200;

function draw(){
    circle(x, y, 100);
    
    if(keyIsPressed){
        if(keyCode == LEFT_ARROW){
            x--;
        } else if(keyCode == RIGHT_ARROW){
            x++;
        } 
        if(keyCode == UP_ARROW){
            y--;
        } else if(keyCode == DOWN_ARROW){
            y++;
        }
    }
}