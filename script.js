const TILE_WIDTH = 33;
const CELL_WIDTH = TILE_WIDTH * 3;
const MAZE_WIDTH = 5;
const MAZE_HEIGHT = 5;

const WALL_COLOR = "#000000";
const PATH_COLOR = "#FFFFFF";
const START_COLOR = "#FF0000";
const END_COLOR = "#00FF00";

const CORN_COLOR = WALL_COLOR;//"#D2B48C";

const INT_BITS = 4;
const POSITIONS =   [
                        [            0,      TILE_WIDTH],
                        [   TILE_WIDTH,               0],
                        [ 2*TILE_WIDTH,      TILE_WIDTH],
                        [   TILE_WIDTH,    2*TILE_WIDTH]
                    ];

let song;
let maze;
let seed = 0;
let player;
const CAMERA_SCALE = 4;

let tiles = Array(12);
function preload(){
    //song = loadSound("assets/song.mp3");

    for (let i = 0; i < 12; i++){

        tiles[i] = loadImage(`./assets/${i}.png`);
    }
}

function setup(){
    createCanvas(TILE_WIDTH*MAZE_WIDTH*3, TILE_WIDTH*MAZE_HEIGHT*3);
    createButton("reroll (debug)").mousePressed(() =>{

        newSeed();
      });
    //song.play();
    randomSeed(seed);
    //player = new Player(0,0);

    for (let i = 0; i < 12; i++){

        //console.log(tiles[i].width)
        tiles[i].resize(tiles[i].width*CAMERA_SCALE, 0);
       // console.log(tiles[i].width)
    }

    maze = new Maze(MAZE_HEIGHT, MAZE_WIDTH, CAMERA_SCALE);

    maze.generateMaze();
    console.log(maze);

    updateBox();
}

function newSeed(){
    seed++;
    randomSeed(seed);
    maze.resetMaze();
    maze.generateMaze();
    updateBox();
}

function draw(){
    background("#2C4941");
    if (maze.update())
        newSeed();

}

function updateBox() {
    //console.log(select('#box').elt.innerText)
    let uniform = maze.getGoalStudent().attire;
    let starter = "Deliver the coffee to the student with the "
    let i = 0;
    for(; i < articleNames.length - 1; i++){

        starter += `${uniform[articleNames[i]]} ${articleNames[i]}, `;
    }
    starter += `and ${uniform[articleNames[i]]} ${articleNames[i]}.`;

    select('#box').elt.innerText = starter;
}
