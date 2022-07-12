
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
        this.cells = Array.from(Array(size), _ => Array(size).fill(0));
        
    }

    removeWall(cell1, cell2){
        this.cells[cell1][cell2] = this.cells[cell2][cell1] = 1;
    }

    generateMaze(){
        
    }
}