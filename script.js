function preload(){

}
const TILE_WIDTH = 43;
const MAZE_WIDTH = 5;
const MAZE_HEIGHT = 5;

const WALL_COLOR = "#000000";
const PATH_COLOR = "#FFFFFF";
const CORN_COLOR = "#D2B48C";

let maze;
function setup(){
    createCanvas(TILE_WIDTH*MAZE_WIDTH*3, TILE_WIDTH*MAZE_HEIGHT*3);
    randomSeed();
    maze = new Maze(5);
    maze.generateMaze();
    console.log(maze);
}

function draw(){
background(220);
maze.render();

}