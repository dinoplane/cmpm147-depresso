


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
        this.cellWidth = length;
        this.cellHeight = width;
        this.cells = Array.from(Array(size), _ => Array(size).fill(0));

        this.start = Math.floor(random(this.cellCount));
        this.end = -1;

        this.player = new Player((this.getCoords(this.start).x * 3*TILE_WIDTH + 1.5*TILE_WIDTH)* scale,
                                (this.getCoords(this.start).y*3*TILE_WIDTH+ 1.5*TILE_WIDTH)*scale);
        this.camera = new Camera(this.player, scale);

        this.studentGen = new StudentGen(articleColor, articleNames, this.camera);
        this.selected = -1;
        this.students = [];
    }

    update(){


        let state = this.checkCollide();
        //console.log(state)
        this.renderTop();
        if (this.player.y < ((this.getCoords(this.player.currentCell).y)*CELL_WIDTH + TILE_WIDTH*1.7)*this.camera.scale){
            
            this.player.update(state, this.camera.scale);
            this.studentGen.renderStudents(this.students);
        } else {
            this.studentGen.renderStudents(this.students);
            this.player.update(state, this.camera.scale);
        }
           
        this.renderBottom();

        
        this.camera.update(this.player);


        return state.atGoal;
        //console.log(this.camera)
    }

    resetMaze(){
        this.start = this.end;
        this.end = -1;
        this.cells.forEach(a => a.fill(0));
        this.player.takeCup();
        this.studentGen.resetClothes(); // TO ensure no duplicates
    }

    removeWall(cell1, cell2){
        this.cells[cell1][cell2] = this.cells[cell2][cell1] = 1;
    }

    // For simplification of DFS movement
    getCoords(node) {
        return { x: node % this.cellWidth, y: Math.floor(node / this.cellWidth) }
    }
    getNode(x, y){
        return y * this.cellWidth + x;
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
            if(currentCoords.x + 1 <= this.cellWidth - 1 && !visited.includes(this.getNode(currentCoords.x + 1, currentCoords.y    ))) {
                neighbours.push(this.getNode(currentCoords.x + 1, currentCoords.y));
                //console.log('2')
            }
            // Up neighbor
            if(currentCoords.y - 1 >= 0                && !visited.includes(this.getNode(currentCoords.x    , currentCoords.y - 1))) {
                neighbours.push(this.getNode(currentCoords.x, currentCoords.y - 1));
                //console.log('3')
            }
            // Down neighbor
            if(currentCoords.y + 1 <= this.cellHeight - 1 && !visited.includes(this.getNode(currentCoords.x    , currentCoords.y + 1))) {
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

        let n = Math.floor(random(0, endpoints.length));


        this.students = this.studentGen.generateNStudents(endpoints.length, Array.from(endpoints, _ => this.getCoords(_.node)),
            Array.from(endpoints, _ => {
                let ret = this.getCoords(_.node);
                console.log((ret.x*3*TILE_WIDTH + 1.5*TILE_WIDTH))
                ret.x = (ret.x*3*TILE_WIDTH + 1.5*TILE_WIDTH)*this.camera.scale;
                ret.y = (ret.y*3*TILE_WIDTH + 1.5*TILE_WIDTH)*this.camera.scale;
                return ret;
            }));

        this.end = endpoints[n].node;
        this.endpointStudent = this.students[n];

        this.selected = n;
    }

    getGoalStudent(){
        let ret = "";
        if (this.selected != -1){
            ret = this.students[this.selected];
        }
        return ret;
    }

    wallOnTop(cell){
        return (cell < this.cellWidth) || (this.cells[cell][cell - this.cellWidth] == 0);
    }

    wallOnRight(cell){
        return (cell % this.cellWidth == (this.cellWidth - 1)) || (this.cells[cell][cell+1] == 0);
    }

    wallOnBottom(cell){
        return (cell >= this.cellWidth*(this.cellHeight-1)) || (this.cells[cell][cell + this.cellWidth] == 0);
    }

    wallOnLeft(cell){
        return (cell % this.cellWidth == 0) || (this.cells[cell][cell -1] == 0);
    }

    drawChip(x, y, c){
        fill("#61492f");
        noStroke();
        
//        circle(x, y, 10)
//        rect(x,y, 10)
        beginShape();
        vertex(x+3*noise(x+c), y+5*noise(y+c));
        vertex(x+20*noise(x/y*c), y+5*noise(x*y/c));
        vertex(x+30*noise(x*x, y*c), y+20*noise(y*y, x*c));
        
        //vertex(x+10*noise(x+c), y);
        vertex(x+ 5*noise(x*y, y*x), y+20*noise(x*x, y*y));
        //vertex(x, y+noise(y+c));
        
        endShape(CLOSE);
    }

    drawChips(tlx, tly, i, c){
        randomSeed(this.start+this.end+c);

        // stroke("red")
        // fill("#00000000")
        // rect(tlx + CHIP_POS[i][0]*this.camera.scale, 
        //     tly + CHIP_POS[i][1]*this.camera.scale, 
        //     CHIP_POS[i][2]*this.camera.scale, 
        //     CHIP_POS[i][3]*this.camera.scale);

        let dw = CHIP_POS[i][2]*this.camera.scale/3;
        let dh = CHIP_POS[i][3]*this.camera.scale/3;
        let dx = tlx + CHIP_POS[i][0]*this.camera.scale;
        let dy = tly + CHIP_POS[i][1]*this.camera.scale;
        for (let p = 0; p < 3; p++){
            dx = tlx + CHIP_POS[i][0]*this.camera.scale;
            for (let q = 0; q < 3; q++){
                if (random() > 0.4)
                    this.drawChip(dx + dw*noise(tlx+p*10 + c, tly+q*10 + c), dy+ dh*noise(tlx+p*10 + c, tly+q*10 + c), c+tlx+tly);
                dx += dw;
            }
            dy += dh;
        }
    }

    drawCell(cell, drawBottom){
        push();
        //translate(-1.5* TILE_WIDTH*this.camera.scale, -1.5* TILE_WIDTH*this.camera.scale);
         noStroke();
        let ckb = (this.getCoords(cell).x +this.getCoords(cell).y) % 2

        if (!drawBottom){
            image(ground[ckb], TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale);
            // if (this.start == cell){
            //     fill(START_COLOR);
            //     rect(TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale, TILE_WIDTH*this.camera.scale);
            // }

            // if (this.end == cell){
            //     fill(END_COLOR);
            //     rect(1.3*TILE_WIDTH*this.camera.scale, 1.2*TILE_WIDTH*this.camera.scale, 0.4*TILE_WIDTH*this.camera.scale, 0.6*TILE_WIDTH*this.camera.scale);
            // }
        }

        //get neighbors
        let n_array = Array(4).fill(false);
        let checks = [(c) => { return this.wallOnLeft(c)},
            (c) => { return this.wallOnTop(c)},
            (c) => { return this.wallOnRight(c)},
            (c) => { return this.wallOnBottom(c)}];

        for (let n = 0; n < 4; n++){
            
            if (checks[n](cell)){

                if ((!drawBottom && n < 3) || (drawBottom && n == 3)){ // Draw the top walls and draw the bottom only if we need
                    image(tiles[n+8], POSITIONS[n][0]*this.camera.scale,
                        POSITIONS[n][1]*this.camera.scale)
                    this.drawChips(POSITIONS[n][0]*this.camera.scale,
                        POSITIONS[n][1]*this.camera.scale, n, cell);

                }

                n_array[n] = true;
            }else {
                if (!drawBottom)
                    image(ground[(ckb == 0)*1], POSITIONS[n][0]*this.camera.scale,
                                                POSITIONS[n][1]*this.camera.scale)
            }
            

        }
        //text(n_code, TILE_WIDTH*1.5*this.camera.scale, TILE_WIDTH*1.5*this.camera.scale)
        //let i = (!drawBottom) ? 0 : 2;// If we are drawing bottom...
        for (let i = 0; i < 4; i++){

            // calculate positions
            let cx = (((i+1) % 4) <= 1) ? POSITIONS[0][0] : POSITIONS[2][0];
            let cy = (i <= 1) ? POSITIONS[1][1] : POSITIONS[3][1];

            let left = n_array[i];
            let right = n_array[(i+1) % 4];
            let tile_n;
            if (!left && !right){
                if (!drawBottom)
                    image(ground[ckb], cx* this.camera.scale, cy*this.camera.scale); // ground tile if corner
                tile_n = i*2;
            } else if (left && !right){
                tile_n =  i + 8;
            } else if (!left && right){
                tile_n =  8 + (i+1)%4
            } else {
                tile_n = i*2 + 1
            }

            if ((!drawBottom && i < 2) || (drawBottom && i >= 2)){
                image(tiles[tile_n], cx* this.camera.scale, cy*this.camera.scale);
                if (tile_n > 7){
                    let n = tile_n - 8;
                    this.drawChips(cx* this.camera.scale, cy*this.camera.scale, n, cell);
                } else if (tile_n % 2 == 1)
                    this.drawChips(cx* this.camera.scale, cy*this.camera.scale, 5, cell);
                else if (tile_n > 3)
                    this.drawChips(cx* this.camera.scale, cy*this.camera.scale, 5, cell);
                else if (tile_n < 3)
                    this.drawChips(cx* this.camera.scale, cy*this.camera.scale, 6, cell);
                
            }
        }
        pop();
    }

    render(){
        push();
        for (let i = 0; i < this.cellCount; i++){
            let coords = this.getCoords(i);
            push();
            translate( (coords.x*3*TILE_WIDTH*this.camera.scale) - this.camera.offset_x,
                            (coords.y*3*TILE_WIDTH*this.camera.scale) - this.camera.offset_y);
            //console.log(i)
            this.drawCell(i, false);

            pop();
        }
        pop();
    }

    // Render the top layers and bottom layers as separate layers.
    renderTop(){
        push();
        for (let i = 0; i < this.cellCount; i++){
            let coords = this.getCoords(i);
            push();
            translate( (coords.x*3*TILE_WIDTH*this.camera.scale) - this.camera.offset_x, (coords.y*3*TILE_WIDTH*this.camera.scale) - this.camera.offset_y);
            //console.log(i)
            this.drawCell(i, false);

            pop();
        }
        pop();
    }


    renderBottom(){
        push();
        for (let i = 0; i < this.cellCount; i++){
            let coords = this.getCoords(i);
            push();
            translate( (coords.x*3*TILE_WIDTH*this.camera.scale) - this.camera.offset_x, (coords.y*3*TILE_WIDTH*this.camera.scale) - this.camera.offset_y);
            //console.log(i)
            this.drawCell(i, true);

            pop();
        }
        pop();
    }





    inCornerRange(i){
        return (i < TILE_WIDTH*this.camera.scale-1) || (i > 2*TILE_WIDTH*this.camera.scale+1);
    }


    checkCollide(){
        let x = Math.floor(map(this.player.x, 0, this.cellWidth*CELL_WIDTH*this.camera.scale, 0, this.cellWidth));
        let y = Math.floor(map(this.player.y, 0, this.cellHeight*CELL_WIDTH*this.camera.scale, 0, this.cellHeight));
        let c = this.getNode(x, y);

        this.player.currentCell = c;
        //console.log(this.player.currentCell);

        let cx = this.player.x - x * CELL_WIDTH*this.camera.scale;
        let cy = this.player.y - y * CELL_WIDTH*this.camera.scale;

        let ret = {
            touchingTop:    (cy <= TILE_WIDTH*this.camera.scale + 1) && (this.wallOnTop(c) || this.inCornerRange(cx + PLAYER_WIDTH/2) || this.inCornerRange(cx - PLAYER_WIDTH/2)),
            touchingRight:  (cx + PLAYER_WIDTH/2 >= 2*TILE_WIDTH*this.camera.scale-1) && (this.wallOnRight(c) || this.inCornerRange(cy)),
            touchingLeft:   (cx - PLAYER_WIDTH/2 <= TILE_WIDTH*this.camera.scale+1) && (this.wallOnLeft(c) || this.inCornerRange(cy)),
            touchingBottom: (cy + PLAYER_HEIGHT/8 >= 2*TILE_WIDTH*this.camera.scale-1) && (this.wallOnBottom(c) || this.inCornerRange(cx + PLAYER_WIDTH/2) || this.inCornerRange(cx - PLAYER_WIDTH/2)),
            atGoal: (cx >= 1.3*TILE_WIDTH*this.camera.scale && cx <= 1.7*TILE_WIDTH*this.camera.scale) &&
                        (cy >= 1.2*TILE_WIDTH*this.camera.scale && cy <= 1.8*TILE_WIDTH*this.camera.scale) &&
                        (c == this.end)
        };
        return ret; 
    }


}
