/*fragmentShaderCode =
'void main(void) {' +
'  gl_FragColor = vec4(1, 1, 1,1);' +
'}';*/

// Compile fragment shader.
fragmentShaderCode = 'precision mediump float;'+ 
'varying vec4 color;'+
'void main() {'+
    'gl_FragColor = color;'+
'}';

vertexShaderCode =
'attribute vec3 ppos;' +
'attribute vec4 col;'+
'varying vec4 color;'+
'uniform mat4 mvp;' +
'void main(void) {' +
  'color = col;'+                 
'  gl_Position = mvp * vec4(ppos.x, ppos.y, ppos.z, 1.0);' +
'}';

var vorneLinksUnten = [-0.5, -0.5, -0.5];
var vorneRechtsUnten = [0.1, -0.5, -0.5];
var hintenLinksUnten = [-0.5, -0.5, 0.3];
var hintenRechtsUnten = [0.1, -0.5, 0.3];

var vorneLinksOben = [-0.5, 0.1, -0.5];
var vorneRechtsOben = [0.1, 0.1, -0.5];
var hintenLinksOben = [-0.5, 0.1, 0.3];
var hintenRechtsOben = [0.1, 0.1, 0.3];

var dachSpitzeVorne = [-0.2, 0.4, -0.5];
var dachSpitzeHinten = [-0.2, 0.4, 0.3];

var mitteDachVorneLinks = [-0.3, 0.3, -0.5];
var mitteDachVorneRechts = [-0.1, 0.3, -0.5];

var tuerRahmenLinksUnten = [-0.25, -0.5, -0.5];
var tuerRahmenRechtsUnten = [-0.15, -0.5, -0.5];
var tuerRahmenLinksOben = [-0.25, -0.2, -0.5];
var tuerRahmenRechtsOben = [-0.15, -0.2, -0.5];

var winkelYSetter = -45;

var kontinuierlichDrehen = false;






var pointArray = [];
pointArray = [
  /*
// Haus unten
vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],
vorneRechtsUnten[0], vorneRechtsUnten[1], vorneRechtsUnten[2],
hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],
hintenLinksUnten[0], hintenLinksUnten[1], hintenLinksUnten[2],
vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],
//kreuz
hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],
hintenLinksUnten[0], hintenLinksUnten[1], hintenLinksUnten[2],
vorneRechtsUnten[0], vorneRechtsUnten[1], vorneRechtsUnten[2],
vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],
//*/

// Dach dreieck vorne
vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],
dachSpitzeVorne[0], dachSpitzeVorne[1], dachSpitzeVorne[2],
vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
//vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],

// haus vorne
vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],
tuerRahmenLinksUnten[0], tuerRahmenLinksUnten[1], tuerRahmenLinksUnten[2],
tuerRahmenLinksOben[0], tuerRahmenLinksOben[1], tuerRahmenLinksOben[2],

vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],
tuerRahmenLinksOben[0], tuerRahmenLinksOben[1], tuerRahmenLinksOben[2],
vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],

vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],
vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
tuerRahmenLinksOben[0], tuerRahmenLinksOben[1], tuerRahmenLinksOben[2],


vorneRechtsUnten[0], vorneRechtsUnten[1], vorneRechtsUnten[2],
tuerRahmenRechtsUnten[0], tuerRahmenRechtsUnten[1], tuerRahmenRechtsUnten[2],
tuerRahmenRechtsOben[0], tuerRahmenRechtsOben[1], tuerRahmenRechtsOben[2],

vorneRechtsUnten[0], vorneRechtsUnten[1], vorneRechtsUnten[2],
tuerRahmenRechtsOben[0], tuerRahmenRechtsOben[1], tuerRahmenRechtsOben[2],
vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],

tuerRahmenLinksOben[0], tuerRahmenLinksOben[1], tuerRahmenLinksOben[2],
vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
tuerRahmenRechtsOben[0], tuerRahmenRechtsOben[1], tuerRahmenRechtsOben[2],




//vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
//vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],
//vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],

//vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
//vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],
//vorneRechtsUnten[0], vorneRechtsUnten[1], vorneRechtsUnten[2],
//vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],


// Haus Seite Rechts
hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
//hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],

vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
vorneRechtsUnten[0], vorneRechtsUnten[1], vorneRechtsUnten[2],
hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],
//vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],


// Haus Hinten
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
hintenLinksUnten[0], hintenLinksUnten[1], hintenLinksUnten[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
//hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],

hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],
hintenLinksUnten[0], hintenLinksUnten[1], hintenLinksUnten[2],
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
//hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],

// Dach dreieck hinten
dachSpitzeHinten[0], dachSpitzeHinten[1], dachSpitzeHinten[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
//dachSpitzeHinten[0], dachSpitzeHinten[1], dachSpitzeHinten[2],

/*// kreuz
hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
hintenLinksUnten[0], hintenLinksUnten[1], hintenLinksUnten[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
//*/


// Haus Seite Links
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],
vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],
//hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],

hintenLinksUnten[0], hintenLinksUnten[1], hintenLinksUnten[2],
vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
//hintenLinksUnten[0], hintenLinksUnten[1], hintenLinksUnten[2],

//vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],


// Haus Dach Links
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
dachSpitzeVorne[0], dachSpitzeVorne[1], dachSpitzeVorne[2],
dachSpitzeHinten[0], dachSpitzeHinten[1], dachSpitzeHinten[2],
//hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],

vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],
dachSpitzeVorne[0], dachSpitzeVorne[1], dachSpitzeVorne[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
//vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],

/*
//kreuz
vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],
dachSpitzeVorne[0], dachSpitzeVorne[1], dachSpitzeVorne[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
dachSpitzeHinten[0], dachSpitzeHinten[1], dachSpitzeHinten[2],
//*/



// Haus Dach Rechts
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
dachSpitzeVorne[0], dachSpitzeVorne[1], dachSpitzeVorne[2],
dachSpitzeHinten[0], dachSpitzeHinten[1], dachSpitzeHinten[2],
//hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],

vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
dachSpitzeVorne[0], dachSpitzeVorne[1], dachSpitzeVorne[2],
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
//vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],

// Tür
tuerRahmenLinksUnten[0], tuerRahmenLinksUnten[1], tuerRahmenLinksUnten[2],
tuerRahmenLinksOben[0], tuerRahmenLinksOben[1], tuerRahmenLinksOben[2],
tuerRahmenRechtsOben[0], tuerRahmenRechtsOben[1], tuerRahmenRechtsOben[2],

tuerRahmenRechtsOben[0], tuerRahmenRechtsOben[1], tuerRahmenRechtsOben[2],
tuerRahmenRechtsUnten[0], tuerRahmenRechtsUnten[1], tuerRahmenRechtsUnten[2],
tuerRahmenLinksUnten[0], tuerRahmenLinksUnten[1], tuerRahmenLinksUnten[2],

//54

// Haus Dach Vorne kreuz
//mitteDachVorneLinks[0],     mitteDachVorneLinks[1],     mitteDachVorneLinks[2],
//vorneRechtsOben[0],     vorneRechtsOben[1],     vorneRechtsOben[2],

//mitteDachVorneRechts[0],     mitteDachVorneRechts[1],     mitteDachVorneRechts[2],
//vorneLinksOben[0],     vorneLinksOben[1],     vorneLinksOben[2],


];

//hier 


// Wirbel vorne links
var spiralValues =[];

var lastPoint = {x: dachSpitzeVorne[0], y: dachSpitzeVorne[1], z: dachSpitzeVorne[2]};
pointArray.push(lastPoint.x);
pointArray.push(lastPoint.y);
pointArray.push(lastPoint.z);
for (i = 1; i < 3; i++) {
  lastPoint.y -= Math.cos(i * 5)  / (i*5);
  lastPoint.x += Math.sin(i * 5)  / (i*5);


    pointArray.push(lastPoint.x);
    pointArray.push(lastPoint.y);
    pointArray.push(lastPoint.z);


    spiralValues[[i][0]] =  lastPoint.x;
    spiralValues[[i][1]] =  lastPoint.y;
    spiralValues[[i][2]] =  lastPoint.z;
}

/*
for (i = 1; i < spiralValues.length; i++) {



  pointArray.push( spiralValues[9-i, 0]);
  pointArray.push( spiralValues[9-i, 1]);
  pointArray.push( spiralValues[9-i, 2]);


 
}
*/

// Wirbel vorne rechts
spiralValues =[];
lastPoint = [];

var lastPoint = {x: dachSpitzeVorne[0], y: dachSpitzeVorne[1], z: dachSpitzeVorne[2]};
pointArray.push(lastPoint.x);
pointArray.push(lastPoint.y);
pointArray.push(lastPoint.z);
for (i = 1; i < 3; i++) {
  lastPoint.y -= Math.cos(i * 5)  / (i*5);
  lastPoint.x += Math.sin(i * 5)  / (-i*5);


    pointArray.push(lastPoint.x);
    pointArray.push(lastPoint.y);
    pointArray.push(lastPoint.z);

    spiralValues[[i][0]] =  lastPoint.x;
    spiralValues[[i][1]] =  lastPoint.y;
    spiralValues[[i][2]] =  lastPoint.z;
}
/*
for (i = 1; i < spiralValues.length; i++) {
  pointArray.push( spiralValues[9-i, 0]);
  pointArray.push( spiralValues[9-i, 1]);
  pointArray.push( spiralValues[9-i, 2]);
}
*/
// Wirbel hinten rechts
spiralValues =[];
lastPoint = [];

var lastPoint = {x: dachSpitzeHinten[0], y: dachSpitzeHinten[1], z: dachSpitzeHinten[2]};
pointArray.push(lastPoint.x);
pointArray.push(lastPoint.y);
pointArray.push(lastPoint.z);
for (i = 1; i < 3; i++) {
  lastPoint.y -= Math.cos(i * 5)  / (i*5);
  lastPoint.x += Math.sin(i * 5)  / (-i*5);


    pointArray.push(lastPoint.x);
    pointArray.push(lastPoint.y);
    pointArray.push(lastPoint.z);

    spiralValues[[i][0]] =  lastPoint.x;
    spiralValues[[i][1]] =  lastPoint.y;
    spiralValues[[i][2]] =  lastPoint.z;
}
/*
for (i = 1; i < spiralValues.length; i++) {
  pointArray.push( spiralValues[9-i, 0]);
  pointArray.push( spiralValues[9-i, 1]);
  pointArray.push( spiralValues[9-i, 2]);
}*/

// Wirbel hinten links
spiralValues =[];
lastPoint = [];

var lastPoint = {x: dachSpitzeHinten[0], y: dachSpitzeHinten[1], z: dachSpitzeHinten[2]};
pointArray.push(lastPoint.x);
pointArray.push(lastPoint.y);
pointArray.push(lastPoint.z);
for (i = 1; i < 3; i++) {
  lastPoint.y -= Math.cos(i * 5)  / (i*5);
  lastPoint.x += Math.sin(i * 5)  / (i*5);


    pointArray.push(lastPoint.x);
    pointArray.push(lastPoint.y);
    pointArray.push(lastPoint.z);

    spiralValues[[i][0]] =  lastPoint.x;
    spiralValues[[i][1]] =  lastPoint.y;
    spiralValues[[i][2]] =  lastPoint.z;
}/*
for (i = 1; i < spiralValues.length; i++) {
  pointArray.push( spiralValues[9-i, 0]);
  pointArray.push( spiralValues[9-i, 1]);
  pointArray.push( spiralValues[9-i, 2]);
}

*/



