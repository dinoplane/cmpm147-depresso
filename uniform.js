const PANTS = [];

const SHIRT = 
  
  [
    {type: "v", x: 126, y: 90},
    {type: "v", x: 122, y: 104},
    {type: "v", x: 114, y: 100},
    {type: "v", x: 118, y: 108},
    {type: "v", x: 82, y: 108},
    {type: "v", x: 86, y: 100},
    {type: "v", x: 74, y: 106},
    {type: "v", x: 76, y: 90},
    {type: "v", x: 92, y: 82},
    {type: "b", x: 96, y: 88},
    {type: "b", x: 104, y: 88},
    {type: "b", x: 108, y: 82},
  ];
  



const a =  [
    {type: "v", x: 122, y: 142},
    {type: "v", x: 112, y: 84},
    {type: "v", x: 88, y: 84},
    {type: "v", x: 80, y: 142},
  ];
  
  const CLOTHES = {"something1": SHIRT, "something2": a, "something3": SHIRT};

// class StudentRender{
//     renderHat(){

//     }
    
//     renderShirt(){

//     }
    
//     renderPants(){
    
//     }
    
//     renderSkirt(){
    
//     }


// renderCloth(x, y, v, color){
//       push();
//       noStroke();
//       fill(color);
      
      
//       beginShape();
//       for (let i = 0; i < v.length; i++){
//         //console.log(i, v[i].type)
  
//         if (v[i].type == "v")
//           vertex(v[i].x, v[i].y);
//         if (v[i].type == "c")
//           curveVertex(v[i].x, v[i].y);
//         if (v[i].type == "b"){
//           let bezierCache = [];
//           for( let n = 0; n < 3; n++, i++){
//             //console.log(v[i])
//             if (i >= v.length || v[i].type != "b")
//               break;
//             bezierCache.push(v[i].x, v[i].y)
//           }
          
//           if (bezierCache.length == 6){
//             bezierVertex(...bezierCache);        
//           }
//           i -= 1;
          
//           //console.log(bezierCache)
//         }
          
//       }
      
      
//       endShape(CLOSE);
//       pop();
      
//     }
    
// }




