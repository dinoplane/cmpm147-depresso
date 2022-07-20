const PANTS = [];

const SHIRT = [
    {type: v, x: 260, y: 205},
    {type: v, x: 275, y: 335},
    {type: v, x: 275, y: 390},
    {type: v, x: 230, y: 390},
    {type: v, x: 130, y: 390},
    {type: v, x: 140, y: 200},
    {type: v, x: 75,  y: 310},
    {type: v, x: 20,  y: 280},
    {type: v, x: 135, y: 125},
    {type: v, x: 260, y: 125},
    {type: v, x: 380, y: 285},
    {type: v, x: 330, y: 315},
  ]; 



class StudentRender{
    renderHat(){

    }
    
    renderShirt(){

    }
    
    renderPants(){
    
    }
    
    renderSkirt(){
    
    }


    renderCloth(x, y, v, color){
        push();
        fill(color);
        beginShape();
        for (let i = 0; i < v.length; i++){
          if (v[i].type == "v")
            vertex(v[i].x, v[i].y);
          if (v[i].type == "c")
            curveVertex(v[i].x, v[i].y);
          if (v[i].type == "b")
            bezierVertex(v[i].x, v[i].y);
        }
        
        
        endShape(CLOSE);
        pop();
        
      }
    
}




