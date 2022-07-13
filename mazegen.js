
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
            console.log(current)
            // Get coordinates of current node
            let currentCoords = this.getCoords(current);

            // Check unvisited neighbors:
            let neighbours = [];
            // Left neighbor
            if(currentCoords.x - 1 >= 0                && !visited.includes(this.getNode(currentCoords.x - 1, currentCoords.y    ))) {
                neighbours.push(this.getNode(currentCoords.x - 1, currentCoords.y));
                //console.log('1')
            }
            // Right neighbor
            if(currentCoords.x + 1 <= this.cellLen - 1 && !visited.includes(this.getNode(currentCoords.x + 1, currentCoords.y    ))) {
                neighbours.push(this.getNode(currentCoords.x + 1, currentCoords.y));
                //console.log('2')
            }
            // Up neighbor
            if(currentCoords.y - 1 >= 0                && !visited.includes(this.getNode(currentCoords.x    , currentCoords.y - 1))) {
                neighbours.push(this.getNode(currentCoords.x, currentCoords.y - 1));
                //console.log('3')
            }
            // Down neighbor
            if(currentCoords.y + 1 <= this.cellWid - 1 && !visited.includes(this.getNode(currentCoords.x    , currentCoords.y + 1))) {
                neighbours.push(this.getNode(currentCoords.x, currentCoords.y + 1));
                //console.log('4')
            }

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

    getCoords(node) {
        return { x: node % this.cellLen, y: Math.floor(node / this.cellLen) };
    }

    getNode(x, y){
        return y * this.cellLen + x;
    }
}