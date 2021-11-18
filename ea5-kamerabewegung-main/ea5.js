var app = ( function() {


	var rekursionsSchritt = 0;

	var gl;

	// The shader program object is also used to
	// store attribute and uniform locations.
	var prog;

	// Array of model objects.
	var models = [];

	var interactiveModel;

	var toggleWireframeOn = true;

	var cameraLocked = true;


	var camera = {
		// Initial position of the camera.
		eye : [0, 1, 4],
		// Point to look at.
		center : [0, 0, 0],
		// Roll and pitch of the camera.
		up : [0, 1, 0],
		// Opening angle given in radian.
		// radian = degree*2*PI/360.
		fovy : 60.0 * Math.PI / 180,
		// Camera near plane dimensions:
		// value for left right top bottom in projection.
		lrtb : 2.0,
		// View matrix.
		vMatrix : mat4.create(),
		// Projection matrix.
		pMatrix : mat4.create(),
		// Projection types: ortho, perspective, frustum.
		//projectionType : "ortho",

		
        // Projection types: ortho, perspective, frustum.
        projectionType : "perspective",


		// Angle to Z-Axis for camera when orbiting the center
		// given in radian.
		zAngle : 0,
		// Distance in XZ-Plane from center when orbiting.
		distance : 4,
	};

	function start() {
		init();
		render();
	}

	function init() {
		initWebGL();
		initShaderProgram();
		initUniforms()
		initModels();
		initEventHandler();
		initPipline();
	}

	function initWebGL() {
		// Get canvas and WebGL context.
		canvas = document.getElementById('canvas');
		gl = canvas.getContext('experimental-webgl');
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	}

	/**
	 * Init pipeline parameters that will not change again.
	 * If projection or viewport change, their setup must
	 * be in render function.
	 */
	function initPipline() {
		gl.clearColor(.60, .80, 1, 1);

		// Backface culling.
		//gl.frontFace(gl.CCW);
		//gl.enable(gl.CULL_FACE);
		//gl.cullFace(gl.BACK);

		// Depth(Z)-Buffer.
		gl.enable(gl.DEPTH_TEST);

		// Polygon offset of rastered Fragments.
		gl.enable(gl.POLYGON_OFFSET_FILL);
		gl.polygonOffset(0.5, 0);

		// Set viewport.
		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

		// Init camera.
		// Set projection aspect ratio.
		camera.aspect = gl.viewportWidth / gl.viewportHeight;
	}

	function initShaderProgram() {
		// Init vertex shader.
		var vs = initShader(gl.VERTEX_SHADER, "vertexshader");
		// Init fragment shader.
		var fs = initShader(gl.FRAGMENT_SHADER, "fragmentshader");
		// Link shader into a shader program.
		prog = gl.createProgram();
		gl.attachShader(prog, vs);
		gl.attachShader(prog, fs);
		gl.bindAttribLocation(prog, 0, "aPosition");
		gl.linkProgram(prog);
		gl.useProgram(prog);
	}

	/**
	 * Create and init shader from source.
	 * 
	 * @parameter shaderType: openGL shader type.
	 * @parameter SourceTagId: Id of HTML Tag with shader source.
	 * @returns shader object.
	 */
	function initShader(shaderType, SourceTagId) {
		var shader = gl.createShader(shaderType);
		var shaderSource = document.getElementById(SourceTagId).text;
		gl.shaderSource(shader, shaderSource);
		gl.compileShader(shader);
		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.log(SourceTagId+": "+gl.getShaderInfoLog(shader));
			return null;
		}
		return shader;
	}

	function initUniforms() {
		// Projection Matrix.
		prog.pMatrixUniform = gl.getUniformLocation(prog, "uPMatrix");

		// Model-View-Matrix.
		prog.mvMatrixUniform = gl.getUniformLocation(prog, "uMVMatrix");
	}

	function initModels() {
		// fill-style
		var fs = "fillwireframe";
		createModel("kegel", fs, [0, 0, 0], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderUnten", fs, [0, 0, 0], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderMitte", fs, [0, 0, 0], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderOben", fs, [0, 0, 0], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderOben2", fs, [0, 0, 0], [0, 0, 0], [1, 1, 1]);
		createModel("sphere", fs, [.75, .2, 2], [0, 0, 0], [.3, .25, .3]);
		createModel("sphere", fs, [.75, .5, 2], [0, 0, 0], [.25, .2, .25]);
		createModel("sphere", fs, [.75, .75, 2], [0, 0, 0], [.15, .15, .15]);

		createModel("kegel", fs, [.75, .85, 2], [0, 0, 0], [1, .75, 1]);
		createModel("kegel", fs, [.75, .85, 2], [0, 0, 0], [2, .1, 2]);
		createModel("zylinderNase", fs, [.46	,.65, 2.17], [0, Math.PI *.175, 0], [.3, .075, .075]);
		createModel("plate", fs, [0, 0, 0], [Math.PI *.5, 0, 0], [.1, .1, .1]);
		createModel("plate", fs, [0, .25, 0], [Math.PI *.5, 0, 0], [.55, .55, .55]);

		createModel("plate", fs, [.75, 1.0375	, 2], [Math.PI *-.5, 0, 0], [.1	, .1, .1]);
		createModel("plate", fs, [.75, .875, 2], [Math.PI *-.5, 0, 0], [.2	, .2, .2]);
		createModel("plate", fs, [.75, .85, 2], [Math.PI *.5, 0, 0], [.2	, .2, .2]);
		
		
		createModel("apple", fs, [.75, 1.08, 2], [0, 0, 0], [.03	, .03, .03]);
		
		createModel("acorn", fs, [-0.15, .05, 0.5], [Math.PI *.5, 0, -Math.PI *.175], [.08	, .08, .08]);
		createModel("kegel", fs, [-0.22, .05, 0.38], [Math.PI *.5, 0, -Math.PI *.175], [.05, .2, .05]);
//Math.PI *.65,Math.PI *.75
		createModel("bowtie", fs, [.62, .68, 2.07], [Math.PI *.8, Math.PI *.4,Math.PI *1], [.2	, .2, .2]);
		createModel("sphere", fs, [.63, .68, 2.07], [0, 0, 0], [.04, .03, .04]);



		createModel("plane", "fillwireframe", [0, 0, 0], [0, 0, 0], [1, 1, 1]);

		interactiveModel = models[5];



	}

	/**
	 * Create model object, fill it and push it in models array.
	 * 
	 * @parameter geometryname: string with name of geometry.
	 * @parameter fillstyle: wireframe, fill, fillwireframe.
	 */
	 function createModel(geometryname, fillstyle, translate, rotate, scale) {
		var model = {};
		model.fillstyle = fillstyle;
		initDataAndBuffers(model, geometryname);
		// Create and initialize Model-View-Matrix.
	//	model.mvMatrix = mat4.create();

	initTransformations(model, translate, rotate, scale);


		models.push(model);
	}


	function initTransformations(model, translate, rotate, scale) {
		// Store transformation vectors.
		model.translate = translate;
		model.rotate = rotate;
		model.scale = scale;
	
		// Create and initialize Model-Matrix.
		model.mMatrix = mat4.create();
	
		// Create and initialize Model-View-Matrix.
		model.mvMatrix = mat4.create();
	}


	/**
	 * Init data and buffers for model object.
	 * 
	 * @parameter model: a model object to augment with data.
	 * @parameter geometryname: string with name of geometry.
	 */
	function initDataAndBuffers(model, geometryname) {
		// Provide model object with vertex data arrays.
		// Fill data arrays for Vertex-Positions, Normals, Index data:
		// vertices, normals, indicesLines, indicesTris;
		// Pointer this refers to the window.
		this[geometryname]['createVertexData'].apply(model);


		// Setup position vertex buffer object.
		model.vboPos = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboPos);
		gl.bufferData(gl.ARRAY_BUFFER, model.vertices, gl.STATIC_DRAW);
		// Bind vertex buffer to attribute variable.
		prog.positionAttrib = gl.getAttribLocation(prog, 'aPosition');
		gl.enableVertexAttribArray(prog.positionAttrib);

		// Setup normal vertex buffer object.
		model.vboNormal = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboNormal);
		gl.bufferData(gl.ARRAY_BUFFER, model.normals, gl.STATIC_DRAW);
		// Bind buffer to attribute variable.
		prog.normalAttrib = gl.getAttribLocation(prog, 'aNormal');
		gl.enableVertexAttribArray(prog.normalAttrib);

		// Setup lines index buffer object.
		model.iboLines = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.indicesLines,
			gl.STATIC_DRAW);
		model.iboLines.numberOfElements = model.indicesLines.length;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

		// Setup triangle index buffer object.
		model.iboTris = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboTris);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, model.indicesTris,
			gl.STATIC_DRAW);
		model.iboTris.numberOfElements = model.indicesTris.length;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


	}

	function initEventHandler() {

		window.addEventListener("keydown", function(e) {
			if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
				e.preventDefault();
			}
		}, false);


		// Rotation step.
        var deltaRotate = Math.PI / 36;


		var deltaTranslate = 0.05;


		window.onkeydown = function(evt) {


			// Use shift key to change sign.
            var sign = evt.shiftKey ? -1 : 1;


			var key = evt.which ? evt.which : evt.keyCode;
			var c = String.fromCharCode(key);
		//	console.log(c);
			rekursionsSchritt = parseInt(c)-1;

			//console.log(c);

			// Change projection of scene.
			switch(c) {
				case('O'):
					camera.projectionType = "ortho";
					camera.lrtb = 2;
					break;

				case('1'):
					document.getElementById("textCanvas").innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
				break;
				case('2'):
					document.getElementById('textCanvas').innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
				break;
				case('3'):
					document.getElementById("textCanvas").innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
				break;
				case('4'):
					document.getElementById('textCanvas').innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
				break;
				case('5'):
					document.getElementById('textCanvas').innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
				break;
				case('6'):
					document.getElementById('textCanvas').innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
				break;


				//	document.getElementById('tesselation-level').addEventListener('change', () => {
				//		models = [];
				//		initModels();
				//		render();
				//	  });

					// Camera move and orbit.
				/*case('C'):
                    // Orbit camera.
                    camera.zAngle += sign * deltaRotate;
                    break;*/
				case('A'):
                    // Orbit camera.
                    //camera.zAngle += -1 * deltaRotate;
					camera.eye[0] += - 1 * deltaTranslate;
					camera.center[0] += - 1 * deltaTranslate;
                    break;
					case('D'):
					camera.eye[0] += 1 * deltaTranslate;
					camera.center[0] += 1 * deltaTranslate;
                    // Orbit camera.
                    //camera.zAngle += 1 * deltaRotate;
					//deltaRotate
                    break;




				case('F'):
                    camera.projectionType = "frustum";
                    camera.lrtb = 1.2;
                    break;
                case('P'):
                    camera.projectionType = "perspective";
                    break;

/*
				case('H'):
                    // Move camera up and down.
                    camera.eye[1] += sign * deltaTranslate;
                    break;*/

				/*	case('Q'):
                    // Move camera up and down.
                    camera.eye[1] += -1 * deltaTranslate;
                    break;
					case('E'):
                    // Move camera up and down.
                    camera.eye[1] += 1 * deltaTranslate;
                    break;*/
               case('W'):
                    // Camera distance to center.
				/*	if (camera.distance >1) {
                    	camera.distance += -1 * deltaTranslate;
					} */
					camera.eye[1] += 1 * deltaTranslate;
					camera.center[1] += 1 * deltaTranslate;

					//console.log("eye"+camera.eye[1]);
                    break;

					
					

					case('S'):
                    // Camera distance to center.
                   // camera.distance += 1 * deltaTranslate;
				   if (!cameraLocked || camera.center[1] > -.15) { 
					camera.eye[1] += - 1 * deltaTranslate;
					camera.center[1] += - 1 * deltaTranslate;
				   }
				   console.log("center" + camera.center[1]);
				   console.log("eye"+camera.eye[1]);

                    break;


					// Habe noch if-Bedingungen hinzugefügt, sodass das rein und rauszoomen nicht bewirkt, dass die Kamera sich irgendwann dreht
					// Bei der perspektivischen Sicht wird beim Rauszoomen sichergestellt, dass camera.fovy nie größer als pi wird (über: * (Math.PI - camera.fovy))
					// Bei der perspektivischen Sicht wird beim Reinzoomen sichergestellt, dass camera.fovy nie kleiner als 0 wird (über: *  0.5; denn so wird der Abstand zur Mitte, oder zu 0, immer nur halbiert und kann so nie unter 0 fallen)
					// Bei der frustum Sicht wird beim Reinzoomen sichergestellt, dass camera.lrtb nie kleiner als 0 wird (über: *  0.5; denn so wird der Abstand zur Mitte, oder zu 0, immer nur halbiert und kann so nie unter 0 fallen)
				case('Z'):
                    // Camera fovy in radian.
					if (sign >= 0) {
						if (camera.projectionType == "perspective") {
							camera.fovy -= (camera.fovy - 0) * 0.5;
							//console.log(camera.fovy);
						} else if (camera.projectionType == "ortho" || camera.projectionType == "frustum") {
							camera.lrtb -= camera.lrtb * 0.5;
						}
					} else {
						if (camera.projectionType == "perspective") {
							//camera.fovy += sign * 5 * Math.PI / 180;
							camera.fovy += ( 5 * Math.PI / 180) * (Math.PI - camera.fovy);
							console.log(camera.fovy);
						} else if (camera.projectionType == "ortho" || camera.projectionType == "frustum") {
							camera.lrtb += 0.1;
						}
						
					}
                    break;
                /*case('B'):
				if (sign < 0) {
					camera.lrtb -= camera.lrtb * 0.5;
					break;
				} else {
					  // Camera near plane dimensions.
					  camera.lrtb += sign * 0.1;
					  break;
				}*/
                  
				case('T'):
                    toggleWireframeOn = !toggleWireframeOn;
                    break;



					// arrows
				case ('&'):
					camera.eye[1] += 1 * deltaTranslate;
        	break;

			case ('%'):
				camera.zAngle += -1 * deltaRotate;
        	break;

			case ("'"):
				camera.zAngle += 1 * deltaRotate;
				
				
        	break;

			
			case ('('):
				if (camera.eye[1] >= .79 || !cameraLocked) {
				camera.eye[1] += -1 * deltaTranslate;
				}
				//console.log(camera.eye[1]);
        	break;

			case('R'):
			if (sign >= 0) {
			camera.distance += 1 * deltaTranslate;
			} else {
				if (camera.distance >1) {
					camera.distance += -1 * deltaTranslate;
				} 

			}
                    break;
			
			case ("L"):
				cameraLocked = !cameraLocked;
				if (camera.eye[1] < .74) {
					camera.eye[1] = .85;
					camera.center[1] = -.15;
				}
				if (camera.center[1] < 0) {
					camera.center[1] = -.15;
				}
				
				//console.log(cameraLocked)
        	break;

	


			}

			// Render the scene again on any key pressed.
			render();
		};
	}

	/**
	 * Run the rendering pipeline.
	 */
	function render() {
		// Clear framebuffer and depth-/z-buffer.
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		setProjection();

		// mat4.identity(camera.vMatrix);

		// mat4.rotate(camera.vMatrix, camera.vMatrix, 
           // Math.PI*1/4 ,[1, 0, 0]);


		   calculateCameraOrbit();

		   // Set view matrix depending on camera.
		   mat4.lookAt(camera.vMatrix, camera.eye, camera.center, camera.up);


		// Loop over models.
		for(var i = 0; i < models.length; i++) {
			// Update modelview for model.
			//mat4.copy(models[i].mvMatrix, camera.vMatrix);
			updateTransformations(models[i]);


			// Set uniforms for model.
			gl.uniformMatrix4fv(prog.mvMatrixUniform, false,
				models[i].mvMatrix);
			
			draw(models[i]);
		}
	
	}



	function updateTransformations(model) {
    
		// Use shortcut variables.
		var mMatrix = model.mMatrix;
		var mvMatrix = model.mvMatrix;
		
		//mat4.copy(mvMatrix, camera.vMatrix);  
		
		// Reset matrices to identity.         
        mat4.identity(mMatrix);
        mat4.identity(mvMatrix);

		// Translate.
        mat4.translate(mMatrix, mMatrix, model.translate);

		// Rotate.
        mat4.rotateX(mMatrix, mMatrix, model.rotate[0]);
        mat4.rotateY(mMatrix, mMatrix, model.rotate[1]);
        mat4.rotateZ(mMatrix, mMatrix, model.rotate[2]);

		// Scale
        mat4.scale(mMatrix, mMatrix, model.scale);


		// Combine view and model matrix
        // by matrix multiplication to mvMatrix.        
        mat4.multiply(mvMatrix, camera.vMatrix, mMatrix);
	}



	function setProjection() {
		// Set projection Matrix.
		switch(camera.projectionType) {
			case("ortho"):
				var v = camera.lrtb;
				mat4.ortho(camera.pMatrix, -v, v, -v, v, -10, 10);
				break;


			case("frustum"):
                var v = camera.lrtb;
                mat4.frustum(camera.pMatrix, -v/2, v/2, -v/2, v/2, 1, 10);
                break;
            case("perspective"):
                mat4.perspective(camera.pMatrix, camera.fovy, 
                    camera.aspect, 1, 10);
                break;


		}
		// Set projection uniform.
		gl.uniformMatrix4fv(prog.pMatrixUniform, false, camera.pMatrix);
	}

	function draw(model) {
		// Setup position VBO.
		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboPos);
		gl.vertexAttribPointer(prog.positionAttrib,3,gl.FLOAT,false,0,0);

		// Setup normal VBO.
		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboNormal);
		gl.vertexAttribPointer(prog.normalAttrib,3,gl.FLOAT,false,0,0);

		// Setup rendering tris.
		var fill = (model.fillstyle.search(/fill/) != -1);
		if(fill) {
			gl.enableVertexAttribArray(prog.normalAttrib);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboTris);
			gl.drawElements(gl.TRIANGLES, model.iboTris.numberOfElements,
				gl.UNSIGNED_SHORT, 0);
		}

		// Setup rendering lines.
		var wireframe = (model.fillstyle.search(/wireframe/) != -1);
		if(wireframe && toggleWireframeOn) {
			gl.disableVertexAttribArray(prog.normalAttrib);
			gl.vertexAttrib3f(prog.normalAttrib, 0, 0, 0);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
			gl.drawElements(gl.LINES, model.iboLines.numberOfElements,
				gl.UNSIGNED_SHORT, 0);
		}
	}


	function calculateCameraOrbit() {
        // Calculate x,z position/eye of camera orbiting the center.
        var x = 0, z = 2;
        camera.eye[x] = camera.center[x];
        camera.eye[z] = camera.center[z];
        camera.eye[x] += camera.distance * Math.sin(camera.zAngle);
        camera.eye[z] += camera.distance * Math.cos(camera.zAngle);
    }
	

	// App interface.
	return {
		start : start
	}

}());





$(document).ready(function () {
	$('.modal').modal();
});