var vertices = new Float32Array(pointArray);

         // Colors as rgba.
         var colors = new Float32Array([ 
          // dreieck vorne 
          .75,0,0,1, 0.63,0.36,0.22,1, .75,0,0,1, 
          //haus vorne
          0.83,.81,0.81,1,  0.83,.81,0.81,1, .75,0,0,1, 
          0.83,.81,0.81,1, .75,0,0,1, .75,0,0,1,

          .75,0,0,1, .75,0,0,1, .75,0,0,1, 
          0.83,.81,0.81,1, 0.83,.81,0.81,1, .75,0,0,1, 
          0.83,.81,0.81,1, .75,0,0,1, .75,0,0,1, 
          .75,0,0,1, .75,0,0,1, .75,0,0,1, 
          // haus seite rechts
          0.83,.81,0.81,1, .75,0,0,1, .75,0,0,1, 
          .75,0,0,1, 0.83,.81,0.81,1, 0.83,.81,0.81,1, 
          // haus hinten
          .75,0,0,1, 0.83,.81,0.81,1, .75,0,0,1, 
          0.83,.81,0.81,1, 0.83,.81,0.81,1, .75,0,0,1, 
          // dach dreieck hinten
          0.63,0.36,0.22,1, .75,0,0,1, .75,0,0,1,
          // haus seite links
          .75,0,0,1, .75,0,0,1, 0.83,.81,0.81,1, 
          0.83,.81,0.81,1, 0.83,.81,0.81,1, .75,0,0,1, 
          // haus dach links
          0.28,0.28,0.28,1, 0.83,.81,0.81,1, 0.83,.81,0.81,1, 
          0.28,0.28,0.28,1, 0.83,.81,0.81,1, 0.28,0.28,0.28,1,
          // haus dach rechts
          0.28,0.28,0.28,1, 0.83,.81,0.81,1, 0.83,.81,0.81,1, 
          0.28,0.28,0.28,1, 0.83,.81,0.81,1, 0.28,0.28,0.28,1,
          // haus tür
          0.83,.81,0.81,1, 0.38,.59,0.2,1, 0.38,.59,0.2,1, 
          0.38,.59,0.2,1, 0.83,.81,0.81,1, 0.83,.81,0.81,1, 

          // haus wirbel vorne links
          0.93,.91,0.91,1, .64,.48,.40,1, 0.93,.91,0.91,1, 
          // haus wirbel vorne rechts
          0.93,.91,0.91,1, .64,.48,.40,1, 0.93,.91,0.91,1, 
          // haus wirbel vorne links
          0.93,.91,0.91,1, .64,.48,.40,1, 0.93,.91,0.91,1,
          // haus wirbel vorne links
          0.93,.91,0.91,1, .64,.48,.40,1, 0.93,.91,0.91,1,
   

     


           
    

                    


           ]);          
      // Index data.
      //var indices = new Uint16Array([ 0,1,2, 0,2,3 ]);

var gl = null;
var program;


function start() {
  document.getElementById('page-footer').style.overflow = 'visible';
  document.getElementById('page-footer').style.opacity = '1';
var canvas = document.getElementById('glcanvas');

gl = canvas.getContext('experimental-webgl');

// Fragment Shader
var fshader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fshader, fragmentShaderCode);
gl.compileShader(fshader);

// Vertex Shader
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL)
var vshader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vshader, vertexShaderCode);
gl.compileShader(vshader);


program = gl.createProgram();
gl.attachShader(program, fshader);
gl.attachShader(program, vshader);
gl.linkProgram(program);


gl.validateProgram(program);
gl.useProgram(program);

var vattrib = gl.getAttribLocation(program, 'ppos');
gl.enableVertexAttribArray(vattrib);

var vbuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);







gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

gl.vertexAttribPointer(vattrib, 3, gl.FLOAT, false, 0, 0);



 // Setup color vertex buffer object.
 var vboCol = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
 gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
 // Bind vertex buffer to attribute variable.
 var colAttrib = gl.getAttribLocation(program, 'col');
 gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
 gl.enableVertexAttribArray(colAttrib);


// neuZeichnen() wird alle 45 ms aufgerufen
setInterval("neuZeichnen();", 45);
}

function drehen() {
if (!kontinuierlichDrehen)
  winkelYSetter = winkelYSetter - 10;
}

window.onkeyup = function (evt) {
// console.log(evt);
var key = evt.which ? evt.which : evt.keyCode;
var c = String.fromCharCode(key);
switch (c) {
  case ('R'):
    kontinuierlichDrehen = !kontinuierlichDrehen;
    break;
}
};


