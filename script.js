function preload(){

}

let maze;
function setup(){
    randomSeed();
    maze = new Maze(10);
    maze.removeWall(1, 3);
    console.log(maze);
}

function draw(){
background(220);
}