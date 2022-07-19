const articleColor = ['red', 'blue', 'green'];
const articleNames = ['something1', 'something2', 'something3'];


class Student{
    constructor(articleNames, colors, x, y){

        this.x = x;
        this.y = y;

        this.attire = {};
        for (let i = 0; i < articleNames.length; i++){
            this.attire[articleNames[i]] = colors[i];
        }
    }
}

/*
  Class by Randy Le
  Note: It is possible that some coding conventions were broken. I kinda threw it together and called it a day.
*/
class StudentGen{
    constructor(articleCount, articleColor, articleNames){
        this.articleCount = articleCount
        this.articleColor = articleColor;
        this.articleNames = articleNames;
        this.possibleClothes = Array.from(Array(this.articleNames.length), _ => articleColor.slice());
        console.log(this.possibleClothes)
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

    generateNStudents(n, p){
        let ret = [];
        for (let i = 0; i < n; i++)
            ret.push(this.generateUnique(p[i].x, p[i].y))
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
        for (let s of students);
    }
}