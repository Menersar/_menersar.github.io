var linesActivated = false;
var vertices, indicesLines, indicesTris;

start2();

function start2 () {
    linesActivated = !linesActivated;

// Get the WebGL context.
var canvas = document.getElementById('canvas2');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;



var gl = canvas.getContext('experimental-webgl');

// Pipeline setup.
gl.clearColor(0.18, 0.31, 0.31, 1);
// Backface culling.
gl.frontFace(gl.CCW);
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
// Depth(Z)-Buffer.
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);    
// Polygon offset of rastered Fragments.
gl.enable(gl.POLYGON_OFFSET_FILL);
gl.polygonOffset(1.0, 1.0);        

// Compile vertex shader. 
var vsSource = '' + 
    'attribute vec3 pos;' + 
    'attribute vec4 col;' + 
    'varying vec4 color;' + 
    'void main(){' + 'color = col;' + 
    'gl_Position = vec4(pos * 0.3, 1);' +
    '}';
var vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, vsSource);
gl.compileShader(vs);

// Compile fragment shader.
fsSouce = 'precision mediump float;' + 
    'varying vec4 color;' + 
    'void main() {' + 
    'gl_FragColor = color;' + 
    '}';
var fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, fsSouce);
gl.compileShader(fs);

// Link shader together into a program.
var prog = gl.createProgram();
gl.attachShader(prog, vs);
gl.attachShader(prog, fs);
gl.bindAttribLocation(prog, 0, "pos");
gl.linkProgram(prog);
gl.useProgram(prog);

// Vertex data.
// Positions, Index data.
// Fill the data arrays.
createVertexDataAcorn();


// Setup position vertex buffer object.
var vboPos = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
gl.bufferData(gl.ARRAY_BUFFER,
    vertices, gl.STATIC_DRAW);
// Bind vertex buffer to attribute variable.
var posAttrib = gl.getAttribLocation(prog, 'pos');
gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT,
    false, 0, 0);
gl.enableVertexAttribArray(posAttrib);

// Setup constant color.
var colAttrib = gl.getAttribLocation(prog, 'col');

// Setup lines index buffer object.
var iboLines = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    indicesLines, gl.STATIC_DRAW);
iboLines.numberOfElements = indicesLines.length;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Setup tris index buffer object.
var iboTris = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    indicesTris, gl.STATIC_DRAW);
iboTris.numberOfElements = indicesTris.length;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Clear framebuffer and render primitives.
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// Setup rendering tris.
//gl.vertexAttrib4f(colAttrib, 0.92, .28, 0.31, 1);
gl.vertexAttrib4f(colAttrib, 0.53, .26, 0.12, 1);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
gl.drawElements(gl.TRIANGLES,
    iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);

    if (linesActivated) {
// Setup rendering lines.
gl.vertexAttrib4f(colAttrib, .75, .75, .75, 1);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
gl.drawElements(gl.LINES,
    iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);
}

















gl.lineWidth(5.0);
			
			// Vertex data.
			// Positions, index data.
			var indices;
			// Fill the data arrays.
			createVertexDataStiehl();

			// Setup position vertex buffer object.
    var vboPos = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
gl.bufferData(gl.ARRAY_BUFFER,
    vertices, gl.STATIC_DRAW);
			// Bind vertex buffer to attribute variable.
var posAttrib = gl.getAttribLocation(prog, 'pos');
gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT,
    false, 0, 0);
gl.enableVertexAttribArray(posAttrib);

			// Setup constant color.
var colAttrib = gl.getAttribLocation(prog, 'col');
		//	gl.vertexAttrib4f(colAttrib, 1, 0, 0, 1);
				













// Setup lines index buffer object.
var iboLines = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    indicesLines, gl.STATIC_DRAW);
iboLines.numberOfElements = indicesLines.length;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Setup tris index buffer object.
var iboTris = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    indicesTris, gl.STATIC_DRAW);
iboTris.numberOfElements = indicesTris.length;
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Clear framebuffer and render primitives.
//gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// Setup rendering tris.
//gl.vertexAttrib4f(colAttrib, 0.92, .28, 0.31, 1);
gl.vertexAttrib4f(colAttrib, 0.53, .26, 0.12, 1);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
gl.drawElements(gl.TRIANGLES,
    iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);

    if (linesActivated) {
// Setup rendering lines.
gl.vertexAttrib4f(colAttrib, .75, .75, .75, 1);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
gl.drawElements(gl.LINES,
    iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);
    
    }


}


