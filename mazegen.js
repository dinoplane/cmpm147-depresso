


// class Cell{
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//         this.neighbors = [  {x: this.x,     y: this.y - 1,  open: false}, // Top
//                             {x: this.x + 1, y: this.y,      open: false}, // Right
//                             {x: this.x,     y: this.y + 1,  open: false}, // Bottom
//                             {x: this.x - 1, y: this.y,      open: false}  // Left
//                          ] //
//     }
// }


class Maze{
    constructor(length){
        let size = length * length;
        // Members added for use in generateMaze
        this.cellCount = size;
        this.cellLen = length;
        this.cellWid = length;
        this.cells = Array.from(Array(size), _ => Array(size).fill(0));

    }

    removeWall(cell1, cell2){
        this.cells[cell1][cell2] = this.cells[cell2][cell1] = 1;
    }

    // For simplification of DFS movement
    getCoords(node) {
        return { x: node % this.cellLen, y: Math.floor(node / this.cellLen) }
    }
    getNode(x, y){
        return y * this.cellLen + x;
    }

    /*
        Written by Randy Le
        Generates a maze using data provided in constructor
    */
    generateMaze() {

        // Determine how/when to set a seed
        // Set random start location

        let startNode = Math.floor(random() * this.cellCount );

        // Create array of explored cells
        let visited = [];
        visited.push(startNode);
        // Create "stack" for exploration
        let stack = []
        stack.push(startNode);

        // DFS algorithm
        // Check that the stack is not empty
        while (stack.length) {
            // Pop a cell from the current stack, make it current
            let current = stack.pop();
            // Get coordinates of current node
            let currentCoords = getCoords(current);

            // Check unvisited neighbors:
            let neighbours = [];
            // Left neighbor
            if(x - 1 >= 0                && !visited.includes(getNode(currentCoords.x - 1, currentCoords.y    )))
                neighbours.push(getNode(currentCoords.x - 1, currentCoords.y));
            // Right neighbor
            if(x + 1 <= this.cellLen - 1 && !visited.includes(getNode(currentCoords.x + 1, currentCoords.y    )))
                neighbours.push(getNode(currentCoords.x - 1, currentCoords.y));
            // Up neighbor
            if(y - 1 >= 0                && !visited.includes(getNode(currentCoords.x    , currentCoords.y - 1)))
                neighbours.push(getNode(currentCoords.x - 1, currentCoords.y));
            // Down neighbor
            if(y + 1 <= this.cellWid - 1 && !visited.includes(getNode(currentCoords.x    , currentCoords.y + 1)))
                neighbours.push(getNode(currentCoords.x - 1, currentCoords.y));

            if(neighbours.length) {
                // If unvisited neighbors exist:
                // Push current onto stack
                stack.push(current);

                // Choose a random unvisited neighbor
                let neighbor = neighbours[Math.floor(random() * neighbours.length)];

                // Remove wall between current and chosen cell
                this.removeWall(current, neighbor);

                // Mark the current wall as visited and push to stack
                visited.push(neighbor);
                stack.push(neighbor);
            }
        }
    }

    drawCell(cell){
        
        push();
        //translate(-1.5* TILE_WIDTH, -1.5* TILE_WIDTH);
        noStroke();
        fill(PATH_COLOR);
        rect(0, 0, 3*TILE_WIDTH, 3*TILE_WIDTH);
        stroke(0)
        text(cell, TILE_WIDTH*1.5, TILE_WIDTH*1.5);
        noStroke();
        fill(CORN_COLOR);
        for (let i = 0; i < 2; i++){
            for (let j = 0; j < 2; j++){
                rect(i*2*TILE_WIDTH, j*2*TILE_WIDTH, TILE_WIDTH, TILE_WIDTH);
            }   
        }

        // fetch cell
        // Check if on boundaries
        // Draw top
        // let x = cell % this.cellLen;
        // let y = Math.floor(cell / this.cellWid);
        fill(WALL_COLOR);
        if (cell < this.cellLen || this.cells[cell][cell - this.cellLen] == 0){
            rect(TILE_WIDTH, 0, TILE_WIDTH, TILE_WIDTH);
        }
        // Draw right
        if (cell % this.cellLen == (this.cellLen - 1) || this.cells[cell][cell+1] == 0){
            rect(TILE_WIDTH*2, TILE_WIDTH, TILE_WIDTH, TILE_WIDTH);
        }

        // Draw Bottom
        if (cell >= this.cellWid*(this.cellLen-1) || this.cells[cell][cell + this.cellLen] == 0)
            rect(TILE_WIDTH, 2*TILE_WIDTH, TILE_WIDTH, TILE_WIDTH);

        // Draw Left
        if (cell % this.cellLen == 0 || this.cells[cell][cell -1] == 0){
            rect(0, TILE_WIDTH, TILE_WIDTH, TILE_WIDTH);
        }

        pop();
    }

    render(){
        push();
        for (let i = 0; i < this.cellCount; i++){
            let coords = this.getCoords(i);
            push();
            translate(coords.x*3*TILE_WIDTH, coords.y*3*TILE_WIDTH);
            this.drawCell(i);
            pop();
        }
        pop();
    }
}
