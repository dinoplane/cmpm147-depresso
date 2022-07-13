function preload(){

}

let maze;
function setup(){
    randomSeed();
    maze = new Maze(5);
    maze.generateMaze();
    console.log(maze);
}

function draw(){
background(220);
}