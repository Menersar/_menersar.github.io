var app = ( function() {

	var rekursionsSchritt = 0;


	var gl;

	// The shader program object is also used to
	// store attribute and uniform locations.
	var prog;

	// Array of model objects.
	var models = [];

	var sphereAngle = 0;

	var camLocked = true;

	// Model that is target for user input.
	//var interactiveModel;
	// Model that is target for user input.
/*	var torus;
	var sphere1;
	var sphere2;
	var sphere3;
	var sphere4;
	var sphere5;
	var sphere6;
	var sphere7;*/

	var toggleWireframeOn = true;


	var deltaRotate = Math.PI / 36;
		var deltaTranslate = 0.05;


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
	//	gl.clearColor(0.18, 0.31, 0.31, 1);
	//	gl.clearColor(0.95, 0.95, 0.95, 1);
		gl.clearColor(1, 1, 1, 1);

		// Backface culling.
		gl.frontFace(gl.CCW);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);

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
		camera.eye[1] = 1.91;

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

    function initModels() {
		// fillstyle
		var fs = "wireframefill";
		/*createModel("torus", fs, [ .25, .25, .25, 1], [ 0, 0, 0 ], [ 0, 0, 0 ], [
			1, 1, 1 ]);
		
		createModel("sphere", fs, [ .95, 0.1, 0.1, 1 ], [2, 0, 0],
			[ Math.PI *.5, 0, 0 ], [ .1, .1, .1 ]);
		createModel("sphere", fs, [ 0.1, .95, .1, 1 ], [2, 0, 0],
			[ Math.PI *.5, 0, 0 ], [ .1, .1, .1 ]);
			createModel("sphere", fs, [ .1, .1, .95, 1 ], [2, 0, 0],
			[ Math.PI *.5, 0, 0 ], [ .1, .1, .1 ]);
// pink
			createModel("sphere", fs, [ .95, .95, .1, 1 ], [-2, 0, 0],
			[ Math.PI *.5, 0, 0 ], [ .1, .1, .1 ]);

			createModel("sphere", fs, [ .1, .95, .95, 1 ], [-2, 0, 0],
			[ Math.PI *.5, 0, 0 ], [ .1, .1, .1 ]);

		createModel("sphere", fs, [ .95, 0.1, .95, 1 ], [ 0, 2, 0 ],
			[ Math.PI *.5, 0, 0 ], [ .1, .1, .1 ]);
		createModel("sphere", fs, [ .95, .95, .95, 1 ], [ 0, 0, 0],
			[ Math.PI *.5, 0, 0 ], [ .1, .1, .1 ]);
    
        // Select one model that can be manipulated interactively by user.
       // interactiveModel = models[0];
		[
			torus,
			sphere1,
			sphere2,
			sphere3,
			sphere4,
			sphere5,
			sphere6,
			sphere7
		  ] = models;*/

		  createModel("plane", fs, [1, 1, 1, 1], [0, 0, 0], [0, 0, 0], [1, 1, 1]);

		  // tanne hinten links
		  createModel("kegel", fs, [1, 1, 1, 1], [-Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderUnten", fs, [1, 1, 1, 1], [-Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderMitte", fs, [1, 1, 1, 1],  [-Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderOben", fs, [1, 1, 1, 1],  [-Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderOben2", fs, [1, 1, 1, 1],  [-Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1]);
		//createModel("plate", fs, [1, 1, 1, 1],  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1]);
		createModel("plate", fs, [1, 1, 1, 1],  [-Math.PI, 1.23, -Math.PI], [Math.PI *.5, 0, 0], [.55, .55, .55]);



		// tanne2 hinten rechts
		createModel("kegel", fs, [1, 1, 1, 1], [Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderUnten", fs, [1, 1, 1, 1], [Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderMitte", fs, [1, 1, 1, 1],  [Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderOben", fs, [1, 1, 1, 1],  [Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderOben2", fs, [1, 1, 1, 1],  [Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1]);
		//createModel("plate", fs, [1, 1, 1, 1],  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1]);
		createModel("plate", fs, [1, 1, 1, 1],  [Math.PI, 1.23, -Math.PI], [Math.PI *.5, 0, 0], [.55, .55, .55]);


		// tanne3 hinten rechts unten
		createModel("kegel", fs, [1, 1, 1, 1], [Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderUnten", fs, [1, 1, 1, 1], [Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderMitte", fs, [1, 1, 1, 1],  [Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderOben", fs, [1, 1, 1, 1],  [Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderOben2", fs, [1, 1, 1, 1],  [Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 1, 1]);
		//createModel("plate", fs, [1, 1, 1, 1],  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1]);
		createModel("plate", fs, [1, 1, 1, 1],  [Math.PI*1.5, 0.25, -Math.PI*.5], [Math.PI *.5, 0, 0], [.55, .55, .55]);

		// tanne4 hinten rechts unten tal
		createModel("kegel", fs, [1, 1, 1, 1], [Math.PI*1, -1, Math.PI*.0], [0, 0, 0], [1, 3, 1]);
		createModel("zylinderUnten", fs, [1, 1, 1, 1], [Math.PI*1, -.5, Math.PI*.0], [0, 0, 0], [.75, 1, .75]);
		createModel("zylinderMitte", fs, [1, 1, 1, 1],  [Math.PI*1, -.5, Math.PI*.0], [0, 0, 0], [.75, 1, .75]);
		createModel("zylinderOben", fs, [1, 1, 1, 1],  [Math.PI*1, -.5, Math.PI*.0], [0, 0, 0], [.75, 1, .75]);
		createModel("zylinderOben2", fs, [1, 1, 1, 1],  [Math.PI*1, -.5, Math.PI*.0], [0, 0, 0], [.75, 1, .75]);
		//createModel("plate", fs, [1, 1, 1, 1],  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1]);
		createModel("plate", fs, [1, 1, 1, 1],  [Math.PI*1, -.25, Math.PI*.0], [Math.PI *.5, 0, 0], [.41, .41, .41]);

		// tanne5 vorne
		createModel("kegel", fs, [1, 1, 1, 1], [Math.PI*-.47, -.3, Math.PI*.8], [0, 0, 0], [2, 3, 2]);
		createModel("zylinderUnten", fs, [1, 1, 1, 1], [Math.PI*-.47, .15, Math.PI*.8], [0, 0, 0], [1.25, 1, 1.25]);
		createModel("zylinderMitte", fs, [1, 1, 1, 1],  [Math.PI*-.47, .15, Math.PI*.8], [0, 0, 0], [1.25, 1, 1.25]);
		createModel("zylinderOben", fs, [1, 1, 1, 1],  [Math.PI*-.47, .15, Math.PI*.8], [0, 0, 0], [1.25, 1, 1.25]);
		createModel("zylinderOben2", fs, [1, 1, 1, 1],  [Math.PI*-.47, .15, Math.PI*.8], [0, 0, 0], [1.25, 1, 1.25]);
		//createModel("plate", fs, [1, 1, 1, 1],  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1]);
		createModel("plate", fs, [1, 1, 1, 1],  [Math.PI*-.47, 0.4, Math.PI*.8], [Math.PI *.5, 0, 0], [.69, .69, .69]);

		// tanne6 hinten mitte hügel
		createModel("kegel", fs, [1, 1, 1, 1], [0, .98, -Math.PI * 2] , [0, 0, 0], [1, 1, 1]);
		createModel("zylinderUnten", fs, [1, 1, 1, 1], [0, .98, -Math.PI * 2], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderMitte", fs, [1, 1, 1, 1],  [0, .98, -Math.PI * 2], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderOben", fs, [1, 1, 1, 1],  [0, .98, -Math.PI * 2], [0, 0, 0], [1, 1, 1]);
		createModel("zylinderOben2", fs, [1, 1, 1, 1],  [0, .98, -Math.PI * 2], [0, 0, 0], [1, 1, 1]);
		//createModel("plate", fs, [1, 1, 1, 1],  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1]);
		createModel("plate", fs, [1, 1, 1, 1],  [0, 1.23, -Math.PI * 2], [Math.PI *.5, 0, 0], [.55, .55, .55]);

		// tanne7 hinten links unten
		createModel("kegel", fs, [1, 1, 1, 1], [-Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 3, 1]);
		createModel("zylinderUnten", fs, [1, 1, 1, 1], [-Math.PI*1.5, .5, -Math.PI*.5], [0, 0, 0], [.75, 1, .75]);
		createModel("zylinderMitte", fs, [1, 1, 1, 1],  [-Math.PI*1.5, .5, -Math.PI*.5], [0, 0, 0], [.75, 1, .75]);
		createModel("zylinderOben", fs, [1, 1, 1, 1],  [-Math.PI*1.5, .5, -Math.PI*.5], [0, 0, 0], [.75, 1, .75]);
		createModel("zylinderOben2", fs, [1, 1, 1, 1],  [-Math.PI*1.5, .5, -Math.PI*.5], [0, 0, 0], [.75, 1, .75]);
		//createModel("plate", fs, [1, 1, 1, 1],  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1]);
		createModel("plate", fs, [1, 1, 1, 1],  [-Math.PI*1.5, 0.75, -Math.PI*.5], [Math.PI *.5, 0, 0], [.41, .41, .41]);


		// schneemann
		createModel("sphere", fs, [1, 1, 1, 1], [.75, -.2, 2], [0, 0, 0], [.3, .25, .3]);
		createModel("sphere", fs, [1, 1, 1, 1], [.75, .1, 2], [0, 0, 0], [.25, .2, .25]);
		createModel("sphere", fs, [1, 1, 1, 1], [.75, .35, 2], [0, 0, 0], [.15, .15, .15]);

		// Fliege
		createModel("bowtie", fs, [0.25, 0.25, 0.25, 1], [.7, .65, 2.1], [-0.4, -.6,-0.5], [.2	, .2, .2]);
		createModel("sphere", fs, [0.25, 0.25, 0.25, 1], [.7, .65, 2.1], [0, 0, 0], [.04, .03, .04]);

		createModel("kegel", fs, [1, 1, 1, 1], [.75, .45, 2], [0, 0, 0], [1, .75, 1]);
		createModel("kegel", fs, [1, 1, 1, 1], [.75, .45, 2], [0, 0, 0], [2, .1, 2]);
		createModel("zylinderNase", fs, [1, 1, 1, 1], [.46	,.25, 2.17], [0, Math.PI *.175, 0], [.3, .075, .075]);	

		createModel("plate", fs, [1, 1, 1, 1], [.75, 0.6375	, 2], [Math.PI *-.5, 0, 0], [.1	, .1, .1]);
		createModel("plate", fs, [1, 1, 1, 1], [.75, .475, 2], [Math.PI *-.5, 0, 0], [.2	, .2, .2]);
		createModel("plate", fs, [1, 1, 1, 1], [.75, .45, 2], [Math.PI *.5, 0, 0], [.2	, .2, .2]);

		//arm links
		createModel("zylinder", fs, [1, 1, 1, 1], [.65, .42, 2.7],[Math.PI*.35	, Math.PI*.00, Math.PI*0.06		], [.05, 1, .05]);
		createModel("zylinder", fs, [1, 1, 1, 1], [.58, .42, 2.68],[Math.PI*.35	, Math.PI*.00, Math.PI*0.2		], [.01, .23, .01]);

		// arm rechts
		createModel("zylinder", fs, [1, 1, 1, 1], [.4, .4, 1.7],[Math.PI*.75	, Math.PI*.00, Math.PI*.8		], [.05, 1, .05]);
		createModel("zylinder", fs, [1, 1, 1, 1], [.51, .4, 1.72],[Math.PI*.8	, Math.PI*.00, Math.PI*1		], [.01, .2, .01]);


		
		// baum
		createModel("kegel", fs, [1, 1, 1, 1], [0, 1, 0], [0, 0, 0], [2, 1.5, 2]);
		createModel("kegel", fs, [1, 1, 1, 1], [0, .9, 0], [0, 0, 0], [2, 1.5, 2]);
		createModel("kegel", fs, [1, 1, 1, 1], [0, 1.2, 0], [Math.PI*.5, -.4, Math.PI *.5], [1.0, 2, 1.0]);
		createModel("kegel", fs, [1, 1, 1, 1], [-0.4, 1.39, 0], [Math.PI*.5, .1, Math.PI *.5], [1.0, 2, 1.0]);
		createModel("zylinder", fs, [1, 1, 1, 1], [-1.3, 1.82, 0], [Math.PI*.5, -.8, Math.PI *.5], [.15, 1, .15]);
		createModel("zylinder", fs, [1, 1, 1, 1], [-1.1, 1.6, .5], [Math.PI*.5, -.8, Math.PI *.2	], [.07, 1, .07]);
		createModel("zylinder", fs, [1, 1, 1, 1], [.28, 1.9	, .135], [Math.PI*0, Math.PI*-.15, Math.PI*-.15], [.285, 1.0, .285]);
		createModel("zylinder", fs, [1, 1, 1, 1], [.15, 2.1	, .23], [Math.PI*0, Math.PI*.5, Math.PI*0.1	], [.12, .7, .12]);
		createModel("zylinder", fs, [1, 1, 1, 1], [.34, 2.	, .16], [Math.PI*0, Math.PI*-.15, Math.PI*-.15], [.08, .7, .08]);
		createModel("zylinder", fs, [1, 1, 1, 1], [.325	, 2.5	, .2], [Math.PI*0, Math.PI*1, Math.PI*0.1	], [.04, .8, .01]);
		createModel("zylinder", fs, [1, 1, 1, 1], [-.42		, 2.1	, .00], [Math.PI*0, Math.PI*2, Math.PI*.2	], [.13, 1.1	, .13]);
		createModel("zylinder", fs, [1, 1, 1, 1], [-.62		, 2.15	, .00], [Math.PI*0, Math.PI*2, Math.PI*.36	], [.02, .4	, .02]);
		createModel("zylinder", fs, [1, 1, 1, 1], [.28	, 2.6	, .2], [Math.PI*0, Math.PI*1, Math.PI*-.02	], [.01, .3, .01]);
		createModel("zylinder", fs, [1, 1, 1, 1], [.45	, 2.45		, .2], [Math.PI*0, Math.PI*1, Math.PI*.3	], [.02, .3, .02]);

		createModel("zylinder", fs, [1, 1, 1, 1], [0		, 1.5	, 1], [Math.PI*.37, Math.PI*1.5, Math.PI*-.05	], [.2, 1.4	, .2]);
		createModel("zylinder", fs, [1, 1, 1, 1], [.5		, 1.6	, 1.2], [Math.PI*.41, Math.PI*.01, Math.PI*-0.15	], [.13, 1.4	, .13]);
		createModel("zylinder", fs, [1, 1, 1, 1], [.35		, 1.58	, 2], [Math.PI*.47, Math.PI*.00, Math.PI*-0.03	], [.1, 1.8	, .05]);
		// Eichel am Ast
		createModel("acorn", fs, [1, 1, 1, 1], [.345		, 1.51	, 1.95], [Math.PI, 0,0	], [.04, .04	, .04]);
		createModel("kegel", fs, [1, 1, 1, 1], [.345		, 1.575	, 1.95], [Math.PI, 0,0	], [.02, .2	, .02]);
	
		createModel("zylinder", fs, [1, 1, 1, 1], [.1		, 1.55	, 1.6], [Math.PI*.47, Math.PI*.00, Math.PI*0.11	], [.06	, .7	, .02]);

		

		// schaukel
		createModel("kegel", fs, [1, 1, 1, 1], [.29		, 1.1	, 1.6], [0, 0, 0], [.05, 1.8, .05]);
		createModel("kegel", fs, [1, 1, 1, 1], [.29		, 1.08	, 1.2	], [0, 0, 0], [.05, 1.8, .05]);
		createModel("torus", fs, [1, 1, 1, 1], [.29		, 1	, 1.41	], [Math.PI*0, Math.PI*.5, Math.PI*0], [.4, .4, .75]);
		
		// Apfel in der Schaukel
		createModel("apple", fs, [1, 1, 1, 1], [.29		, .88	, 1.41	], [Math.PI*0, Math.PI*.5, Math.PI*0], [.03, .03, .03]);



		  interactiveModel = models[0];

		 /* sphereAngle = (sphereAngle + deltaRotate) % (2 * Math.PI);
				torus.rotate[1] += deltaRotate;
				// 0 - 2
				const cosOffset = 1 + (Math.cos(sphereAngle));
				// -1 bis 1
				const sinOffset = Math.sin(sphereAngle);
				//console.log ("cos" + cosOffset);
				//console.log (sinOffset);
				sphere1.translate[0] = cosOffset -2 ;
				sphere1.translate[2] = sinOffset ;
				sphere2.translate[0] = 1.3*(cosOffset  -1);
				sphere2.translate[2] = -1.3*(sinOffset -1);
				
				sphere3.translate[0] = (cosOffset -1)*2;
				sphere3.translate[2] = (-sinOffset -1)*2;
	
				sphere4.translate[0] = (-cosOffset)*1.5; 
				sphere4.translate[2] = sinOffset*1.5;	
				console.log("s"+sphereAngle);
				sphere5.translate[0] = (cosOffset)*1.5; 
				sphere5.translate[2] = (sinOffset+.25)*1.5;

				sphere6.translate[1] = cosOffset -1;
				sphere6.translate[2] = sinOffset;
				sphere7.translate[0] = -(cosOffset -1) *1.5;
				sphere7.translate[2] = -sinOffset*1.5;*/
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


		window.onkeydown = function(evt) {
			var key = evt.which ? evt.which : evt.keyCode;
			var c = String.fromCharCode(key);
			// console.log(evt);
			// Use shift key to change sign.
			var sign = evt.shiftKey ? -1 : 1;

			// Change projection of scene.
			switch(c) {
				case('O'):
					camera.projectionType = "ortho";
					camera.lrtb = 2;
					break;
				case('F'):
					camera.projectionType = "frustum";
					camera.lrtb = 1.2;
					break;
				case('P'):
					camera.projectionType = "perspective";
					break;
			}
			// Camera move and orbit.
		/*	switch(c) {
				case('C'):
					// Orbit camera.
					camera.zAngle += sign * deltaRotate;
					break;
				case('H'):
					// Move camera up and down.
					camera.eye[1] += sign * deltaTranslate;
					break;
				case('D'):
					// Camera distance to center.
					camera.distance += sign * deltaTranslate;
					break;
				case('V'):
					// Camera fovy in radian.
					camera.fovy += sign * 5 * Math.PI / 180;
					break;
				case('B'):
					// Camera near plane dimensions.
					camera.lrtb += sign * 0.1;
					break;
			}*/


			// Rotate interactive Model.
           /* switch(c) {
                case('X'):
                    interactiveModel.rotate[0] += sign * deltaRotate;
                    break;
                case('Y'):
                    interactiveModel.rotate[1] += sign * deltaRotate;
                    break;
                case('Z'):
                    interactiveModel.rotate[2] += sign * deltaRotate;
                    break;
            }*/
			rekursionsSchritt = parseInt(c)-1;

			switch(c) {
              /*  case('S'):
                    interactiveModel.scale[0] *= 1 + sign * deltaScale;
                    interactiveModel.scale[1] *= 1 - sign * deltaScale;
                    interactiveModel.scale[2] *= 1 + sign * deltaScale;
                    break;*/
					
				case('1'):
					console.log("1");
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





				case('T'):
					toggleWireframeOn = !toggleWireframeOn;
					break;








					case('A'):
                    // Orbit camera.
                    camera.zAngle += -1 * deltaRotate;
                    break;
					case('D'):
                    // Orbit camera.
                    camera.zAngle += 1 * deltaRotate;
                    break;


				case('F'):
                    camera.projectionType = "frustum";
                    camera.lrtb = 1.2;
                    break;
                case('P'):
                    camera.projectionType = "perspective";
                    break;

				case('Q'):
                    // Move camera up and down.
					if (!camLocked || camera.eye[1] > 1.91) { 
						camera.eye[1] += -1 * deltaTranslate;
					//	console.log(camera.eye[1]);
                    	
					}
					break;
                    
				case('E'):
					//if (camera.eye[1] < 1.5) {
						// Move camera up and down.
						camera.eye[1] += 1 * deltaTranslate;
						//console.log(camera.eye[1]);
					//}
                    

                    break;
               case('W'):
                    // Camera distance to center.
					if (camera.distance >1) {
                    	camera.distance += -1 * deltaTranslate;
					} 
                    break;

				case('S'):
                    // Camera distance to center.
                    camera.distance += 1 * deltaTranslate;
                    break;

					case('L'):
                    // Camera distance to center.
                    camLocked = !camLocked;
					if (camera.eye[1]< 1.91) {
						camera.eye[1] = 1.91;
					}
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













            }

			/*switch(c) {
                case('K'):
				sphereAngle = (sphereAngle + deltaRotate) % (2 * Math.PI);
				torus.rotate[1] += deltaRotate;
				// 0 - 2
				const cosOffset = 1 + (Math.cos(sphereAngle));
				// -1 bis 1
				const sinOffset = Math.sin(sphereAngle);
				//console.log ("cos" + cosOffset);
				//console.log (sinOffset);
				sphere1.translate[0] = cosOffset -2 ;
				sphere1.translate[2] = sinOffset ;
				sphere2.translate[0] = 1.3*(cosOffset  -1);
				sphere2.translate[2] = -1.3*(sinOffset -1);
				
				sphere3.translate[0] = (cosOffset -1)*2;
				sphere3.translate[2] = (-sinOffset -1)*2;
	
				sphere4.translate[0] = (-cosOffset)*1.5; 
				sphere4.translate[2] = sinOffset*1.5;	
				console.log("s"+sphereAngle);
				sphere5.translate[0] = (cosOffset)*1.5; 
				sphere5.translate[2] = (sinOffset+.25)*1.5;

				sphere6.translate[1] = cosOffset -1;
				sphere6.translate[2] = sinOffset;
				sphere7.translate[0] = -(cosOffset -1) *1.5;
				sphere7.translate[2] = -sinOffset*1.5;
                    break;
            }*/









			














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
		for(var i = 0; i < models.length; i++) {
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
		// Setup position VBO.
		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboPos);
		gl.vertexAttribPointer(prog.positionAttrib, 3, gl.FLOAT, false, 
			0, 0);

		// Setup normal VBO.
		gl.bindBuffer(gl.ARRAY_BUFFER, model.vboNormal);
		gl.vertexAttribPointer(prog.normalAttrib, 3, gl.FLOAT, false, 0, 0);

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
			gl.uniform4fv(prog.colorUniform, [0.,0.,0.,1.]);
			gl.disableVertexAttribArray(prog.normalAttrib);
			gl.vertexAttrib3f(prog.normalAttrib, 0, 0, 0);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
			gl.drawElements(gl.LINES, model.iboLines.numberOfElements,
				gl.UNSIGNED_SHORT, 0);
		}
	}

	// App interface.
	return {
		start : start
	}

}());



$(document).ready(function () {
	$('.modal').modal();
});