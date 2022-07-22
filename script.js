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

const CHIP_POS =   [ // tl coords, width, and height
    [            0,      0, TILE_WIDTH - 3, TILE_WIDTH],
    [            0,      0, TILE_WIDTH, 2*TILE_WIDTH/3 - 2],
    [            3,      0, TILE_WIDTH - 3, TILE_WIDTH],
    [            0,      3, TILE_WIDTH, TILE_WIDTH-3],
    [            0,      0, TILE_WIDTH, TILE_WIDTH],
    [            1.5,      1.5, TILE_WIDTH-3, TILE_WIDTH-3],
    [            1.5,      0, TILE_WIDTH-1.5, 2*TILE_WIDTH/3 -2]
];

const CORN_POS =   [
    [            0,      0, TILE_WIDTH - 3, TILE_WIDTH],
    [            0,      0, TILE_WIDTH, 2*TILE_WIDTH/3 - 2]

];



let song;
let maze;
let seed = 0;
let player;
const CAMERA_SCALE = 2;

let tiles = Array(12);
let ground = Array(2);
function preload(){
    song = loadSound("assets/bgMusic.mp3");
    song.setVolume(0.2);
    song.setLoop(true);

    for (let i = 0; i < 12; i++){
        let fn = String(i).padStart(2, '0');
        tiles[i] = loadImage(`./assets/${fn}.png`);
    }
    for (let i = 0; i < 2; i++){

        ground[i] = loadImage(`./assets/ground${i}.png`);
    }
}

function setup(){
    createCanvas(400, 400);
    // createButton("new path").mousePressed(() =>{

    //     newSeed();
    //   });
    song.play();
    song.loop();
    //randomSeed(seed);
    //player = new Player(0,0);

    for (let i = 0; i < 12; i++){
        tiles[i].resize(TILE_WIDTH*CAMERA_SCALE, 0);
    }
    for (let i = 0; i < 2; i++){
        ground[i].resize(TILE_WIDTH*CAMERA_SCALE, 0);
    }

    maze = new Maze(MAZE_HEIGHT, MAZE_WIDTH, CAMERA_SCALE);

    maze.generateMaze();
    console.log(maze);

    updateBox();
}

function newSeed(){
    randomSeed(maze.end);
    noiseSeed(maze.start + maze.end)
    maze.resetMaze();
    maze.generateMaze();
    updateBox();
}

function draw(){
    background("#BD8C61");
    if (maze.update())
        newSeed();
    if(!song.isPlaying())
        song.play();
}

function updateBox() {
    //console.log(select('#box').elt.innerText)
    let goalStudent = maze.getGoalStudent();
    let uniform = goalStudent.attire;
    let starter = "Deliver the coffee to the student with the ";
    let i = 0;
    for(; i < articleNames.length - 1; i++){
        if (articleNames[i] == "legs")
            starter += `${colorMap[uniform[articleNames[i]]]} ${goalStudent.legs}, `;
        else starter += `${colorMap[uniform[articleNames[i]]]} ${articleNames[i]}, `;
    }
    starter += `and ${colorMap[uniform[articleNames[i]]]} ${articleNames[i]}.`;

    select('#box').elt.innerText = starter;
}
