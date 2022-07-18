const articleColor = ['red', 'blue', 'green'];
const articleNames = ['something1', 'something2', 'something3'];

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
        //console.log(this.possibleClothes)
    }

    // Generate a unique student from remaining possible clothes
    generateStudent() {
        let student = [];
        // Check to prevent popping empty arrays
        if(this.possibleClothes[0].length == 0)
            this.resetClothes();
        for(let i = 0; i < this.articleCount; i++) {
            //console.log(this.possibleClothes[i])
            student[i] = {name: articleNames[i], color: this.popRandom(this.possibleClothes[i])};
        }
        return student;
    }

    // Reset the list of possible clothes
    resetClothes() {
        this.possibleClothes = Array.from(Array(this.articleNames.length), _ => articleColor.slice());
    }

    // Source: Stack Overflow (https://stackoverflow.com/questions/42591276/remove-a-random-object-from-an-array-and-return-it)
    popRandom (array) {
        let i = (Math.random() * array.length) | 0;
        return array.splice(i, 1)[0];
    }
}