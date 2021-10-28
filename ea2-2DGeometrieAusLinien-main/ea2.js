fragmentShaderCode =
'void main(void) {' +
'  gl_FragColor = vec4(1, 1, 1,1);' +
'}';

vertexShaderCode =
'attribute vec3 ppos;' +
'uniform mat4 mvp;' +
'void main(void) {' +
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


var winkelYSetter = -45;

var kontinuierlichDrehen = false;






var pointArray = [];
pointArray = [
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
//

// Haus vorne
vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],
dachSpitzeVorne[0], dachSpitzeVorne[1], dachSpitzeVorne[2],
vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],
vorneRechtsUnten[0], vorneRechtsUnten[1], vorneRechtsUnten[2],
vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],
vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],

// Haus Seite Rechts
hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
vorneRechtsUnten[0], vorneRechtsUnten[1], vorneRechtsUnten[2],
vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],


// Haus Hinten
hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],
hintenLinksUnten[0], hintenLinksUnten[1], hintenLinksUnten[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
dachSpitzeHinten[0], dachSpitzeHinten[1], dachSpitzeHinten[2],
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
// kreuz
hintenRechtsUnten[0], hintenRechtsUnten[1], hintenRechtsUnten[2],
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
hintenLinksUnten[0], hintenLinksUnten[1], hintenLinksUnten[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
//


// Haus Seite Links
vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],
hintenLinksUnten[0], hintenLinksUnten[1], hintenLinksUnten[2],
vorneLinksUnten[0], vorneLinksUnten[1], vorneLinksUnten[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],


// Haus Dach Links
dachSpitzeVorne[0], dachSpitzeVorne[1], dachSpitzeVorne[2],
dachSpitzeHinten[0], dachSpitzeHinten[1], dachSpitzeHinten[2],
//kreuz
vorneLinksOben[0], vorneLinksOben[1], vorneLinksOben[2],
dachSpitzeVorne[0], dachSpitzeVorne[1], dachSpitzeVorne[2],
hintenLinksOben[0], hintenLinksOben[1], hintenLinksOben[2],
dachSpitzeHinten[0], dachSpitzeHinten[1], dachSpitzeHinten[2],
//



// Haus Dach Rechts
vorneRechtsOben[0], vorneRechtsOben[1], vorneRechtsOben[2],
hintenRechtsOben[0], hintenRechtsOben[1], hintenRechtsOben[2],
dachSpitzeVorne[0], dachSpitzeVorne[1], dachSpitzeVorne[2],

// Haus Dach Vorne kreuz
//mitteDachVorneLinks[0],     mitteDachVorneLinks[1],     mitteDachVorneLinks[2],
//vorneRechtsOben[0],     vorneRechtsOben[1],     vorneRechtsOben[2],

//mitteDachVorneRechts[0],     mitteDachVorneRechts[1],     mitteDachVorneRechts[2],
//vorneLinksOben[0],     vorneLinksOben[1],     vorneLinksOben[2],


];


// Wirbel vorne links
var spiralValues =[];

var lastPoint = {x: dachSpitzeVorne[0], y: dachSpitzeVorne[1], z: dachSpitzeVorne[2]};
pointArray.push(lastPoint.x);
pointArray.push(lastPoint.y);
pointArray.push(lastPoint.z);
for (i = 1; i < 8; i++) {
  lastPoint.y -= Math.cos(i * 5)  / (i*5);
  lastPoint.x += Math.sin(i * 5)  / (i*5);


    pointArray.push(lastPoint.x);
    pointArray.push(lastPoint.y);
    pointArray.push(lastPoint.z);


    spiralValues[[i][0]] =  lastPoint.x;
    spiralValues[[i][1]] =  lastPoint.y;
    spiralValues[[i][2]] =  lastPoint.z;
}

for (i = 1; i < spiralValues.length; i++) {



  pointArray.push( spiralValues[9-i, 0]);
  pointArray.push( spiralValues[9-i, 1]);
  pointArray.push( spiralValues[9-i, 2]);


 
}


// Wirbel vorne rechts
spiralValues =[];
lastPoint = [];

