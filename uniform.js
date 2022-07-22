const PANT =
[
  {type: "v", x: 82, y: 148},
  {type: "b", x: 82, y: 142},
  {type: "b", x: 82, y: 134},
  {type: "b", x: 82, y: 124},
  {type: "v", x: 84, y: 118},
  {type: "v", x: 116, y: 118},
  {type: "b", x: 118, y: 124},
  {type: "b", x: 118, y: 134},
  {type: "b", x: 118, y: 142},
  {type: "v", x: 118, y: 148},
  {type: "v", x: 104, y: 148},
  {type: "v", x: 104, y: 140},
  {type: "v", x: 96, y: 140},
  {type: "v", x: 96, y: 148},
];

const SKIRT =
[
  {type: "v", x: 78, y: 140},
  {type: "v", x: 84, y: 116},
  {type: "v", x: 116, y: 116},
  {type: "v", x: 122, y: 140},
  {type: "v", x: 100, y: 140},
];

const LEFT_SHOES =
[
  {type: "v", x: 96, y: 152},
  {type: "b", x: 96, y: 162},
  {type: "b", x: 88, y: 160},
  {type: "b", x: 88, y: 152},
];

const RIGHT_SHOES =
[
  {type: "v", x: 112, y: 152},
  {type: "b", x: 112, y: 162},
  {type: "b", x: 104, y: 160},
  {type: "b", x: 104, y: 152},
];

const SHIRT =
[
  {type: "v", x: 118, y: 116},
  {type: "v", x: 114, y: 98},
  {type: "v", x: 120, y: 100},
  {type: "v", x: 124, y: 88},
  {type: "v", x: 110, y: 86},
  {type: "b", x: 108, y: 86},
  {type: "b", x: 100, y: 92},
  {type: "b", x: 100, y: 92},
  {type: "v", x: 92, y: 86},
  {type: "v", x: 80, y: 88},
  {type: "v", x: 80, y: 104},
  {type: "v", x: 88, y: 98},
  {type: "v", x: 82, y: 116},
];

const TIE =
[
  {type: "v", x: 100, y: 90},
  {type: "b", x: 94, y: 96},
  {type: "b", x: 88, y: 88},
  {type: "b", x: 92, y: 84},
  {type: "b", x: 106, y: 98},
  {type: "b", x: 110, y: 92},
  {type: "b", x: 108, y: 84},
  {type: "b", x: 92, y: 94},
  {type: "b", x: 86, y: 114},
  {type: "b", x: 100, y: 94},
  {type: "b", x: 106, y: 104},
  {type: "b", x: 110, y: 104},
  {type: "b", x: 106, y: 98},
];

  const CLOTHES = {
                    "shirt": SHIRT,
                    "skirt":  SKIRT,
                    "tie": TIE,
                    "pants": PANT,
                    "l_shoe": LEFT_SHOES,
                    "r_shoe": RIGHT_SHOES
                  };



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
