


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
    constructor(width, length, scale){
        let size = width * length;
        // Members added for use in generateMaze
        this.cellCount = size;
        this.cellLen = length;
        this.cellWid = width;
        this.cells = Array.from(Array(size), _ => Array(size).fill(0));
        
        this.start = Math.floor(random(this.cellCount));
        this.end = -1;

        this.player = new Player((this.getCoords(this.start).x * 3*TILE_WIDTH + 1.5*TILE_WIDTH)* scale, 
                                (this.getCoords(this.start).y*3*TILE_WIDTH+ 1.5*TILE_WIDTH)*scale);
        this.camera = new Camera(this.player, scale);
    }

    update(){
        
        this.render();
        let state = this.checkCollide();
        //console.log(state)
        this.player.update(state, this.camera.scale);
        this.camera.update(this.player);

        return state.atGoal;
        //console.log(this.camera)
    }

    resetMaze(){
        this.start = this.end;
        this.end = -1;
        this.cells.forEach(a => a.fill(0));
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
        
        let startNode = this.start;


        let endpoints = [];

        // Create array of explored cells
        let visited = [];
        visited.push(startNode);
        // Create "stack" for exploration
        let stack = []
        stack.push(startNode);

        let isBacktracking = false;
        // DFS algorithm
        // Check that the stack is not empty
        while (stack.length) {
            // Pop a cell from the current stack, make it current
            let current = stack.pop();
            //console.log(current)
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
                isBacktracking = false;
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
            } else {
                // Check if path is large enough
                let distance = stack.length;
                if (distance > 1 && !isBacktracking){
                    endpoints.push({node: current, distance: distance});
                    isBacktracking = true;
                }
                
            }
        }
        // Pick a random endpoint.
        this.end = random(endpoints).node;
        //console.log(endpoints);
        //console.log(this.end);

    }

    wallOnTop(cell){
        return (cell < this.cellLen) || (this.cells[cell][cell - this.cellLen] == 0);
    }

    wallOnRight(cell){
        return (cell % this.cellLen == (this.cellLen - 1)) || (this.cells[cell][cell+1] == 0);
    }

    wallOnBottom(cell){
        return (cell >= this.cellWid*(this.cellLen-1)) || (this.cells[cell][cell + this.cellLen] == 0);
    }

    wallOnLeft(cell){
        return (cell % this.cellLen == 0) || (this.cells[cell][cell -1] == 0);
    }


    // From https://www.geeksforgeeks.org/rotate-bits-of-an-integer/
    /*Function to left rotate n by d bits*/
    
    leftRotate( n,  d)
    {   
        /* In n<<d, last d bits are 0. To
        put first 3 bits of n at
        last, do bitwise or of n<<d
        with n >>(INT_BITS - d) */
        return ((n << d) | (n >> (INT_BITS - d))) & (2**INT_BITS -1);
    }
    
    /*Function to right rotate n by d bits*/
    rightRotate( n, d)
    {
        /* In n>>d, first d bits are 0.
        To put last 3 bits of at
        first, do bitwise or of n>>d
        with n <<(INT_BITS - d) */
        return ((n >> d) | (n << (INT_BITS - d))) & (2**INT_BITS -1);
    }
 

    drawCell(cell){
        
        push();
        //translate(-1.5* TILE_WIDTH*this.camera.scale, -1.5* TILE_WIDTH*this.camera.scale);
        noStroke();
        fill(PATH_COLOR);
        rect(0, 0, 3*TILE_WIDTH*this.camera.scale, 3*TILE_WIDTH*this.camera.scale);

        if (this.start == cell){
            fill(START_COLOR);
            rect(TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale);    
        }

        if (this.end == cell){
            fill(END_COLOR);
            rect(TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale);    
        }

        // stroke(0)
        // text(cell, TILE_WIDTH*this.camera.scale*1.5, TILE_WIDTH*this.camera.scale*1.5);
        noStroke();
        fill(CORN_COLOR);

        //get n_code
        let n_code = 0;
        let checks = [(c) => { return this.wallOnLeft(c)}, 
            (c) => { return this.wallOnTop(c)}, 
            (c) => { return this.wallOnRight(c)}, 
            (c) => { return this.wallOnBottom(c)}];
        //console.log(cell)
        for (let n = 0; n < 4; n++){
            if (checks[n](cell)){
                image(tiles[n+8], POSITIONS[n][0]*this.camera.scale,
                                    POSITIONS[n][1]*this.camera.scale)
                n_code |= 2**(n);   
                
            }
        }
        text(n_code, TILE_WIDTH*1.5*this.camera.scale, TILE_WIDTH*1.5*this.camera.scale)
        console.log("for", n_code)
        for (let i = 0; i < 4; i++){
            // me no like this
            let n2code = n_code & 3;
          //  console.log(n2code  )
            let isWall = ((n2code + 1) % 4) > 1;
            let tile_n = (!isWall) ? i*2 + ((n2code > 1)*1): 8 + (i+(n2code > 1)*1)% 4;
            
            console.log(n2code, tile_n)
            

            let cx = (((i+1) % 4) <= 1) ? POSITIONS[0][0] : POSITIONS[2][0];
            let cy = (i <= 1) ? POSITIONS[1][1] : POSITIONS[3][1];
            //console.log(i,cx, cy)

            image(tiles[tile_n], cx* this.camera.scale, cy*this.camera.scale);

            n_code = this.rightRotate(n_code, 1);
        }

        // fetch cell
        // Check if on boundaries
//        Draw top
        // let x = cell % this.cellLen;
        // let y = Math.floor(cell / this.cellWid);
        // fill(WALL_COLOR);
        // if (this.wallOnTop(cell)){
        //     rect(TILE_WIDTH*this.camera.scale, 0, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale);
        // }

        // // Draw right
        // if (this.wallOnRight(cell)){
        //     rect(2*TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale);
        // }

        // // Draw Bottom
        // if (this.wallOnBottom(cell))
        //     rect(TILE_WIDTH*this.camera.scale, 2*TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale);

        // // Draw Left
        // if (this.wallOnLeft(cell)){
        //     rect(0, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale);
        // }

        pop();
    }

    render(){
        push();
        for (let i = 0; i < this.cellCount; i++){
            let coords = this.getCoords(i);
            push();
            translate( (coords.x*3*TILE_WIDTH*this.camera.scale) - this.camera.offset_x, (coords.y*3*TILE_WIDTH*this.camera.scale) - this.camera.offset_y);
            //console.log(i)
            this.drawCell(i);
            
            pop();
        }
        pop();
    }

    inCornerRange(i){
        return (i < TILE_WIDTH*this.camera.scale-1) || (i > 2*TILE_WIDTH*this.camera.scale+1);
    }


    checkCollide(){
        let x = Math.floor(map(this.player.x, 0, this.cellLen*CELL_WIDTH*this.camera.scale, 0, this.cellLen));
        let y = Math.floor(map(this.player.y, 0, this.cellWid*CELL_WIDTH*this.camera.scale, 0, this.cellWid));
        let c = this.getNode(x, y);

        this.player.currentCell = c;
        //console.log(this.player.currentCell);

        let cx = this.player.x - x * CELL_WIDTH*this.camera.scale;
        let cy = this.player.y - y * CELL_WIDTH*this.camera.scale;
        
        //console.log(cx, cy);
        
        //console.log(this.inCornerRange(cy))
        return {    
                    touchingTop:    (cy <= TILE_WIDTH*this.camera.scale + 1) && (this.wallOnTop(c) || this.inCornerRange(cx)) , 
                    touchingRight:  (cx >= 2 * TILE_WIDTH*this.camera.scale-1) && (this.wallOnRight(c) || this.inCornerRange(cy)),
                    touchingLeft:   (cx <= TILE_WIDTH*this.camera.scale+1) && (this.wallOnLeft(c) || this.inCornerRange(cy)),
                    touchingBottom: (cy >= 2*TILE_WIDTH*this.camera.scale-1) && (this.wallOnBottom(c) || this.inCornerRange(cx)),
                    atGoal: (cx >= TILE_WIDTH*this.camera.scale && cx <= 2*TILE_WIDTH*this.camera.scale) && 
                                (cy >= TILE_WIDTH*this.camera.scale && cy <= 2*TILE_WIDTH*this.camera.scale) && 
                                (c == this.end)
                }
    }


}