var lastPoint = {x: dachSpitzeVorne[0], y: dachSpitzeVorne[1], z: dachSpitzeVorne[2]};
pointArray.push(lastPoint.x);
pointArray.push(lastPoint.y);
pointArray.push(lastPoint.z);
for (i = 1; i < 8; i++) {
  lastPoint.y -= Math.cos(i * 5)  / (i*5);
  lastPoint.x += Math.sin(i * 5)  / (-i*5);


    pointArray.push(lastPoint.x);
    pointArray.push(lastPoint.y);
    pointArray.push(lastPoint.z);

    spiralValues[[i][0]] =  lastPoint.x;
    spiralValues[[i][1]] =  lastPoint.y;
    spiralValues[[i][2]] =  lastPoint.z;
}
for (i = 1; i < spiralValues.length; i++) {
  pointArray.push( spiralValues[9-i, 0]);
  pointArray.push( spiralValues[9-i, 1]);
  pointArray.push( spiralValues[9-i, 2]);
}

// Wirbel hinten rechts
spiralValues =[];
lastPoint = [];

var lastPoint = {x: dachSpitzeHinten[0], y: dachSpitzeHinten[1], z: dachSpitzeHinten[2]};
pointArray.push(lastPoint.x);
pointArray.push(lastPoint.y);
pointArray.push(lastPoint.z);
for (i = 1; i < 8; i++) {
  lastPoint.y -= Math.cos(i * 5)  / (i*5);
  lastPoint.x += Math.sin(i * 5)  / (-i*5);


    pointArray.push(lastPoint.x);
    pointArray.push(lastPoint.y);
    pointArray.push(lastPoint.z);

    spiralValues[[i][0]] =  lastPoint.x;
    spiralValues[[i][1]] =  lastPoint.y;
    spiralValues[[i][2]] =  lastPoint.z;
}
for (i = 1; i < spiralValues.length; i++) {
  pointArray.push( spiralValues[9-i, 0]);
  pointArray.push( spiralValues[9-i, 1]);
  pointArray.push( spiralValues[9-i, 2]);
}

// Wirbel hinten links
spiralValues =[];
lastPoint = [];

var lastPoint = {x: dachSpitzeHinten[0], y: dachSpitzeHinten[1], z: dachSpitzeHinten[2]};
pointArray.push(lastPoint.x);
pointArray.push(lastPoint.y);
pointArray.push(lastPoint.z);
for (i = 1; i < 8; i++) {
  lastPoint.y -= Math.cos(i * 5)  / (i*5);
  lastPoint.x += Math.sin(i * 5)  / (i*5);


    pointArray.push(lastPoint.x);
    pointArray.push(lastPoint.y);
    pointArray.push(lastPoint.z);

    spiralValues[[i][0]] =  lastPoint.x;
    spiralValues[[i][1]] =  lastPoint.y;
    spiralValues[[i][2]] =  lastPoint.z;
}
for (i = 1; i < spiralValues.length; i++) {
  pointArray.push( spiralValues[9-i, 0]);
  pointArray.push( spiralValues[9-i, 1]);
  pointArray.push( spiralValues[9-i, 2]);
}




var vertices = new Float32Array(pointArray);



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

gl.drawArrays(gl.LINE_STRIP, 0, vertices.length / 3);
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






var c = 0.75;

var katzeAugeLinksAussen = [-0.35 * c, -0.2 * c];
var katzeAugeLinksMitte = [-0.25 * c, -0.1 * c];
var katzeAugeLinksInnen = [-0.15 * c, -0.2 * c];