function createVertexDataAcorn(){
    var n = 64;
    var m = 64;
    // Positions.
    vertices = new Float32Array(3 * (n+1) * (m+1));
    // Index data.
    indicesLines = new Uint16Array(2 * 2 * n * m);
    indicesTris  = new Uint16Array(3 * 2 * n * m);

    const rangeU = { min: (0), max: (2*Math.PI) };
    const rangeV = { min: (-Math.PI), max: (Math.PI) };
    
    var du = (rangeU.max - rangeU.min) / n;
    var dv = (rangeV.max - rangeV.min) / m;
   // var r = 0.6;



    // Counter for entries in index array.
    var iLines = 0;
    var iTris = 0;
    
    // Loop angle u.
    for(var i=0, u=rangeU.min; i <= n; i++, u += du) {
        // Loop height v.
        for(var j=0, v=rangeV.min; j <= m; j++, v += dv) {
            
            var iVertex = i*(m+1) + j;

          //  var x = (2 * Math.cos(3 * u)) / (2 + Math.sin(v));
            //var y = (2 * (Math.cos(u) + 2 * Math.cos(2 * u))) / (2 + Math.cos(v + ((2 * Math.PI) / 3)));
            //var z = (Math.cos(u) - 2 * Math.cos(2 * u)) * (2 + Math.cos(v)) * (2 + Math.cos(v + ((2 * Math.PI) / 3) / 4));

            var x = Math.cos(u) * ( 4 * Math.cos(v)) * 1;
            var z = Math.sin(u) * ( 3.8 * Math.cos(v))*1;
            var y = (Math.cos(v) + Math.sin(v)-1) * (1+Math.sin(v)) * Math.log(1-Math.PI * v/5 )  + 6 * Math.sin(v)*1;


           /* var x = 5*Math.cos(u); 
            var z = 5*Math.sin(u); 
            var y = v-0.5;
            */
           
        //    var x = Math.cos(u) * (4 + 3.8 * Math.cos(v)) * 1;
          //  var z = Math.sin(u) * (4 + 3.8 * Math.cos(v))*1;

          //  var y = (Math.cos(v) + Math.sin(v)-1) * (1+Math.sin(v)) * Math.log(1-Math.PI * v/10) + 7.5 * Math.sin(v)*1;

            x = x*0.2;
            y = y*0.2;
            z = z*0.2;
                                                    
            // Set vertex positions.
            vertices[iVertex * 3] = x;
            vertices[iVertex * 3 + 1] = y;
            vertices[iVertex * 3 + 2] = z;
            
            // Set index.
            // Line on beam.
            if(j>0 && i>0){
                indicesLines[iLines++] = iVertex - 1;
                indicesLines[iLines++] = iVertex;
             }
            // Line on ring.
            if(j>0 && i>0){
                indicesLines[iLines++] = iVertex - (m+1);                            
                indicesLines[iLines++] = iVertex;
            }                   

            // Set index.
            // Two Triangles.
            if(j>0 && i>0){
                indicesTris[iTris++] = iVertex;
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m+1);
                //                            
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m+1) - 1;                            
                indicesTris[iTris++] = iVertex - (m+1);                            
            }
        }
    }
}  


















			function createVertexDataStiehl(){
        var n = 4;
        var m = 4;
        // Positions.
        vertices = new Float32Array(3 * (n+1) * (m+1));
        // Index data.
        indicesLines = new Uint16Array(2 * 2 * n * m);
        indicesTris  = new Uint16Array(3 * 2 * n * m);
        
        var du = 2*Math.PI/n;
        var dv = .2/m;
        var r = 0.05;
        // Counter for entries in index array.
        var iLines = 0;
        var iTris = 0;
        
        // Loop angle u.
        for(var i=0, u=-Math.PI; i <= n; i++, u += du) {
            // Loop height v.
            for(var j=0, v=0; j <= m; j++, v += dv) {
                
                var iVertex = i*(m+1) + j;

                var x = r*Math.cos(u); 
                var z = r*Math.sin(u); 
                var y = v-1.4;
                                                        
                // Set vertex positions.
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;
                
                // Set index.
                // Line on beam.
                if(j>0 && i>0){
                    indicesLines[iLines++] = iVertex - 1;
                    indicesLines[iLines++] = iVertex;
                 }
                // Line on ring.
                if(j>0 && i>0){
                    indicesLines[iLines++] = iVertex - (m+1);                            
                    indicesLines[iLines++] = iVertex;
                }                   

                // Set index.
                // Two Triangles.
                if(j>0 && i>0){
                    indicesTris[iTris++] = iVertex;
                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m+1);
                    //                            
                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m+1) - 1;                            
                    indicesTris[iTris++] = iVertex - (m+1);                            
                }
            }
        }
			}						




       /*
window.onkeydown = function(evt) {
    //console.log(evt);
    var key = evt.which ? evt.which : evt.keyCode;
    var c = String.fromCharCode(key);
    switch (c) {
    case ('H'):
        linesActivated = false;
        start2();
        start1();

        break;
    case ('S'):
        linesActivated = true;
        start2();
        start1();

        break;
  
    }
}; */