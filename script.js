function preload(){

}
const TILE_WIDTH = 33;
const CELL_WIDTH = TILE_WIDTH * 3;
const MAZE_WIDTH = 5;
const MAZE_HEIGHT = 5;

const WALL_COLOR = "#000000";
const PATH_COLOR = "#FFFFFF";
const START_COLOR = "#FF0000";
const END_COLOR = "#00FF00";

const CORN_COLOR = WALL_COLOR;//"#D2B48C";

let maze;
let seed = 0;
let player;
function setup(){
    createCanvas(TILE_WIDTH*3*3, TILE_WIDTH*3*3);
    createButton("reroll").mousePressed(() =>{
                              
        newSeed();
      });
    randomSeed(seed);
    //player = new Player(0,0);
    maze = new Maze(MAZE_HEIGHT, MAZE_WIDTH, 4);
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
    maze.update();
    
}


