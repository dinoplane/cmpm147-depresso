let shapes = [];

let v = [];
//let d = [];

let currScale = 1;
let tX = 0;
let tY = 0;

let curr_p = -1;

let leftBound = 0;
let rightBound =400;

let topBound = 0;
let bottomBound =400;

let drawPoints = true;

const MODES = ["v", "c", "b"]
let curveMode = 0;


document.oncontextmenu = function() { return false; }

function mousePressed(){
    if (mouseButton == LEFT){
        //console.log(pmouseX)
        //console.log(mouseX)
        //console.log(tX  + width/(2*currScale))
      
        let i = checkClicked();
        if (i != -1 && v[i].type != "b"){
            
            for (let n = 0; n < i; n++)
              v.push(v.shift())
        }    
    } else if (mouseButton == RIGHT){
        let i = checkClicked();
        if (i != -1){
            v.splice(i, 1);
        } else {
          v.push({type: MODES[curveMode],  x: round((mouseX- tX)/5)*5, y: round((mouseY- tY)/5)*5});
        }
    }
}




function checkClicked(){
    let ret = -1;
    for (let i = 0; i < v.length; i++){
        if (dist(mouseX-tX*currScale, mouseY-tY*currScale, v[i].x, v[i].y) < 10){
            ret = i;
            break;
        }
    }
    return ret;
}

function mouseDragged() {
  if (mouseButton == LEFT){
    let i = checkClicked();
    if (i != -1 && curr_p == -1)
        curr_p = i;
  }
}
  
function mouseReleased() {
    //d.fill(false);
  curr_p = -1;
}

function keyPressed(){
  if (keyIsDown(67)) { // "c"
    v = [];
    curr_p = -1;
      
  }
//   if (keyIsDown(187)){ // "+"
//     currScale *= 2;
//     let dw = rightBound-leftBound;
//     leftBound += 0.5*dw/2 - tX*currScae;
//     rightBound -= 0.5*dw/2;
    
//     let dh = bottomBound -topBound;
//     topBound += 0.5*dh/2;
//     bottomBound -= 0.5*dh/2;
    
    
//   }
  
//   if (keyIsDown(189)){ // "-"
//     currScale *= 0.5;
//     let dw = (rightBound-leftBound);
//     leftBound -= 0.5*dw - tX;
//     rightBound += 0.5*dw;
    
//     let dh = (topBound- bottomBound);
//     topBound -= 0.5*dh;
//     bottomBound += 0.5*dh;

//   }
  
if (keyIsDown(37)){ // "left"
    leftBound -= 5*currScale;
    rightBound -= 5*currScale;
    
    tX += 5;
    
  }
  
  if (keyIsDown(39)){ // "right"
    leftBound += 5*currScale;
    rightBound += 5*currScale;
    
    
    tX -= 5;
  }
  
  if (keyIsDown(38)){ // "up"
    topBound -= 5*currScale;
    bottomBound -= 5*currScale;
    
    
    tY += 5;
  }
  
  if (keyIsDown(40)){ // "down"
    topBound += 5*currScale;
    bottomBound += 5*currScale;
    
    
    tY -= 5;
  }
  
  console.log(leftBound, rightBound)
}

function checkKeys() {
  //console.log(keyCode)

  

  
  
  
}


function setup() {
    createCanvas(400, 400);
    createButton("EXPORT").mousePressed(() =>{
        let out = "[\n";  
      for (let p of v){
        out += `  {type: ${p.type}, x: ${p.x}, y: ${p.y}}\n`
      }
      out += "];"
        console.log(out);
    })
  
    createButton("Change Mode").mousePressed(() =>{
      curveMode = (curveMode + 1) % 3
    })
  
    createButton("New Shape").mousePressed(() =>{
        let out = "[\n";  
      for (let p of v){
        out += `  {type: ${p.type}, x: ${p.x}, y: ${p.y}}\n`
      }
      out += "];"
        console.log(out);
    })
  createP("Right click to add points. Right click on a point to delete it");
  createP("Left click to set insertion point. Drag to move points around");
  createP("c to clear; x to toggle curve mode; arrow keys to select layer, s to toggle layer move mode");
  
  
  }
  

  
  function renderCloth(x, y, v, color){
    push();
    fill(color);
    
    beginShape();
    for (let i = 0; i < v.length; i++){
      //console.log(i, v[i].type)

      if (v[i].type == "v")
        vertex(v[i].x, v[i].y);
      if (v[i].type == "c")
        curveVertex(v[i].x, v[i].y);
      if (v[i].type == "b"){
        let bezierCache = [];
        for( let n = 0; n < 3; n++, i++){
          //console.log(v[i])
          if (i >= v.length || v[i].type != "b")
            break;
          bezierCache.push(v[i].x, v[i].y)
        }
        
        if (bezierCache.length == 6){
          bezierVertex(...bezierCache);        
        }
        i -= 1;
        
        //console.log(bezierCache)
      }
        
    }
    
    
    endShape(CLOSE);
    pop();
    
  }
  
  function draw() {
    background(220);
    
    
    textSize(20);
    text(`Curr mode: ${MODES[curveMode]}`, 20, 20);
    push();
    translate(tX - (currScale - 1)*width/2, tY - (currScale - 1)*width/2);
    scale(currScale);    
    renderCloth(0,0,v, "cyan")

    let i = 0;
    if (v.length > 0){
      fill('red')
      circle(v[i].x, v[i].y, 10);
    }
    
    

    for (i = 1; i < v.length-1; i++){
        if (v[i+1].type == "b")
          fill("purple");
        else if (v[i].type == "b")
          fill("purple");
        else fill("yellow");
        circle(v[i].x, v[i].y, 10);
    };
    
    if (v.length > 1){
      fill('blue')
      circle(v[i].x, v[i].y, 10);
    }
    
    
    if (curr_p != -1)
        [v[curr_p].x, v[curr_p].y] = [round((mouseX-tX)/5)*5, round((mouseY-tY)/5)*5];
    
    
//     fill("green")
//     circle(0, 0, 10);
//     circle(100, 100, 10);
//     circle(150, 150, 10);
    
//     fill("cyan")
//     circle(200, 200, 10);
    
//     fill("pink")
//     circle(300, 100, 10);
//     circle(400, 100, 10);
    
    

  pop();
    checkKeys();
    //renderShirt(200, 200, "red")
  }