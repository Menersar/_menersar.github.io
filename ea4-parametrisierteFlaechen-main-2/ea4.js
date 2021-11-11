var app = (function () {

	var gl;

	// The shader program object is also used to
	// store attribute and uniform locations.
	var prog;

	// Array of model objects.
	var models = [];

	var sphereAngle = 0;

	var colorApple;


	// Model that is target for user input.
	//var interactiveModel;
	// Model that is target for user input.

	var apple;
	var acorn;
	var bowtie;
	var sphere;
	var kegel;



	var toggleWireframeOn = true;


	var deltaRotate = Math.PI / 36;
	var deltaTranslate = 0.05;


	var camera = {
		// Initial position of the camera.
		eye: [0, 1, 4],
		// Point to look at.
		center: [0, 0, 0],
		// Roll and pitch of the camera.
		up: [0, 1, 0],
		// Opening angle given in radian.
		// radian = degree*2*PI/360.
		fovy: 60.0 * Math.PI / 180,
		// Camera near plane dimensions:
		// value for left right top bottom in projection.
		lrtb: 2.0,
		// View matrix.
		vMatrix: mat4.create(),
		// Projection matrix.
		pMatrix: mat4.create(),
		// Projection types: ortho, perspective, frustum.
		projectionType: "perspective",
		// Angle to Z-Axis for camera when orbiting the center
		// given in radian.
		zAngle: 0,
		// Distance in XZ-Plane from center when orbiting.
		distance: 4,
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

		initColors(models[0]);

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
		gl.clearColor(0.18, 0.31, 0.31, 1);

		// Backface culling.
		//	gl.frontFace(gl.CCW);
		//	gl.enable(gl.CULL_FACE);
		//	gl.cullFace(gl);

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
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.log(SourceTagId + ": " + gl.getShaderInfoLog(shader));
			return null;
		}
		return shader;
	}

	function initUniforms() {
		// Projection Matrix.
		prog.pMatrixUniform = gl.getUniformLocation(prog, "uPMatrix");

		// Model-View-Matrix.
		prog.mvMatrixUniform = gl.getUniformLocation(prog, "uMVMatrix");

		prog.colorUniform = gl.getUniformLocation(prog, "uColor");

		// die Uniform-Variable uNMatrix wird durch prog.nMatrixUniform referenziert
		prog.nMatrixUniform = gl.getUniformLocation(prog, "uNMatrix");

	}

	function initColors(_model) {

		//  var red = [1,0,0,1];

		colorApple = new Float32Array(_model.vertices.length * 3);

		//console.log(_model.vertices.length);

		for (var i = 0; i < _model.vertices.length * 3; i += 4) {
			colorApple[i] = 0;
			colorApple[i + 1] = 1;
			colorApple[i + 2] = 0;
			colorApple[i + 3] = 1;

		}
		//console.log(colorApple);
	}

	function initModels() {
		// fillstyle
		var fs = "wireframefill";


		createModel("apple", fs, [1., .0, .0, 1], [-1.5, .35, 1],
			[0, 0, 0], [.5, .5, .5]);

		createModel("bowtie", fs, [.25, .25, .25, 1], [-1.05, -.05, 1.65],
			[Math.PI * .1, Math.PI * .15, Math.PI * .7], [1, 1, .5]);

		createModel("sphere", fs, [.25, .25, .25, 1], [-1.05, -.05, 1.65],
			[Math.PI * .1, Math.PI * .15, Math.PI * .0], [.6, .5, .4]);

		createModel("acorn", fs, [0.53, .26, 0.12, 1], [2, .45, 1],
			[0, 0, 0], [.5, .5, .5]);

		createModel("kegel", fs, [0.53, .26, 0.12, 1], [2, -.05, 1],
			[Math.PI * 1, 0, 0], [.2, 1, .2]);

		// Select one model that can be manipulated interactively by user.
		// interactiveModel = models[0];
		[
			apple,
			bowtie,
			sphere,
			acorn,
			kegel
		] = models;


		//  apple.color[0] = [ 0., 1, .0, 1 ];


	}

	/**
	 * Create model object, fill it and push it in models array.
	 * 
	 * @parameter geometryname: string with name of geometry.
	 * @parameter fillstyle: wireframe, fill, fillwireframe.
	 */
	function createModel(geometryname, fillstyle, color, translate, rotate, scale) {
		var model = {};
		model.fillstyle = fillstyle;
		model.color = color;
		/*	if (geometryname == "apple") {
				console.log("apple");
				model.color = model.appleCol;
	
			}*/
		initDataAndBuffers(model, geometryname);
		initTransformations(model, translate, rotate, scale);

		models.push(model);

	}

	/**
	 * Set scale, rotation and transformation for model.
	 */
	function initTransformations(model, translate, rotate, scale) {
		// Store transformation vectors.
		model.translate = translate;
		model.rotate = rotate;
		model.scale = scale;

		// Create and initialize Model-Matrix.
		model.mMatrix = mat4.create();

		// Create and initialize Model-View-Matrix.
		model.mvMatrix = mat4.create();

		model.nMatrix = mat3.create();
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
		// Rotation step.

		var deltaScale = 0.05;


		window.onkeydown = function (evt) {
			var key = evt.which ? evt.which : evt.keyCode;
			var c = String.fromCharCode(key);
			// console.log(evt);
			// Use shift key to change sign.
			var sign = evt.shiftKey ? -1 : 1;

			// Change projection of scene.
			switch (c) {
				case ('O'):
					camera.projectionType = "ortho";
					camera.lrtb = 2;
					break;
				case ('F'):
					camera.projectionType = "frustum";
					camera.lrtb = 1.2;
					break;
				case ('P'):
					camera.projectionType = "perspective";
					break;
			}


			switch (c) {

				case ('T'):
					toggleWireframeOn = !toggleWireframeOn;
					break;

				case ('A'):
					// Orbit camera.
					camera.zAngle += -1 * deltaRotate;
					break;
				case ('D'):
					// Orbit camera.
					camera.zAngle += 1 * deltaRotate;
					break;


				case ('F'):
					camera.projectionType = "frustum";
					camera.lrtb = 1.2;
					break;
				case ('P'):
					camera.projectionType = "perspective";
					break;

				case ('Q'):
					// Move camera up and down.
					camera.eye[1] += -1 * deltaTranslate;
					break;
				case ('E'):
					// Move camera up and down.
					camera.eye[1] += 1 * deltaTranslate;
					break;
				case ('W'):
					// Camera distance to center.
					if (camera.distance > 1) {
						camera.distance += -1 * deltaTranslate;
					}
					break;

				case ('S'):
					// Camera distance to center.
					camera.distance += 1 * deltaTranslate;
					break;


				// Habe noch if-Bedingungen hinzugefügt, sodass das rein und rauszoomen nicht bewirkt, dass die Kamera sich irgendwann dreht
				// Bei der perspektivischen Sicht wird beim Rauszoomen sichergestellt, dass camera.fovy nie größer als pi wird (über: * (Math.PI - camera.fovy))
				// Bei der perspektivischen Sicht wird beim Reinzoomen sichergestellt, dass camera.fovy nie kleiner als 0 wird (über: *  0.5; denn so wird der Abstand zur Mitte, oder zu 0, immer nur halbiert und kann so nie unter 0 fallen)
				// Bei der frustum Sicht wird beim Reinzoomen sichergestellt, dass camera.lrtb nie kleiner als 0 wird (über: *  0.5; denn so wird der Abstand zur Mitte, oder zu 0, immer nur halbiert und kann so nie unter 0 fallen)
				case ('Z'):
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
							camera.fovy += (5 * Math.PI / 180) * (Math.PI - camera.fovy);
							console.log(camera.fovy);
						} else if (camera.projectionType == "ortho" || camera.projectionType == "frustum") {
							camera.lrtb += 0.1;
						}

					}
					break;

			}

			switch (c) {
				case ('K'):
					sphereAngle = (sphereAngle + deltaRotate) % (2 * Math.PI);
					torus.rotate[1] += deltaRotate;
					// 0 - 2
					const cosOffset = 1 + (Math.cos(sphereAngle));
					// -1 bis 1
					const sinOffset = Math.sin(sphereAngle);
					//console.log ("cos" + cosOffset);
					//console.log (sinOffset);
					sphere1.translate[0] = cosOffset - 2;
					sphere1.translate[2] = sinOffset;
					sphere2.translate[0] = 1.3 * (cosOffset - 1);
					sphere2.translate[2] = -1.3 * (sinOffset - 1);

					sphere3.translate[0] = (cosOffset - 1) * 2;
					sphere3.translate[2] = (-sinOffset - 1) * 2;

					sphere4.translate[0] = (-cosOffset) * 1.5;
					sphere4.translate[2] = sinOffset * 1.5;
					console.log("s" + sphereAngle);
					sphere5.translate[0] = (cosOffset) * 1.5;
					sphere5.translate[2] = (sinOffset + .25) * 1.5;

					sphere6.translate[1] = cosOffset - 1;
					sphere6.translate[2] = sinOffset;
					sphere7.translate[0] = -(cosOffset - 1) * 1.5;
					sphere7.translate[2] = -sinOffset * 1.5;
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

		calculateCameraOrbit();

		// Set view matrix depending on camera.
		mat4.lookAt(camera.vMatrix, camera.eye, camera.center, camera.up);

		// Loop over models.
		for (var i = 0; i < models.length; i++) {
			// Update modelview for model.
			updateTransformations(models[i]);

			// Set uniforms for model.
			gl.uniformMatrix4fv(prog.mvMatrixUniform, false,
				models[i].mvMatrix);

			// Uniform-Variable uColor wird über die Referenz prog.colorUniform mit dem Farbwert aus dem jeweiligen Modell belegt
			gl.uniform4fv(prog.colorUniform, models[i].color);

			// innerhalb des Loops wird über die Modelle die Normal-Matrix Uniform-Variable uNMatrix über die Referenz prog.nMatrixUniform gesetzt
			gl.uniformMatrix3fv(prog.nMatrixUniform, false,
				models[i].nMatrix);

			draw(models[i]);
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

	function setProjection() {
		// Set projection Matrix.
		switch (camera.projectionType) {
			case ("ortho"):
				var v = camera.lrtb;
				mat4.ortho(camera.pMatrix, -v, v, -v, v, -10, 10);
				break;
			case ("frustum"):
				var v = camera.lrtb;
				mat4.frustum(camera.pMatrix, -v / 2, v / 2, -v / 2, v / 2, 1, 10);
				break;
			case ("perspective"):
				mat4.perspective(camera.pMatrix, camera.fovy,
					camera.aspect, 1, 10);
				break;
		}
		// Set projection uniform.
		gl.uniformMatrix4fv(prog.pMatrixUniform, false, camera.pMatrix);
	}

	/**
	 * Update model-view matrix for model.
	 */
	function updateTransformations(model) {

		// Use shortcut variables.
		var mMatrix = model.mMatrix;
		var mvMatrix = model.mvMatrix;

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

		// Calculate normal matrix from model-view matrix.
		mat3.normalFromMat4(model.nMatrix, mvMatrix);
	}

	function draw(model) {


		// Setup color vertex buffer object.
		var vboCol = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
		gl.bufferData(gl.ARRAY_BUFFER, model.color, gl.STATIC_DRAW);
		// Bind vertex buffer to attribute variable.
		var colAttrib = gl.getAttribLocation(prog, 'col');
		gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(colAttrib);

		// Setup position VBO.
		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboPos);
		gl.vertexAttribPointer(prog.positionAttrib, 3, gl.FLOAT, false,
			0, 0);

		// Setup normal VBO.
		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboNormal);
		gl.vertexAttribPointer(prog.normalAttrib, 3, gl.FLOAT, false, 0, 0);

		// Setup rendering tris.
		var fill = (model.fillstyle.search(/fill/) != -1);
		if (fill) {
			gl.enableVertexAttribArray(prog.normalAttrib);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboTris);
			gl.drawElements(gl.TRIANGLES, model.iboTris.numberOfElements,
				gl.UNSIGNED_SHORT, 0);
		}

		// Setup rendering lines.
		var wireframe = (model.fillstyle.search(/wireframe/) != -1);
		if (wireframe && toggleWireframeOn) {
			gl.disableVertexAttribArray(prog.normalAttrib);
			gl.vertexAttrib3f(prog.normalAttrib, 0, 0, 0);
			//	gl.uniform4fv(prog.colorUniform, [0.95,0.95,0.95,.5]);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
			gl.drawElements(gl.LINES, model.iboLines.numberOfElements,
				gl.UNSIGNED_SHORT, 0);
		}
	}

	// App interface.
	return {
		start: start
	}

}());



$(document).ready(function () {
	$('.modal').modal();
});