var katzeAugeRechtsAussen = [0.35 * c, -0.2 * c];
var katzeAugeRechtsMitte = [0.25 * c, -0.1 * c];
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
  katzeZungeMittellinieOben[0],katzeZungeMittellinieOben[1],  // katze zunge mitte
  katzeZungeMittellinieUnten[0],katzeZungeMittellinieUnten[1],
 
  katzeZungeLinksOben[0],katzeZungeLinksOben[1], // katze zunge links
  katzeZungeLinksUnten[0],katzeZungeLinksUnten[1],

  katzeZungeRechtsOben[0],katzeZungeRechtsOben[1], // katze zunge links
  katzeZungeRechtsUnten[0],katzeZungeRechtsUnten[1],

  katzeZungeLinksUnten[0],katzeZungeLinksUnten[1], // katze zunge schräg links
  katzeZungeMittellinieUnten[0],katzeZungeMittellinieUnten[1],

  katzeZungeRechtsUnten[0],katzeZungeRechtsUnten[1], // katze zunge schräg rechts
  katzeZungeMittellinieUnten[0],katzeZungeMittellinieUnten[1],

  katzeAugeLinksInnen[0],katzeAugeLinksInnen[1], // katze auge links innen
  katzeAugeLinksMitte[0],katzeAugeLinksMitte[1],

  katzeAugeLinksAussen[0],katzeAugeLinksAussen[1], // katze auge links außen
  katzeAugeLinksMitte[0],katzeAugeLinksMitte[1],

  katzeAugeRechtsInnen[0],katzeAugeRechtsInnen[1], // katze auge rechts innen
  katzeAugeRechtsMitte[0],katzeAugeRechtsMitte[1],

  katzeAugeRechtsAussen[0],katzeAugeRechtsAussen[1], // katze auge rechts außen
  katzeAugeRechtsMitte[0],katzeAugeRechtsMitte[1],

  katzeNaseLinks[0],katzeNaseLinks[1],  // katze nase links
  katzeNaseUnten[0],katzeNaseUnten[1],

  katzeNaseRechts[0],katzeNaseRechts[1],  // katze nase rechts
  katzeNaseUnten[0],katzeNaseUnten[1],

  katzeNaseLinks[0],katzeNaseLinks[1],  // // katze nase oben
  katzeNaseRechts[0],katzeNaseRechts[1],

  katzeNaseUnten[0],katzeNaseUnten[1],  // katze nase strich
  katzeZungeMittellinieOben[0],katzeZungeMittellinieOben[1],

  katzeKopfLinksOben[0], katzeKopfLinksOben[1], // katze oberseite
  katzeKopfRechtsOben[0], katzeKopfRechtsOben[1],
 
  katzeKopfLinksUnten[0], katzeKopfLinksUnten[1], // katze unterseite
  katzeKopfRechtsUnten[0], katzeKopfRechtsUnten[1],

  katzeKopfLinksUnten[0], katzeKopfLinksUnten[1], // katze linke seite
  katzeOhrLinksAussen[0], katzeOhrLinksAussen[1],

  katzeKopfRechtsUnten[0], katzeKopfRechtsUnten[1], // katze rechte seite
  katzeOhrRechtsAussen[0], katzeOhrRechtsAussen[1],

  katzeOhrLinksAussen[0], katzeOhrLinksAussen[1], // katze ohr links außen
  katzeOhrLinksMitte[0], katzeOhrLinksMitte[1],

  katzeOhrRechtsAussen[0], katzeOhrRechtsAussen[1], // katze ohr rechts außen
  katzeOhrRechtsMitte[0], katzeOhrRechtsMitte[1],

  katzeOhrLinksInnen[0], katzeOhrLinksInnen[1], // katze ohr links innen
  katzeOhrLinksMitte[0], katzeOhrLinksMitte[1],

  katzeOhrRechtsInnen[0], katzeOhrRechtsInnen[1], // katze ohr rechts innen
  katzeOhrRechtsMitte[0], katzeOhrRechtsMitte[1],

  katzeMundLinks[0], katzeMundLinks[1], // katze mund mitte
  katzeMundRechts[0], katzeMundRechts[1],

  katzeMundwinkelLinksOben[0], katzeMundwinkelLinksOben[1], // katze mundwinkel links
  katzeMundwinkelLinksUnten[0], katzeMundwinkelLinksUnten[1],

  katzeMundwinkelRechtsOben[0], katzeMundwinkelRechtsOben[1], // katze mundwinkel rechts
  katzeMundwinkelRechtsUnten[0], katzeMundwinkelRechtsUnten[1],

  katzeSchnurrhaarLinksObenInnen[0], katzeSchnurrhaarLinksObenInnen[1], // katze schnurrhaar links oben
  katzeSchnurrhaarLinksObenAussen[0], katzeSchnurrhaarLinksObenAussen[1],

  katzeSchnurrhaarLinksMitteInnen[0], katzeSchnurrhaarLinksMitteInnen[1], // katze schnurrhaar links mitte
  katzeSchnurrhaarLinksMitteAussen[0], katzeSchnurrhaarLinksMitteAussen[1],

  katzeSchnurrhaarLinksUntenInnen[0], katzeSchnurrhaarLinksUntenInnen[1], // katze schnurrhaar links unten
  katzeSchnurrhaarLinksUntenAussen[0], katzeSchnurrhaarLinksUntenAussen[1],

  katzeSchnurrhaarRechtsObenInnen[0], katzeSchnurrhaarRechtsObenInnen[1], // katze schnurrhaar rechts oben
  katzeSchnurrhaarRechtsObenAussen[0], katzeSchnurrhaarRechtsObenAussen[1],

  katzeSchnurrhaarRechtsMitteInnen[0], katzeSchnurrhaarRechtsMitteInnen[1], // katze schnurrhaar rechts mitte
  katzeSchnurrhaarRechtsMitteAussen[0], katzeSchnurrhaarRechtsMitteAussen[1],

  katzeSchnurrhaarRechtsUntenInnen[0], katzeSchnurrhaarRechtsUntenInnen[1], // katze schnurrhaar rechts unten
  katzeSchnurrhaarRechtsUntenAussen[0], katzeSchnurrhaarRechtsUntenAussen[1],


  katzeKopfLinksUnten[0], katzeKopfLinksUnten[1], 
  katzeKoerperLinks[0], katzeKoerperLinks[1],

  katzeKopfRechtsUnten[0], katzeKopfRechtsUnten[1], 
  katzeKoerperRechts[0], katzeKoerperRechts[1],

  katzeKoerperLinks[0], katzeKoerperLinks[1],
  katzeKoerperRechts[0], katzeKoerperRechts[1],

  

  katzePfoteLinksUntenAussen[0], katzePfoteLinksUntenAussen[1], 
  katzePfoteLinksUntenInnen[0], katzePfoteLinksUntenInnen[1],

  katzePfoteLinksObenAussen[0], katzePfoteLinksObenAussen[1], 
  katzePfoteLinksObenInnen[0], katzePfoteLinksObenInnen[1],

  katzePfoteLinksObenAussen[0], katzePfoteLinksObenAussen[1], 
  katzePfoteLinksUntenAussen[0], katzePfoteLinksUntenAussen[1],

  katzePfoteLinksObenInnen[0], katzePfoteLinksObenInnen[1],
  katzePfoteLinksUntenInnen[0], katzePfoteLinksUntenInnen[1],


  katzePfoteRechtsUntenAussen[0], katzePfoteRechtsUntenAussen[1], 
  katzePfoteRechtsUntenInnen[0], katzePfoteRechtsUntenInnen[1],

  katzePfoteRechtsObenAussen[0], katzePfoteRechtsObenAussen[1], 
  katzePfoteRechtsObenInnen[0], katzePfoteRechtsObenInnen[1],

  katzePfoteRechtsObenAussen[0], katzePfoteRechtsObenAussen[1], 
  katzePfoteRechtsUntenAussen[0], katzePfoteRechtsUntenAussen[1],

  katzePfoteRechtsObenInnen[0], katzePfoteRechtsObenInnen[1],
  katzePfoteRechtsUntenInnen[0], katzePfoteRechtsUntenInnen[1],


  katzePfoteStrichtLinksObenInnen[0], katzePfoteStrichtLinksObenInnen[1],
  katzePfoteStrichtLinksUntenInnen[0], katzePfoteStrichtLinksUntenInnen[1],

  katzePfoteStrichtLinksObenAussen[0], katzePfoteStrichtLinksObenAussen[1],
  katzePfoteStrichtLinksUntenAussen[0], katzePfoteStrichtLinksUntenAussen[1],

  katzePfoteStrichtRechtsObenInnen[0], katzePfoteStrichtRechtsObenInnen[1],
  katzePfoteStrichtRechtsUntenInnen[0], katzePfoteStrichtRechtsUntenInnen[1],

  katzePfoteStrichtRechtsObenAussen[0], katzePfoteStrichtRechtsObenAussen[1],
  katzePfoteStrichtRechtsUntenAussen[0], katzePfoteStrichtRechtsUntenAussen[1],
  


  
]);

const vbo = gl2.createBuffer();
gl2.bindBuffer(gl2.ARRAY_BUFFER, vbo);
gl2.bufferData(gl2.ARRAY_BUFFER, vertices2, gl2.STATIC_DRAW);

const posAttrib = gl2.getAttribLocation(prog, 'pos');
gl2.vertexAttribPointer(posAttrib, 2, gl2.FLOAT, false, 0, 0);
gl2.enableVertexAttribArray(posAttrib);

gl2.clear(gl2.COLOR_BUFFER_BIT);
gl2.drawArrays(gl2.LINES, 0, vertices2.length / 2);





$(document).ready(function () {
    $('.modal').modal();
});