// Funktion zeichnet die Szene neu
function neuZeichnen() {
if (!gl)
  return;


if (kontinuierlichDrehen) {
  winkelYSetter = winkelYSetter - 2;
}



var winkelX = 20;
var winkelY = winkelYSetter;
var winkelZ = 0;


// Werte in Bogenmaß umwandeln
winkelX *= 2 * Math.PI / 360; winkelY *= 2 * Math.PI / 360; winkelZ *= 2 * Math.PI / 360;

var winkelMvp = gl.getUniformLocation(program, "mvp");

var rotationsWinkelMatrix = transformationsMatrixErstellen(winkelX, winkelY, winkelZ);

gl.uniformMatrix4fv(winkelMvp, false, rotationsWinkelMatrix);

gl.clearColor(0.18, 0.31, 0.31, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
gl.flush();
}

// Aus Rotationen (Winkel) eine Transformationsmatrix erstellen
function transformationsMatrixErstellen(rotationX, rotationY, rotationZ) {
var cosinusX = Math.cos(rotationX);
var sinusX = Math.sin(rotationX);
var cosinusY = Math.cos(rotationY);
var sinusY = Math.sin(rotationY);
var cosinusZ = Math.cos(rotationZ);
var sinusZ = Math.sin(rotationZ);

return new Float32Array([cosinusY * cosinusZ, (sinusX * sinusY * cosinusZ - cosinusX * sinusZ), (sinusX * sinusZ + cosinusX * sinusY * cosinusZ), 0,
cosinusY * sinusZ, (sinusX * sinusY * sinusZ + cosinusX * cosinusZ), (cosinusX * sinusY * sinusZ - sinusX * cosinusZ), 0,
-sinusY, sinusX * cosinusY, cosinusX * cosinusY, 0,
  0, 0, 0, 1]);
}


















/*




const canvas = document.getElementById('canvas');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const gl2 = canvas.getContext('experimental-webgl');

gl2.clearColor(0.18, 0.31, 0.31, 1);

const vsSource = 'attribute vec2 pos;'
  + 'void main(){gl_Position = vec4(pos, 0, 1); }';
const vs = gl2.createShader(gl2.VERTEX_SHADER);
gl2.shaderSource(vs, vsSource);
gl2.compileShader(vs);

let fsSouce = 'void main() { gl_FragColor = vec4(1, 1, 1, 1); }';
const fs = gl2.createShader(gl2.FRAGMENT_SHADER);
gl2.shaderSource(fs, fsSouce);
gl2.compileShader(fs);

const prog = gl2.createProgram();
gl2.attachShader(prog, vs);
gl2.attachShader(prog, fs);
gl2.linkProgram(prog);
gl2.useProgram(prog);

const vertices2 = new Float32Array([
  0, -0.55, // katze zunge mitte
  0, -0.7,
  -0.25, -0.1, // katze auge links innen
  -0.15, -0.2,
  -0.25, -0.1, // katze auge links außen
  -0.35, -0.2,
  0.25, -0.1, // katze auge rechts innen
  0.15, -0.2,
  0.25, -0.1, // katze auge rechts außen
  0.35, -0.2,
  0.1, -0.35, // katze nase rechts
  0, -0.45,
  -0.1, -0.35, // katze nase links
  0, -0.45,
  -0.2, 0, // katze oberseite
  0.2, 0,
  -0.5, -0.9, // katze unterseite
  0.5, -0.9,
  -0.5, -0.9, // katze linke seite
  -0.5, 0.9,
  .5, -0.9, // katze rechte seite
  .5, .9,
  -0.5, .9, // katze ohr links
  -0.2, 0,
  0.5, .9, // katze ohr rechts
  0.2, 0,
  -0.15, -0.5, // katze mundwinkel links
  -0.15, -0.55,
  0.15, -0.5, // katze mundwinkel rechts
  0.15, -0.55,
  -0.1, -0.55, // katze zunge links
  -0.1, -0.6,
  0.1, -0.55, // katze zunge rechts
  0.1, -0.6,
  0.1, -0.6, // katze zunge schräg rechts
  0, -0.7,
  -0.1, -0.6, // katze zunge schräg links
  0, -0.7,
  0.25, -0.45, // katze schnurrhaar rechts oben
  0.4, -0.4,
  0.25, -0.55, // katze schnurrhaar rechts mitte
  0.4, -0.55,
  0.25, -0.65, // katze schnurrhaar rechts unten
  0.4, -0.7,
  -0.25, -0.45, // katze schnurrhaar links oben
  -0.4, -0.4,
  -0.25, -0.55, // katze schnurrhaar links mitte
  -0.4, -0.55,
  -0.25, -0.65, // katze schnurrhaar links unten
  -0.4, -0.7,
  0.15, -0.55, // katze mund mitte
  -0.15, -0.55,
  0.1, -0.35, // katze nase oben
  -0.1, -0.35,
  0, -0.45, // katze nase strich
  0, -0.55,
]);

const vbo = gl2.createBuffer();
gl2.bindBuffer(gl2.ARRAY_BUFFER, vbo);
gl2.bufferData(gl2.ARRAY_BUFFER, vertices2, gl2.STATIC_DRAW);

const posAttrib = gl2.getAttribLocation(prog, 'pos');
gl2.vertexAttribPointer(posAttrib, 2, gl2.FLOAT, false, 0, 0);
gl2.enableVertexAttribArray(posAttrib);

gl2.clear(gl2.COLOR_BUFFER_BIT);
gl2.drawArrays(gl2.LINES, 0, vertices2.length / 2);



*/






const canvas = document.getElementById('canvas');


canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const gl2 = canvas.getContext('experimental-webgl');

gl2.clearColor(0.18, 0.31, 0.31, 1);

//const vsSource = 'attribute vec2 pos;'
 // + 'void main(){gl_Position = vec4(pos, 0, 1); }';
 // Compile vertex shader.
 var vsSource = ''+
 'attribute vec3 pos;'+
 'attribute vec4 col;'+
 'varying vec4 color2;'+
 'void main(){'+
     'color2 = col;'+                 
     'gl_Position = vec4(pos, 1);'+
 '}';
const vs = gl2.createShader(gl2.VERTEX_SHADER);
gl2.shaderSource(vs, vsSource);
gl2.compileShader(vs);

//let fsSouce = 'void main() { gl_FragColor = vec4(1, 1, 1, 1); }';
// Compile fragment shader.
fsSouce = 'precision mediump float;'+ 
'varying vec4 color2;'+
'void main() {'+
    'gl_FragColor = color2;'+
'}';
const fs = gl2.createShader(gl2.FRAGMENT_SHADER);
gl2.shaderSource(fs, fsSouce);
gl2.compileShader(fs);

const prog = gl2.createProgram();
gl2.attachShader(prog, vs);
gl2.attachShader(prog, fs);
gl2.linkProgram(prog);
gl2.useProgram(prog);






var c = 0.75;

var katzeAugeLinksAussen = [-0.35 * c, -0.2 * c];
var katzeAugeLinksMitte = [-0.25 * c, -0.1 * c];
var katzeAugeLinksMitteUnten = [-0.23 * c, -0.2 * c];
var katzeAugeLinksInnen = [-0.15 * c, -0.2 * c];

var katzeAugeRechtsAussen = [0.35 * c, -0.2 * c];
var katzeAugeRechtsMitte = [0.25 * c, -0.1 * c];
var katzeAugeRechtsMitteUnten = [0.27 * c, -0.2 * c];
var katzeAugeRechtsInnen = [0.15 * c, -0.2 * c];

var katzeNaseLinks = [-0.1 * c, -0.35 * c];
var katzeNaseRechts = [0.1 * c, -0.35 * c];
var katzeNaseUnten = [ 0 * c, -0.45 * c];

var katzeKopfLinksOben = [-0.2 * c, 0 * c];
var katzeKopfRechtsOben = [0.2 * c, 0 * c];
var katzeKopfLinksUnten = [-0.5 * c, -0.9 * c];
var katzeKopfRechtsUnten = [0.5 * c, -0.9 * c];

var katzeOhrLinksMitte = [-0.5 * c, 0.9 * c];
var katzeOhrLinksAussen = [-0.5 * c, 0 * c];
var katzeOhrLinksInnen = [-0.2 * c, 0 * c];

var katzeOhrRechtsMitte = [0.5 * c, 0.9 * c];
var katzeOhrRechtsAussen = [0.5 * c, 0 * c];
var katzeOhrRechtsInnen = [0.2 * c, 0 * c];

var katzeMundLinks = [-0.15 * c, -0.55 * c];
var katzeMundRechts = [0.15 * c, -0.55 * c];
var katzeMundwinkelLinksUnten = [-0.15 * c, -0.55 * c];
var katzeMundwinkelLinksOben = [-0.15 * c, -0.5 * c];
var katzeMundwinkelRechtsUnten = [0.15 * c, -0.55 * c];
var katzeMundwinkelRechtsOben = [0.15 * c, -0.5 * c];

var katzeZungeLinksOben = [-0.1 * c, -0.55 * c];
var katzeZungeLinksUnten = [-0.1 * c, -0.6 * c];
var katzeZungeRechtsOben = [0.1 * c, -0.55 * c];
var katzeZungeRechtsUnten = [0.1 * c, -0.6 * c];
var katzeZungeMittellinieUnten = [0 * c, -0.7 * c];
var katzeZungeMittellinieOben = [0 * c, -0.55 * c];

var katzeSchnurrhaarLinksUntenInnen = [-0.25 * c, -0.65 * c];
var katzeSchnurrhaarLinksUntenAussen = [-0.4 * c, -0.7 * c];

var katzeSchnurrhaarLinksMitteInnen = [-0.25 * c, -0.55 * c];
var katzeSchnurrhaarLinksMitteAussen = [-0.4 * c, -0.55 * c];

var katzeSchnurrhaarLinksObenInnen = [-0.25 * c, -0.45 * c];
var katzeSchnurrhaarLinksObenAussen = [-0.4 * c, -0.4 * c];


var katzeSchnurrhaarRechtsUntenInnen = [0.25 * c, -0.65 * c];
var katzeSchnurrhaarRechtsUntenAussen = [0.4 * c, -0.7 * c];

var katzeSchnurrhaarRechtsMitteInnen = [0.25 * c, -0.55 * c];
var katzeSchnurrhaarRechtsMitteAussen = [0.4 * c, -0.55 * c];

var katzeSchnurrhaarRechtsObenInnen = [0.25 * c, -0.45 * c];
var katzeSchnurrhaarRechtsObenAussen = [0.4 * c, -0.4 * c];

var katzeKoerperLinks = [-0.50 * c, -4/3 * c];
var katzeKoerperRechts = [0.50 * c, -4/3 * c];

var katzePfoteLinksUntenAussen = [-0.45 * c, -4/3 * c];
var katzePfoteLinksUntenInnen = [-0.15 * c,  -4/3 * c];

var katzePfoteLinksObenAussen = [-0.45 * c, -1.05 * c];
var katzePfoteLinksObenInnen = [-0.15 * c,  -1.05 * c];

var katzePfoteRechtsUntenAussen = [0.45 * c, -4/3 * c];
var katzePfoteRechtsUntenInnen = [0.15 * c,  -4/3 * c];

var katzePfoteRechtsObenAussen = [0.45 * c, -1.05 * c];
var katzePfoteRechtsObenInnen = [0.15 * c,  -1.05 * c];

var katzePfoteStrichtLinksObenAussen = [-0.35 * c, -1.15 * c];
var katzePfoteStrichtLinksObenInnen = [-0.25 * c,  -1.15 * c];
var katzePfoteStrichtLinksUntenAussen = [-0.35 * c, -4/3 * c];
var katzePfoteStrichtLinksUntenInnen = [-0.25 * c,  -4/3 * c];

var katzePfoteStrichtRechtsObenAussen = [0.35 * c, -1.15 * c];
var katzePfoteStrichtRechtsObenInnen = [0.25 * c,  -1.15 * c];
var katzePfoteStrichtRechtsUntenAussen = [0.35 * c, -4/3 * c];
var katzePfoteStrichtRechtsUntenInnen = [0.25 * c,  -4/3 * c];





const vertices2 = new Float32Array([

  katzeOhrRechtsAussen[0], katzeOhrRechtsAussen[1], 0, // katze kopf
  katzeKopfLinksUnten[0], katzeKopfLinksUnten[1], 0,
  katzeKopfRechtsUnten[0], katzeKopfRechtsUnten[1], 0,

  katzeOhrRechtsAussen[0], katzeOhrRechtsAussen[1],  0,
  katzeOhrLinksAussen[0], katzeOhrLinksAussen[1], 0,
  katzeKopfLinksUnten[0], katzeKopfLinksUnten[1], 0,

  katzeKopfLinksUnten[0], katzeKopfLinksUnten[1], 0, // katze körper
  katzeKopfRechtsUnten[0], katzeKopfRechtsUnten[1], 0,
  katzeKoerperLinks[0], katzeKoerperLinks[1], 0,

  katzeKoerperLinks[0], katzeKoerperLinks[1],  0,
  katzeKoerperRechts[0], katzeKoerperRechts[1], 0,
  katzeKopfRechtsUnten[0], katzeKopfRechtsUnten[1], 0,

  katzePfoteLinksObenAussen[0], katzePfoteLinksObenAussen[1], 0, // katze pfote links
  katzePfoteLinksObenInnen[0], katzePfoteLinksObenInnen[1], 0,
  katzePfoteLinksUntenInnen[0], katzePfoteLinksUntenInnen[1], 0,

  katzePfoteLinksUntenAussen[0], katzePfoteLinksUntenAussen[1],  0,
  katzePfoteLinksUntenInnen[0], katzePfoteLinksUntenInnen[1], 0,
  katzePfoteLinksObenAussen[0], katzePfoteLinksObenInnen[1], 0,

  katzePfoteLinksUntenAussen[0]+.05, katzePfoteLinksUntenAussen[1], 0, // katze pfote links außen
  katzePfoteStrichtLinksObenAussen[0], katzePfoteStrichtLinksObenAussen[1], 0,
  katzePfoteStrichtLinksUntenAussen[0], katzePfoteStrichtLinksUntenAussen[1], 0,

  katzePfoteLinksUntenInnen[0]-.06, katzePfoteLinksUntenInnen[1],  0,// katze pfote links innen
  katzePfoteStrichtLinksObenInnen[0], katzePfoteStrichtLinksObenInnen[1], 0,
  katzePfoteStrichtLinksUntenInnen[0], katzePfoteStrichtLinksUntenInnen[1], 0,




  katzePfoteRechtsObenAussen[0], katzePfoteRechtsObenAussen[1], 0, // katze pfote rechts
  katzePfoteRechtsObenInnen[0], katzePfoteRechtsObenInnen[1], 0,
  katzePfoteRechtsUntenInnen[0], katzePfoteRechtsUntenInnen[1], 0,

  katzePfoteRechtsUntenAussen[0], katzePfoteRechtsUntenAussen[1],  0,
  katzePfoteRechtsUntenInnen[0], katzePfoteRechtsUntenInnen[1], 0,
  katzePfoteRechtsObenAussen[0], katzePfoteRechtsObenAussen[1], 0,


  katzePfoteRechtsUntenAussen[0]-.05, katzePfoteRechtsUntenAussen[1], 0, // katze pfote rechts außen
  katzePfoteStrichtRechtsObenAussen[0], katzePfoteStrichtRechtsObenAussen[1], 0,
  katzePfoteStrichtRechtsUntenAussen[0], katzePfoteStrichtRechtsUntenAussen[1], 0,

  katzePfoteRechtsUntenInnen[0]+.09, katzePfoteRechtsUntenInnen[1], 0, // katze pfote rechts innen
  katzePfoteStrichtRechtsObenInnen[0], katzePfoteStrichtRechtsObenInnen[1], 0,
  katzePfoteStrichtRechtsUntenInnen[0], katzePfoteStrichtRechtsUntenInnen[1], 0,



  katzeZungeMittellinieOben[0],katzeZungeMittellinieOben[1], 0,  // katze zunge links
  katzeZungeMittellinieUnten[0],katzeZungeMittellinieUnten[1], 0,
  katzeZungeLinksUnten[0],katzeZungeLinksUnten[1], 0,

  katzeZungeLinksOben[0],katzeZungeLinksOben[1], 0,
  katzeZungeLinksUnten[0],katzeZungeLinksUnten[1], 0,
  katzeZungeMittellinieOben[0],katzeZungeMittellinieOben[1],   0,

  katzeZungeMittellinieOben[0],katzeZungeMittellinieOben[1], 0,  // katze zunge rechts
  katzeZungeMittellinieUnten[0],katzeZungeMittellinieUnten[1], 0,
  katzeZungeRechtsUnten[0],katzeZungeRechtsUnten[1], 0,

  katzeZungeRechtsOben[0],katzeZungeRechtsOben[1], 0,
  katzeZungeRechtsUnten[0],katzeZungeRechtsUnten[1], 0,
  katzeZungeMittellinieOben[0],katzeZungeMittellinieOben[1],   0,


  katzeNaseLinks[0],katzeNaseLinks[1], 0,  // katze nase 
  katzeNaseUnten[0],katzeNaseUnten[1], 0,
  katzeNaseRechts[0],katzeNaseRechts[1],   0,

 
  katzeAugeLinksAussen[0],katzeAugeLinksAussen[1], 0, // katze auge links aussen
  katzeAugeLinksMitte[0],katzeAugeLinksMitte[1], 0,
  katzeAugeLinksMitteUnten[0],katzeAugeLinksMitteUnten[1], 0,
  //katzeAugeLinksInnen[0],katzeAugeLinksInnen[1], 0,

  katzeAugeLinksInnen[0],katzeAugeLinksInnen[1], 0, // katze auge links innen
  katzeAugeLinksMitteUnten[0],katzeAugeLinksMitteUnten[1], 0,
  //katzeAugeLinksMitteUnten[0],katzeAugeLinksMitteUnten[1], 0,
  katzeAugeLinksMitte[0],katzeAugeLinksMitte[1], 0,

 
  katzeAugeRechtsAussen[0],katzeAugeRechtsAussen[1], 0, // katze auge rechts aussen
  katzeAugeRechtsMitteUnten[0],katzeAugeRechtsMitteUnten[1], 0, 
  katzeAugeRechtsMitte[0],katzeAugeRechtsMitte[1], 0,

  katzeAugeRechtsInnen[0],katzeAugeRechtsInnen[1], 0, // katze auge rechts innen
  katzeAugeRechtsMitteUnten[0],katzeAugeRechtsMitteUnten[1], 0, 
  katzeAugeRechtsMitte[0],katzeAugeRechtsMitte[1], 0,

  
  katzeSchnurrhaarLinksUntenInnen[0], katzeSchnurrhaarLinksUntenInnen[1], 0, // katze schnurrhaar links unten
  katzeSchnurrhaarLinksUntenAussen[0], katzeSchnurrhaarLinksUntenAussen[1], 0,
  katzeSchnurrhaarLinksMitteInnen[0], katzeSchnurrhaarLinksMitteInnen[1]-.02, 0,

  katzeSchnurrhaarLinksUntenInnen[0], katzeSchnurrhaarLinksUntenInnen[1]+.05, 0, // katze schnurrhaar links mitte
  katzeSchnurrhaarLinksMitteAussen[0], katzeSchnurrhaarLinksMitteAussen[1], 0,
  katzeSchnurrhaarLinksObenInnen[0], katzeSchnurrhaarLinksObenInnen[1]-.05, 0,

  katzeSchnurrhaarLinksObenInnen[0], katzeSchnurrhaarLinksObenInnen[1], 0, // katze schnurrhaar links oben
  katzeSchnurrhaarLinksObenAussen[0], katzeSchnurrhaarLinksObenAussen[1], 0,
  katzeSchnurrhaarLinksMitteInnen[0], katzeSchnurrhaarLinksMitteInnen[1]+.02, 0,

  katzeSchnurrhaarRechtsUntenInnen[0], katzeSchnurrhaarRechtsUntenInnen[1], 0, // katze schnurrhaar rechts unten
  katzeSchnurrhaarRechtsUntenAussen[0], katzeSchnurrhaarRechtsUntenAussen[1], 0,
  katzeSchnurrhaarRechtsMitteInnen[0], katzeSchnurrhaarRechtsMitteInnen[1]-.02, 0,

  katzeSchnurrhaarRechtsUntenInnen[0], katzeSchnurrhaarRechtsUntenInnen[1]+.05, 0, // katze schnurrhaar rechts mitte
  katzeSchnurrhaarRechtsMitteAussen[0], katzeSchnurrhaarRechtsMitteAussen[1], 0,
  katzeSchnurrhaarRechtsObenInnen[0], katzeSchnurrhaarRechtsObenInnen[1]-.05, 0,

  katzeSchnurrhaarRechtsObenInnen[0], katzeSchnurrhaarRechtsObenInnen[1], 0, // katze schnurrhaar rechts oben
  katzeSchnurrhaarRechtsObenAussen[0], katzeSchnurrhaarRechtsObenAussen[1], 0,
  katzeSchnurrhaarRechtsMitteInnen[0], katzeSchnurrhaarRechtsMitteInnen[1]+.02, 0,


  
  katzeNaseUnten[0], katzeNaseUnten[1], 0,// katze mund links
  katzeMundwinkelLinksOben[0], katzeMundwinkelLinksOben[1], 0,
  katzeZungeMittellinieOben[0], katzeZungeMittellinieOben[1], 0,

  katzeZungeMittellinieOben[0], katzeZungeMittellinieOben[1],  0,
  katzeMundwinkelLinksOben[0], katzeMundwinkelLinksOben[1], 0,
  katzeMundwinkelLinksUnten[0], katzeMundwinkelLinksUnten[1], 0,

  katzeNaseUnten[0], katzeNaseUnten[1], 0, // katze mund rechts
  katzeMundwinkelRechtsOben[0], katzeMundwinkelRechtsOben[1], 0,
  katzeZungeMittellinieOben[0], katzeZungeMittellinieOben[1], 0,

  katzeZungeMittellinieOben[0], katzeZungeMittellinieOben[1],  0,
  katzeMundwinkelRechtsOben[0], katzeMundwinkelRechtsOben[1], 0,
  katzeMundwinkelRechtsUnten[0], katzeMundwinkelRechtsUnten[1], 0,


  katzeOhrLinksAussen[0], katzeOhrLinksAussen[1], 0, // katze ohr links
  katzeOhrLinksMitte[0], katzeOhrLinksMitte[1], 0,
  katzeOhrLinksInnen[0], katzeOhrLinksInnen[1], 0,

  katzeOhrRechtsAussen[0], katzeOhrRechtsAussen[1], 0, // katze ohr rechts
  katzeOhrRechtsMitte[0], katzeOhrRechtsMitte[1], 0,
  katzeOhrRechtsInnen[0], katzeOhrRechtsInnen[1], 0,

// schatten pfote links
  katzePfoteLinksObenAussen[0],  katzePfoteLinksObenAussen[1],0,
  katzeKoerperLinks[0],  katzeKoerperLinks[1],0,
  katzePfoteLinksUntenAussen[0],  katzePfoteLinksUntenAussen[1],0,
// schatten pfote rechts
katzePfoteRechtsObenInnen[0],  katzePfoteRechtsObenAussen[1],0,
katzeKoerperLinks[0]+.45,  katzeKoerperLinks[1],0,
katzePfoteRechtsUntenInnen[0],  katzePfoteRechtsUntenInnen[1],0,
 
// schatten zunge
katzeZungeMittellinieUnten[0],  katzeZungeMittellinieUnten[1],0,
katzeZungeLinksUnten[0]-.03,  katzeZungeLinksUnten[1]-.03,0,
katzeZungeLinksUnten[0],  katzeZungeLinksUnten[1],0,

katzeZungeLinksOben[0],  katzeZungeLinksOben[1],0,
katzeZungeLinksUnten[0]-.03,  katzeZungeLinksUnten[1]-.03,0,
katzeMundwinkelLinksUnten[0],  katzeMundwinkelLinksUnten[1],0,

katzeZungeLinksUnten[0]-.03,  katzeZungeLinksUnten[1]-.03,0,
katzeZungeLinksOben[0],  katzeZungeLinksOben[1],0,
katzeZungeLinksUnten[0],  katzeZungeLinksUnten[1],0,


//87


  
]);

var colorGrey = [0.4, 0.4, 0.4, 1];
 // Colors as rgba.
 var colors2 = new Float32Array([ 
   // kopf
   0.70,0.70, 0.70,1, .52,0.52,0.52,1, .52,0.52,0.52,1,
   0.70, 0.70, 0.70,1, 0.25,0.25,0.25,1, .52,0.52,0.52,1,
  // koerper
  .57,0.57,0.57,1, .57,0.57,0.57,1, .57,0.57,0.57,1,
  .57,0.57,0.57,1, .57,0.57,0.57,1, .57,0.57,0.57,1,

  //pfote links
  0.88,0.88,0.88,1, 0.88,0.88,0.88,1, 0.88,0.88,0.88,1, 
0.88,0.88,0.88,1, 0.88,0.88,0.88,1, 0.88,0.88,0.88,1, 
//pfote links innen
.4,0.4,0.4,1, .4,0.4,0.4,1, .4,0.4,0.4,1,
  //pfote links außen
.4,0.4,0.4,1, .4,0.4,0.4,1, .4,0.4,0.4,1,
  //pfote rechts
  0.98,0.98,0.98,1, 0.98,0.98,0.98,1, 0.98,0.98,0.98,1, 
  0.98,0.98,0.98,1, 0.98,0.98,0.98,1, 0.98,0.98,0.98,1, 
//pfote rechts innen
.8,0.8,0.8,1, .8,0.8,0.8,1, .4,0.4,0.4,1,
//pfote rechts außen
.8,0.8,0.8,1, .8,0.8,0.8,1, .4,0.4,0.4,1,
// zunge links
  .55,.23,.38,1, .55,.23,.38,1, .55,.23,.38,1,
  .55,.23,.38,1, .55,.23,.38,1, .55,.23,.38,1,
  //zunge rechts
  .65,.33,.48,1, .65,.33,.48,1, .85,.53,.68,1,
  .85,.53,.68,1, .85,.53,.68,1, .65,.33,.48,1,
  // nase
  0.55,.37,0.40,1, 0.55,.37,0.40,1, 0.85,.67,0.70,1,
  //auge links aussen
  .43,0.68,0.39,1, .85,0.85,0.85,1, .53,0.78,0.49,1,
  //auge links innen
  0.25,0.25,0.25,1, 0.25,0.25,0.25,1, .85,0.85,0.85,1,
  // auge rechts aussen
  0.25,0.25,0.25,1, 0.25,0.25,0.25,1, 0.85,0.85,0.85,1,
    // auge rechts innen
    .43,0.68,0.39,1, .53,0.78,0.49,1, .85,0.85,0.85,1,
  // schnurrhaar links unten
  .4,0.4,0.4,1, .2,0.2,0.2,1, .4,0.4,0.4,1,
// schnurrhaar links mitte
.8,0.8,0.8,1,  0.6,0.6,0.6,1,  0.80,0.80,0.80,1,  
// schnurrhaar links oben
.88,0.88,0.88,1, 0.68,0.68,0.68,1, 0.88,0.88,0.88,1, 
// schnurrhaar rechts unten
.4,0.4,0.4,1, .5,0.5,0.5,1, .4,0.4,0.4,1,
  // schnurrhaar rechts mitte
  0.80,0.80,0.80,1,  1,1,1,1, 0.80,0.80,0.80,1,  
// schnurrhaar rechts oben
0.88,0.88,0.88,1, 1,1,1,1, 0.88,0.88,0.88,1, 
// mund links
0.88,0.88,0.88,1, 0.88,0.88,0.88,1, 0.88,0.88,0.88,1, 
0.88,0.88,0.88,1, 0.88,0.88,0.88,1, 0.88,0.88,0.88,1, 
// mund rechts
0.98,0.98,0.98,1, 1,1,1,1, 0.98,0.98,0.98,1, 
0.98,0.98,0.98,1, 1.,1,1,1, 1,1,1,1, 
// ohr links
0.25,0.25,0.25,1, 0.25,0.25,0.25,1,0.25,0.25,0.25,1,
// ohr rechts
0.98,0.98,0.98,1, 0.98,0.98,0.98,1, 0.68,0.68,0.68,1, 

// schatten pfote links
.4,0.4,0.4,1, .5,0.5,0.5,1, .4,0.4,0.4,1,


// schatten pfote rechts
.3,0.3,0.3,1, .5,0.5,0.5,1, .3,0.3,0.3,1,
 
// schatten zunge
.3,0.3,0.3,1, .5,0.5,0.5,1, .3,0.3,0.3,1,

.3,0.3,0.3,1, .5,0.5,0.5,1, .3,0.3,0.3,1,

.5,0.5,0.5,1, .3,0.3,0.3,1, .3,0.3,0.3,1,

            


   ]);          
// Index data.
//var indices = new Uint16Array([ 0,1,2, 0,2,3 ]);

// Setup position vertex buffer object.
var vboPos = gl2.createBuffer();
//const vbo = gl2.createBuffer();
//gl2.bindBuffer(gl2.ARRAY_BUFFER, vbo);
gl2.bindBuffer(gl2.ARRAY_BUFFER, vboPos);
//gl2.bufferData(gl2.ARRAY_BUFFER, vertices2, gl2.STATIC_DRAW);
gl2.bufferData(gl2.ARRAY_BUFFER, vertices2, gl2.STATIC_DRAW);

//const posAttrib = gl2.getAttribLocation(prog, 'pos');
// Bind vertex buffer to attribute variable.
var posAttrib = gl2.getAttribLocation(prog, 'pos');
//gl2.vertexAttribPointer(posAttrib, 2, gl2.FLOAT, false, 0, 0);
//gl2.enableVertexAttribArray(posAttrib);
gl2.vertexAttribPointer(posAttrib, 3, gl2.FLOAT, false, 0, 0);
gl2.enableVertexAttribArray(posAttrib);

   
    // Setup color vertex buffer object.
    var vboCol = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, vboCol);
    gl2.bufferData(gl2.ARRAY_BUFFER, colors2, gl2.STATIC_DRAW);
    // Bind vertex buffer to attribute variable.
    var colAttrib = gl2.getAttribLocation(prog, 'col');
    gl2.vertexAttribPointer(colAttrib, 4, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(colAttrib);

   


gl2.clear(gl2.COLOR_BUFFER_BIT);
gl2.drawArrays(gl2.TRIANGLES, 0, vertices2.length / 3);








$(document).ready(function () {
    $('.modal').modal();
});
