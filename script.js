function preload(){

}
const TILE_WIDTH = 23;
const MAZE_WIDTH = 10;
const MAZE_HEIGHT = 10;

const WALL_COLOR = "#000000";
const PATH_COLOR = "#FFFFFF";
const START_COLOR = "#FF0000";
const END_COLOR = "#00FF00";

const CORN_COLOR = WALL_COLOR;//"#D2B48C";

let maze;
let seed = 0;
function setup(){
    createCanvas(TILE_WIDTH*MAZE_WIDTH*3, TILE_WIDTH*MAZE_HEIGHT*3);
    createButton("reroll").mousePressed(() =>{
                              
        newSeed();
      });
    randomSeed(seed);
    maze = new Maze(MAZE_HEIGHT, MAZE_WIDTH);
    maze.generateMaze();
    console.log(maze);
}

function newSeed(){
    seed++;
    randomSeed(seed);
    maze.resetMaze();
    maze.generateMaze();
}

function draw(){
background(220);
maze.render();

}


