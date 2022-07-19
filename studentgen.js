const articleColor = ['red', 'blue', 'green'];
const articleNames = ['something1', 'something2', 'something3'];


class Student{
    constructor(articleNames, colors, x, y, tx, ty){

        this.x = x;
        this.y = y;

        this.tx = tx;
        this.ty = ty;


        this.attire = {};
        for (let i = 0; i < articleNames.length; i++){
            this.attire[articleNames[i]] = colors[i];
        }
    }
    drawBody(){
        push();
        fill("#e0e6ff");
        noStroke();

        circle(this.x, this.y -36, 32); // head
        arc(this.x, this.y +40, 35, 120, PI, 0, CHORD); // body
        arc(this.x -8, this.y +38, 8, 40, 0, radians(180)); // left leg
        arc(this.x +8, this.y +38, 8, 40, 0, radians(180)); // right leg

        translate(this.x -17, this.y -5);
        rotate(45);
        ellipse(0, 0, 9, 35); // left arm
        rotate(45);
        ellipse(-16.5, -30, 9, 37); // right arm
        pop();
    }
}

/*
  Class by Randy Le
  Note: It is possible that some coding conventions were broken. I kinda threw it together and called it a day.
*/
class StudentGen{
    constructor(articleCount, articleColor, articleNames, camera){
        this.articleCount = articleCount
        this.articleColor = articleColor;
        this.articleNames = articleNames;
        this.possibleClothes = Array.from(Array(this.articleNames.length), _ => articleColor.slice());
        console.log(this.possibleClothes)
        this.camera = camera;
    }

    // Generate a unique student from remaining possible clothes
    generateUnique(x, y) {
        let clothes = [];
        // Check to prevent popping empty arrays
        if(this.possibleClothes[0].length == 0)
            this.resetClothes();
        for(let i = 0; i < this.articleCount; i++) {
            //console.log(this.possibleClothes[i])
            clothes.push(this.popRandom(this.possibleClothes[i]));
        }
        return new Student(this.articleNames, clothes, x, y);
    }

    generate(x, y) {
        let clothes = [];
        // Check to prevent reading empty arrays
        if(this.possibleClothes[0].length == 0)
            this.resetClothes();
        for(let i = 0; i < this.articleCount; i++) {
            //console.log(this.possibleClothes[i])
            clothes.push(this.getRandom(this.possibleClothes[i]));
        }
        return new Student(this.articleNames, clothes, x, y);
    }
    // Reset the list of possible clothes
    resetClothes() {
        this.possibleClothes = Array.from(Array(this.articleNames.length), _ => articleColor.slice());
    }

    generateNStudents(n, p, q){
        let ret = [];
        for (let i = 0; i < n; i++)
            ret.push(this.generateUnique(p[i].x, p[i].y, q[i].x, q[i].y));
        return ret;
    }

    // Source: Stack Overflow (https://stackoverflow.com/questions/42591276/remove-a-random-object-from-an-array-and-return-it)
    popRandom (array) {
        let i = (Math.random() * array.length) | 0;
        return array.splice(i, 1)[0];
    }

    getRandom (array) {
        let i = (Math.random() * array.length) | 0;
        return array[i];
    }

    renderStudents(students){
        for (let s of students){
            //console.log("aofjdsj");
            push();
            translate( (s.x*3*TILE_WIDTH + 1.5*TILE_WIDTH)*this.camera.scale - this.camera.offset_x,
                        (s.y*3*TILE_WIDTH + 1.5*TILE_WIDTH)*this.camera.scale - this.camera.offset_y);

            s.drawBody();
            pop();
        };
    }
}