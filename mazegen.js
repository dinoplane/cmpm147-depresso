
/*
Choose the initial cell, mark it as visited and push it to the stack
While the stack is not empty
    Pop a cell from the stack and make it a current cell
    If the current cell has any neighbours which have not been visited
        Push the current cell to the stack
        Choose one of the unvisited neighbours
        Remove the wall between the current cell and the chosen cell
        Mark the chosen cell as visited and push it to the stack
*/

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

    /*
        Written by Randy Le
        Generates a maze using data provided in constructor
    */
    generateMaze() {
        // For simplification of DFS movement
        function getCoords(node) {
            return { x: node % this.cellLen, y: Math.floor(node / this.cellLen) }
        }
        function getNode(x, y){
            return y * this.cellLen + x;
        }
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
}