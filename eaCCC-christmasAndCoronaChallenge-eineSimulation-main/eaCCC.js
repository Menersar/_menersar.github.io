var simulationRunning = false;
let kugelModels = [];

let simulationPaused = false;

var speed = 50;

var sound = true;



var app = (function () {

	// fillstyle
	var wireFrameFill = "wireframefill";
	var wireframe = "wireframe";
	var fill = "fill";

	var cDarkBrown = [.36, .25, 0.20, 1];
	var cOcreBrown = [.53, .26, 0.12, 1];
	var cPineGreen = [.0, .2, 0.0, 1];
	var cDarkGray = [.32, .32, 0.32, 1];
	var cDarkRed = [.40, .0, 0., 1];
	var cDarkOrange = [.8, .4, 0., 1];
	var cSnow = [1., .98, 0.98, 1];
	var cBlue = [0, 0, 1, 1];
	var cYellow = [0.81, 0.71, .23, 1];



	var mDefault = createPhongMaterial();
	var mRed = createPhongMaterial({ kd: [1., 0., 0.] });
	var mGreen = createPhongMaterial({ kd: [0., 1., 0.] });
	var mBlue = createPhongMaterial({ kd: [0., 0., 1.] });
	var mYellow = createPhongMaterial({ kd: [0.81, 0.71, .23] });
	var mWhite = createPhongMaterial({ ka: [1., 1., 1.], kd: [.5, .5, .5], ks: [0., 0., 0.] });


	var mDarkBrown = createPhongMaterial({ kd: [.36, .25, 0.20] });
	var mOcreBrown = createPhongMaterial({ kd: [.53, .26, 0.12] });
	var mPineGreen = createPhongMaterial({ kd: [.0, .2, 0.0] });
	var mDarkGray = createPhongMaterial({ kd: [.32, .32, 0.32] });
	var mDarkRed = createPhongMaterial({ kd: [.40, .0, 0.] });
	var mDarkOrange = createPhongMaterial({ kd: [.8, .4, 0.] });
	var mSnow = createPhongMaterial({ kd: [1., .98, 0.98] });


	var rekursionsSchritt = 0;


	var gl;

	// The shader program object is also used to
	// store attribute and uniform locations.
	var prog;

	// Array of model objects.
	var models = [];

	//var kugelModels = [];

	// Model that is target for user input.
	var interactiveModel;

	var sphereAngle = 0;

	var camLocked = false;


	var kugel = {
		id: 0,
		startPunkt: [0, 0, 0],
		richtung: [0, 0, 0],
		geschwindigkeit: 0,
		radius: 1,
		gesund: true,
		vergangeneZeitschritte: 0,

	};

	let simulationInterval;

	var kugelRadius = .1;


	// N
	var anzahlKugelnN = 0;
	// K
	var anzahlKrankeK = 0;
	// G
	// varanzahlGesundeG = anzahlKugelnN - anzahlKrankeK;
	// R
	var kugelRadiusR = .1;
	// Z
	var gesundungsZeitschritteZ = 100;


	var sliderAnzahlKugelnN;
	var sliderAnzahlKrankeK;
	var sliderKugelRadiusR;
	var sliderGesundungsZeitschritteZ;

	var sliderSimulationsGeschwindigkeit;

	var valueAnzahlKugelnN;
	var valueAnzahlKrankeK;
	var valueAnzahlGesundeG;
	var valueKugelRadiusR;
	var valueGesundungsZeitschritteZ;

	var valueSimulationsGeschwindigkeit;



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

	var currentLightRotation = 0;

	var radiusLights = 5;


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

	// Objekt with light sources characteristics in the scene.
	var illumination = {
		ambientLight: [.5, .5, .5],
		light: [
			{ isOn: true, position: [radiusLights, 1., 0.], color: [1., 1., 1.] },
			{ isOn: true, position: [-radiusLights, 1., 0.], color: [1., 1., 1.] },
		]
	};

	function start() {
		init();
		render();
		//console.log("app started");
		//console.log(simulationRunning);

	}


	function stop() {
		document.getElementById('stopSimulation').disabled = true;


		if (document.getElementById('startSimulation').innerHTML == 'Pause') {
			document.getElementById('startSimulation').innerHTML = 'Start';
		}


		document.getElementById("anzahlKugelnN").removeAttribute("disabled");
		document.getElementById("anzahlKugelnN").className = "slider";

		document.getElementById("anzahlKrankeK").removeAttribute("disabled");
		document.getElementById("anzahlKrankeK").className = "slider";

		document.getElementById("gesundungsZeitschritteZ").removeAttribute("disabled");
		document.getElementById("gesundungsZeitschritteZ").className = "slider";

		document.getElementById("kugelRadiusR").removeAttribute("disabled");
		document.getElementById("kugelRadiusR").className = "slider";



		simulationRunning = false;
		kugelModels = [];
		models = [];

		clearInterval(simulationInterval);


		initModels();
		render();

	}


	document.getElementById('stopSimulation').onclick = () => {
		stop();
		simulationRunning = false;
	};


	document.getElementById('startSimulation').onclick = () => {
		//console.log("clickedm start");
		simulationRunning = !simulationRunning;

		if (document.getElementById('startSimulation').innerHTML == 'Start') {

			startSimulation();


			simulationPaused = false;

			document.getElementById('startSimulation').innerHTML = 'Pause';
		} else {
			simulationPaused = true;
			pauseSimulation();
			document.getElementById('startSimulation').innerHTML = 'Start';
		}

	};

	document.getElementById('soundButton').onclick = () => {
		//console.log("clickedm start");
		//sound = !sound;
		kugelModels.forEach((kugel) => {

			kugel.toggleSound();

			//	if (kugel.gesund) {
			//	console.log("test if infected touch me");
			//	kugel.gesund = testInfection(kugel);
			//}

		});

		if (document.getElementById('soundButton').innerHTML == 'Sound: An') {
			
		

			document.getElementById('soundButton').innerHTML = 'Sound: Aus';
		} else {
			
			document.getElementById('soundButton').innerHTML = 'Sound: An';
		}

	};


	



	function startSimulation() {
		document.getElementById('stopSimulation').removeAttribute("disabled");
		//console.log("p " + simulationPaused);



		if (!simulationPaused) {
			kugelModels = [];
		}

		sliderAnzahlKugelnN.disabled = true;


		//sliderAnzahlKugelnN.style.background = "gray";
		//document.querySelector("input").style.backgroundColor = "gray";

		sliderAnzahlKugelnN.className = "disabledSlider";

		//	let s = document.createElement("style");
		//	document.head.appendChild(s);
		// s.textContent = `.slider::-webkit-slider-thumb{background-color: 0, 100%, 50%)}`

		sliderAnzahlKrankeK.disabled = true;
		sliderAnzahlKrankeK.className = "disabledSlider";

		sliderGesundungsZeitschritteZ.disabled = true;
		sliderGesundungsZeitschritteZ.className = "disabledSlider";


		sliderKugelRadiusR.disabled = true;
		sliderKugelRadiusR.className = "disabledSlider";

		//sliderSimulationsGeschwindigkeit.disabled = true;
		//sliderSimulationsGeschwindigkeit.className = "disabledSlider";


		if (!simulationPaused) {
			kugelRadius = valueKugelRadiusR.innerHTML * .2;
			//	console.log("________ " + kugelRadius);
			var kugelID = 0;
			let kugelMinPunkt = -1 + kugelRadius;
			let kugelMaxPunkt = 1 - kugelRadius;
			// console.log("kugelMinPunkt" + kugelMinPunkt);

			for (var j = 0; j < valueAnzahlKrankeK.innerHTML; j++) {
				//var kugel = new kugel;
				//		var kugel = new Kugel(kugelID, kugelRadius, false, valueAnzahlKrankeK.innerHTML, kugelMinPunkt, kugelMaxPunkt, valueGesundungsZeitschritteZ.innerHTML);
				var kugel = new Kugel(kugelID, kugelRadius, false, kugelMinPunkt, kugelMaxPunkt, valueGesundungsZeitschritteZ.innerHTML, kugelModels);

				kugelModels.push(kugel);
				kugelID++;
			}

			//console.log (valueAnzahlGesundeG.innerHTML);
			for (var j = 0; j < valueAnzahlGesundeG.innerHTML; j++) {
				//var kugel = new kugel;


				var kugel = new Kugel(kugelID, kugelRadius, true, kugelMinPunkt, kugelMaxPunkt, valueGesundungsZeitschritteZ.innerHTML, kugelModels);
				//var kugel = new Kugel(kugelID, kugelRadius, true, valueAnzahlKrankeK.innerHTML, kugelMinPunkt, kugelMaxPunkt, valueGesundungsZeitschritteZ.innerHTML);


				kugelModels.push(kugel);
				kugelID++;
				//console.log (kugelModels);

			}
		}
		//kugelModels.forEach(initKugel);

		//initModels();
		//render();
		//start();

		simulationInterval = setInterval(() => {
			if (!simulationRunning || simulationPaused) {
				return;
			}

			//updateChart();
			models = [];
			initModels();
			render();
			kugelModels.forEach((kugel) => {

				kugel.moveKugel();
				kugel.testInfection(kugelModels);

				//	if (kugel.gesund) {
				//	console.log("test if infected touch me");
				//	kugel.gesund = testInfection(kugel);
				//}

			});
		}, speed);
	}




/*

	function setSpeed(speed) {
		kugelModels.forEach((k) => {
			
		});
	}
*/



	/*  function initKugel(k) {
		if (k.gesund == false) {
		createModel("sphere", "fill", cDarkRed, k.startPunkt, [0,0,0], [0.5, 0.5, 0.5], mDarkRed);
		} else {
			createModel("sphere", "fill", cPineGreen, k.currentPos, [0,0,0], [0.5, 0.5, 0.5], mPineGreen);
		}
	}*/




	function pauseSimulation() {
		clearInterval(simulationInterval);

		simulationPaused = true;

	}








	function init() {
		initWebGL();
		initShaderProgram();
		initUniforms()
		initModels();
		initEventHandler();
		initPipline();

		initSliders();
	}








	function initSliders() {


		sliderAnzahlKugelnN = document.getElementById("anzahlKugelnN");

		sliderAnzahlKrankeK = document.getElementById("anzahlKrankeK");
		sliderAnzahlKrankeK.max = sliderAnzahlKugelnN.value;

		sliderGesundungsZeitschritteZ = document.getElementById("gesundungsZeitschritteZ");
		sliderKugelRadiusR = document.getElementById("kugelRadiusR");

		sliderSimulationsGeschwindigkeit = document.getElementById("simulationsGeschwindigkeit");


		valueAnzahlKugelnN = document.getElementById("valueAnzahlKugelnN");
		valueAnzahlKrankeK = document.getElementById("valueAnzahlKrankeK");
		valueAnzahlGesundeG = document.getElementById("valueAnzahlGesundeG");
		valueGesundungsZeitschritteZ = document.getElementById("valueGesundungsZeitschritteZ");
		valueKugelRadiusR = document.getElementById("valueKugelRadiusR");
		valueSimulationsGeschwindigkeit = document.getElementById("valueSimulationsGeschwindigkeit");


		

		//	var output = document.getElementById("demo");
		valueAnzahlKugelnN.innerHTML = sliderAnzahlKugelnN.value;
		valueAnzahlKrankeK.innerHTML = sliderAnzahlKrankeK.value;
		valueAnzahlGesundeG.innerHTML = sliderAnzahlKugelnN.value - sliderAnzahlKrankeK.value;
		valueGesundungsZeitschritteZ.innerHTML = sliderGesundungsZeitschritteZ.value;
		valueKugelRadiusR.innerHTML = Math.round((sliderKugelRadiusR.value * .1) * 100) / 100;

		valueSimulationsGeschwindigkeit.innerHTML = sliderSimulationsGeschwindigkeit.value;
		speed = 400/ valueSimulationsGeschwindigkeit.innerHTML;
		console.log("speed " + speed);

		//document.getElementById('stopSimulation').disabled = true;
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
		//gl.clearColor(1, 1, 1, 1);

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


		// Light.
		prog.ambientLightUniform = gl.getUniformLocation(prog,
			"ambientLight");
		// Array for light sources uniforms.
		prog.lightUniform = [];
		// Loop over light sources.
		for (var j = 0; j < illumination.light.length; j++) {
			var lightNb = "light[" + j + "]";
			// Store one object for every light source.
			var l = {};
			l.isOn = gl.getUniformLocation(prog, lightNb + ".isOn");
			l.position = gl.getUniformLocation(prog, lightNb + ".position");
			l.color = gl.getUniformLocation(prog, lightNb + ".color");
			prog.lightUniform[j] = l;
		}

		// Material.
		prog.materialKaUniform = gl.getUniformLocation(prog, "material.ka");
		prog.materialKdUniform = gl.getUniformLocation(prog, "material.kd");
		prog.materialKsUniform = gl.getUniformLocation(prog, "material.ks");
		prog.materialKeUniform = gl.getUniformLocation(prog, "material.ke");

	}


	function createPhongMaterial(material) {
		material = material || {};
		// Set some default values,
		// if not defined in material paramter.
		material.ka = material.ka || [0.3, 0.3, 0.3];
		material.kd = material.kd || [0.6, 0.6, 0.6];
		material.ks = material.ks || [0.8, 0.8, 0.8];
		material.ke = material.ke || 10.;

		return material;
	}



	function initModels() {




		createModel("plane", wireframe, cSnow, [0, -1, 0], [0, 0, 0], [1, 1, 1], mSnow);
		createModel("plane", wireframe, cSnow, [0, 1, 0], [0, 0, 0], [1, 1, 1], mSnow);

		createModel("plane", wireframe, cSnow, [0, -1, 0], [0, Math.PI, 0], [1, 1, 1], mSnow);
		createModel("plane", wireframe, cSnow, [0, 1, 0], [0, Math.PI, 0], [1, 1, 1], mSnow);


		createModel("plane", wireframe, cSnow, [-1, 0, 0], [0, 0, Math.PI * .5], [1, 1, 1], mSnow);
		createModel("plane", wireframe, cSnow, [1, 0, 0], [0, 0, Math.PI * .5], [1, 1, 1], mSnow);


		createModel("plane", wireframe, cSnow, [0, 0, -1], [0, Math.PI * 1.5, Math.PI * .5], [1, 1, 1], mSnow);
		createModel("plane", wireframe, cSnow, [0, 0, -1], [0, Math.PI * .5, Math.PI * .5], [1, 1, 1], mSnow);


		if (simulationRunning) {
			//console.log("draw kugeln");
			kugelModels.forEach(initKugel);
		}



		//  createModel("plane", wireframe, cSnow, [.5, 0, 0], [0, Math.PI, Math.PI*.5], [1, 1, 1], mSnow);



		// createModel("plane", wireframe, cSnow, [0, 0, .5], [Math.PI*.5, 0, 0], [1, 1, 1], mSnow);
		//  createModel("plane", wireframe, cSnow, [0, 0, -.5], [Math.PI*.5, Math.PI, Math.PI], [1, 1, 1], mSnow);
		//
		//  createModel("plane", wireframe, cSnow, [0.5, 0, .0], [0, Math.PI, Math.PI*.5], [1, 1, 1], mSnow);
		//  createModel("plane", wireframe, cSnow, [-0.5, 0, .0], [Math.PI, Math.PI, Math.PI*.5], [1, 1, 1], mSnow);

		//  createModel("plane", wireframe, cSnow, [0.5, 0, .0], [0, Math.PI, Math.PI*.5], [1, 1, 1], mSnow);




		/*
 
		  // tanne hinten links
		  createModel("kegel", fs, cDarkBrown, [-Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1], mDarkBrown);
		createModel("zylinderUnten", fs, cPineGreen, [-Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderMitte", fs, cPineGreen,  [-Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderOben", fs, cPineGreen,  [-Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderOben2", fs, cPineGreen,  [-Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1], mPineGreen);
		//createModel("plate", fs, cPineGreen,  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1], mDarkBrown);
		createModel("plate", fs, cPineGreen,  [-Math.PI, 1.23, -Math.PI], [Math.PI *.5, 0, 0], [.55, .55, .55], mPineGreen);
 
 
 
		// tanne2 hinten rechts
		createModel("kegel", fs, cDarkBrown, [Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1], mDarkBrown);
		createModel("zylinderUnten", fs, cPineGreen, [Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderMitte", fs, cPineGreen,  [Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderOben", fs, cPineGreen,  [Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderOben2", fs, cPineGreen,  [Math.PI, .98, -Math.PI], [0, 0, 0], [1, 1, 1], mPineGreen);
		//createModel("plate", fs, cPineGreen,  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1], mDarkBrown);
		createModel("plate", fs, cPineGreen,  [Math.PI, 1.23, -Math.PI], [Math.PI *.5, 0, 0], [.55, .55, .55], mPineGreen);
 
 
		// tanne3 hinten rechts unten
		createModel("kegel", fs, cDarkBrown, [Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 1, 1], mDarkBrown);
		createModel("zylinderUnten", fs, cPineGreen, [Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderMitte", fs, cPineGreen,  [Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderOben", fs, cPineGreen,  [Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderOben2", fs, cPineGreen,  [Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 1, 1], mPineGreen);
		//createModel("plate", fs, cPineGreen,  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1], mDarkBrown);
		createModel("plate", fs, cPineGreen,  [Math.PI*1.5, 0.25, -Math.PI*.5], [Math.PI *.5, 0, 0], [.55, .55, .55], mPineGreen);
 
		// tanne4 hinten rechts unten tal
		createModel("kegel", fs, cDarkBrown, [Math.PI*1, -1, Math.PI*.0], [0, 0, 0], [1, 3, 1], mDarkBrown);
		createModel("zylinderUnten", fs, cPineGreen, [Math.PI*1, -.5, Math.PI*.0], [0, 0, 0], [.75, 1, .75], mPineGreen);
		createModel("zylinderMitte", fs, cPineGreen,  [Math.PI*1, -.5, Math.PI*.0], [0, 0, 0], [.75, 1, .75], mPineGreen);
		createModel("zylinderOben", fs, cPineGreen,  [Math.PI*1, -.5, Math.PI*.0], [0, 0, 0], [.75, 1, .75], mPineGreen);
		createModel("zylinderOben2", fs, cPineGreen,  [Math.PI*1, -.5, Math.PI*.0], [0, 0, 0], [.75, 1, .75], mPineGreen);
		//createModel("plate", fs, cPineGreen,  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1], mDarkBrown);
		createModel("plate", fs, cPineGreen,  [Math.PI*1, -.25, Math.PI*.0], [Math.PI *.5, 0, 0], [.41, .41, .41], mPineGreen);
 
		// tanne5 vorne
		createModel("kegel", fs, cDarkBrown, [Math.PI*-.47, -.3, Math.PI*.8], [0, 0, 0], [2, 3, 2], mDarkBrown);
		createModel("zylinderUnten", fs, cPineGreen, [Math.PI*-.47, .15, Math.PI*.8], [0, 0, 0], [1.25, 1, 1.25], mPineGreen);
		createModel("zylinderMitte", fs, cPineGreen,  [Math.PI*-.47, .15, Math.PI*.8], [0, 0, 0], [1.25, 1, 1.25], mPineGreen);
		createModel("zylinderOben", fs, cPineGreen,  [Math.PI*-.47, .15, Math.PI*.8], [0, 0, 0], [1.25, 1, 1.25], mPineGreen);
		createModel("zylinderOben2", fs, cPineGreen,  [Math.PI*-.47, .15, Math.PI*.8], [0, 0, 0], [1.25, 1, 1.25], mPineGreen);
		//createModel("plate", fs, cPineGreen,  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1], mDarkBrown);
		createModel("plate", fs, cPineGreen,  [Math.PI*-.47, 0.4, Math.PI*.8], [Math.PI *.5, 0, 0], [.69, .69, .69], mPineGreen);
 
		// tanne6 hinten mitte hügel
		createModel("kegel", fs, cDarkBrown, [0, .98, -Math.PI * 2] , [0, 0, 0], [1, 1, 1], mDarkBrown);
		createModel("zylinderUnten", fs, cPineGreen, [0, .98, -Math.PI * 2], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderMitte", fs, cPineGreen,  [0, .98, -Math.PI * 2], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderOben", fs, cPineGreen,  [0, .98, -Math.PI * 2], [0, 0, 0], [1, 1, 1], mPineGreen);
		createModel("zylinderOben2", fs, cPineGreen,  [0, .98, -Math.PI * 2], [0, 0, 0], [1, 1, 1], mPineGreen);
		//createModel("plate", fs, cPineGreen,  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1], mPineGreen);
		createModel("plate", fs, cPineGreen,  [0, 1.23, -Math.PI * 2], [Math.PI *.5, 0, 0], [.55, .55, .55], mPineGreen);
 
		// tanne7 hinten links unten
		createModel("kegel", fs, cDarkBrown, [-Math.PI*1.5, 0, -Math.PI*.5], [0, 0, 0], [1, 3, 1], mDarkBrown);
		createModel("zylinderUnten", fs, cPineGreen, [-Math.PI*1.5, .5, -Math.PI*.5], [0, 0, 0], [.75, 1, .75], mPineGreen);
		createModel("zylinderMitte", fs, cPineGreen,  [-Math.PI*1.5, .5, -Math.PI*.5], [0, 0, 0], [.75, 1, .75], mPineGreen);
		createModel("zylinderOben", fs, cPineGreen,  [-Math.PI*1.5, .5, -Math.PI*.5], [0, 0, 0], [.75, 1, .75], mPineGreen);
		createModel("zylinderOben2", fs, cPineGreen,  [-Math.PI*1.5, .5, -Math.PI*.5], [0, 0, 0], [.75, 1, .75], mPineGreen);
		//createModel("plate", fs, cPineGreen,  [-Math.PI, 1, -Math.PI], [Math.PI *.5, 0, 0], [.1, .1, .1], mPineGreen);
		createModel("plate", fs, cPineGreen,  [-Math.PI*1.5, 0.75, -Math.PI*.5], [Math.PI *.5, 0, 0], [.41, .41, .41], mPineGreen);
 
 
		// schneemann
		createModel("sphere", fs, cSnow, [.75, -.2, 2], [0, 0, 0], [.3, .25, .3], mSnow);
		createModel("sphere", fs, cSnow, [.75, .1, 2], [0, 0, 0], [.25, .2, .25], mSnow);
		createModel("sphere", fs, cSnow, [.75, .35, 2], [0, 0, 0], [.15, .15, .15], mSnow);
 
		createModel("kegel", fs, cDarkGray, [.75, .45, 2], [0, 0, 0], [1, .75, 1], mDarkGray);
		createModel("kegel", fs, cDarkGray, [.75, .45, 2], [0, 0, 0], [2, .1, 2], mDarkGray);
		createModel("zylinderNase", fs, cDarkOrange, [.46	,.25, 2.17], [0, Math.PI *.175, 0], [.3, .075, .075], mDarkOrange);	
 
		createModel("plate", fs, cDarkGray, [.75, 0.6375	, 2], [Math.PI *-.5, 0, 0], [.1	, .1, .1], mDarkGray);
		createModel("plate", fs, cDarkGray, [.75, .475, 2], [Math.PI *-.5, 0, 0], [.2	, .2, .2], mDarkGray);
		createModel("plate", fs, cDarkGray, [.75, .45, 2], [Math.PI *.5, 0, 0], [.2	, .2, .2], mDarkGray);
 
		//arm links
		createModel("zylinder", fs, cOcreBrown, [.65, .42, 2.7],[Math.PI*.35	, Math.PI*.00, Math.PI*0.06		], [.05, 1, .05], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.58, .42, 2.68],[Math.PI*.35	, Math.PI*.00, Math.PI*0.2		], [.01, .23, .01], mOcreBrown);
 
		// arm rechts
		createModel("zylinder", fs, cOcreBrown, [.4, .4, 1.7],[Math.PI*.75	, Math.PI*.00, Math.PI*.8		], [.05, 1, .05], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.51, .4, 1.72],[Math.PI*.8	, Math.PI*.00, Math.PI*1		], [.01, .2, .01], mOcreBrown);
 
 
	    
		// baum
		createModel("kegel", fs, cOcreBrown, [0, 1, 0], [0, 0, 0], [2, 1.5, 2], mOcreBrown);
		createModel("kegel", fs, cOcreBrown, [0, .9, 0], [0, 0, 0], [2, 1.5, 2], mOcreBrown);
		createModel("kegel", fs, cOcreBrown, [0, 1.2, 0], [Math.PI*.5, -.4, Math.PI *.5], [1.0, 2, 1.0], mOcreBrown);
		createModel("kegel", fs, cOcreBrown, [-0.4, 1.39, 0], [Math.PI*.5, .1, Math.PI *.5], [1.0, 2, 1.0], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [-1.3, 1.82, 0], [Math.PI*.5, -.8, Math.PI *.5], [.15, 1, .15], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [-1.1, 1.6, .5], [Math.PI*.5, -.8, Math.PI *.2	], [.07, 1, .07], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.28, 1.9	, .135], [Math.PI*0, Math.PI*-.15, Math.PI*-.15], [.285, 1.0, .285], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.15, 2.1	, .23], [Math.PI*0, Math.PI*.5, Math.PI*0.1	], [.12, .7, .12], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.34, 2.	, .16], [Math.PI*0, Math.PI*-.15, Math.PI*-.15], [.08, .7, .08], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.325	, 2.5	, .2], [Math.PI*0, Math.PI*1, Math.PI*0.1	], [.04, .8, .01], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [-.42		, 2.1	, .00], [Math.PI*0, Math.PI*2, Math.PI*.2	], [.13, 1.1	, .13], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [-.62		, 2.15	, .00], [Math.PI*0, Math.PI*2, Math.PI*.36	], [.02, .4	, .02], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.28	, 2.6	, .2], [Math.PI*0, Math.PI*1, Math.PI*-.02	], [.01, .3, .01], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.45	, 2.45		, .2], [Math.PI*0, Math.PI*1, Math.PI*.3	], [.02, .3, .02], mOcreBrown);
 
		createModel("zylinder", fs, cOcreBrown, [0		, 1.5	, 1], [Math.PI*.37, Math.PI*1.5, Math.PI*-.05	], [.2, 1.4	, .2], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.5		, 1.6	, 1.2], [Math.PI*.41, Math.PI*.01, Math.PI*-0.15	], [.13, 1.4	, .13], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.35		, 1.58	, 2], [Math.PI*.47, Math.PI*.00, Math.PI*-0.03	], [.1, 1.8	, .05], mOcreBrown);
		createModel("zylinder", fs, cOcreBrown, [.1		, 1.55	, 1.6], [Math.PI*.47, Math.PI*.00, Math.PI*0.11	], [.06	, .7	, .02], mOcreBrown);
 
		// schaukel
		createModel("kegel", fs, cDarkRed, [.29		, 1.1	, 1.6], [0, 0, 0], [.05, 1.8, .05], mDarkRed);
		createModel("kegel", fs, cDarkRed, [.29		, 1.08	, 1.2	], [0, 0, 0], [.05, 1.8, .05], mDarkRed);
		createModel("torus", fs, cDarkGray, [.29		, 1	, 1.41	], [Math.PI*0, Math.PI*.5, Math.PI*0], [.4, .4, .75], mDarkGray);*/





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






	function initKugel(k) {
		if (!k.immun) {
			if (k.gesund == false) {
				//console.log("draw ungesund");
				createModel("sphere", "wireframefill", cDarkRed, k.startPunkt, [0, 0, 0], [k.radius, k.radius, k.radius], mDarkRed);
			} else if (k.gesund) {
				//console.log("draw gesund");
				createModel("sphere", "wireframefill", cPineGreen, k.startPunkt, [0, 0, 0], [k.radius, k.radius, k.radius], mPineGreen);
			}
		} else {
			if (k.gesund == false) {
				createModel("sphere", "wireframefill", cYellow, k.startPunkt, [0, 0, 0], [k.radius, k.radius, k.radius], mYellow);
			} else if (k.gesund) {
				createModel("sphere", "wireframefill", cBlue, k.startPunkt, [0, 0, 0], [k.radius, k.radius, k.radius], mBlue);
			}

		}
	}

	/**
	 * Create model object, fill it and push it in models array.
	 * 
	 * @parameter geometryname: string with name of geometry.
	 * @parameter fillstyle: wireframe, fill, fillwireframe.
	 */
	function createModel(geometryname, fillstyle, color, translate, rotate, scale, material) {
		var model = {};
		model.fillstyle = fillstyle;
		model.color = color;
		model.material = material;


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
			rekursionsSchritt = parseInt(c) - 1;

			switch (c) {
				/*  case('S'):
					  interactiveModel.scale[0] *= 1 + sign * deltaScale;
					  interactiveModel.scale[1] *= 1 - sign * deltaScale;
					  interactiveModel.scale[2] *= 1 + sign * deltaScale;
					  break;*/

				case ('1'):
					console.log("1");
					document.getElementById("textCanvas").innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
					break;
				case ('2'):
					document.getElementById('textCanvas').innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
					break;
				case ('3'):
					document.getElementById("textCanvas").innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
					break;
				case ('4'):
					document.getElementById('textCanvas').innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
					break;
			/*	case ('5'):
					document.getElementById('textCanvas').innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
					break;
				case ('6'):
					document.getElementById('textCanvas').innerHTML = rekursionsSchritt + ". Kugel-Rekursionsschritt";
					models = [];
					initModels();
					render();
					break;*/





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
					if (!camLocked || camera.eye[1] > 1.91) {
						camera.eye[1] += -1 * deltaTranslate;
						//	console.log(camera.eye[1]);

					}
					break;

				case ('E'):
					//if (camera.eye[1] < 1.5) {
					// Move camera up and down.
					camera.eye[1] += 1 * deltaTranslate;
					//console.log(camera.eye[1]);
					//}


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

				case ('C'):
					// Camera distance to center.
					camLocked = !camLocked;
					if (camera.eye[1] < 1.91) {
						camera.eye[1] = 1.91;
					}
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




				case ('L'):
					moveLightsAroundModels();
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



	function simulate() {

	}



	function moveLightsAroundModels() {

		currentLightRotation += deltaRotate;
		illumination.light[0].position[0] = Math.cos(currentLightRotation) * radiusLights;
		illumination.light[0].position[2] = Math.sin(currentLightRotation) * radiusLights;

		illumination.light[1].position[0] = Math.cos(Math.PI + currentLightRotation) * radiusLights;
		illumination.light[1].position[2] = Math.sin(Math.PI + currentLightRotation) * radiusLights;
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



		// Set light uniforms.
		gl.uniform3fv(prog.ambientLightUniform, illumination.ambientLight);
		// Loop over light sources.
		for (var j = 0; j < illumination.light.length; j++) {
			// bool is transferred as integer.
			gl.uniform1i(prog.lightUniform[j].isOn,
				illumination.light[j].isOn);
			// Tranform light postion in eye coordinates.
			// Copy current light position into a new array.
			var lightPos = [].concat(illumination.light[j].position);
			// Add homogenious coordinate for transformation.
			lightPos.push(1.0);
			vec4.transformMat4(lightPos, lightPos, camera.vMatrix);
			// Remove homogenious coordinate.
			lightPos.pop();
			gl.uniform3fv(prog.lightUniform[j].position, lightPos);
			gl.uniform3fv(prog.lightUniform[j].color,
				illumination.light[j].color);
		}


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


			// Material.
			gl.uniform3fv(prog.materialKaUniform, models[i].material.ka);
			gl.uniform3fv(prog.materialKdUniform, models[i].material.kd);
			gl.uniform3fv(prog.materialKsUniform, models[i].material.ks);
			gl.uniform1f(prog.materialKeUniform, models[i].material.ke);


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
			gl.uniform4fv(prog.colorUniform, [0., 0., 0., 1.]);
			gl.disableVertexAttribArray(prog.normalAttrib);
			gl.vertexAttrib3f(prog.normalAttrib, 0, 0, 0);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.iboLines);
			gl.drawElements(gl.LINES, model.iboLines.numberOfElements,
				gl.UNSIGNED_SHORT, 0);
		}
	}




	document.getElementById("simulationsGeschwindigkeit").oninput = function () {
		valueSimulationsGeschwindigkeit.innerHTML = this.value;
		clearInterval(simulationInterval);
		//simulationPaused = true;
		clearInterval(simulationInterval);
		speed = 400/ this.value;
		console.log("speed" + speed);
		//simulationPaused = false;
		startSimulation();

		
	}
/*
	document.getElementById("simulationsGeschwindigkeit").onpointerup = function () {
		valueSimulationsGeschwindigkeit.innerHTML = this.value;
		//clearInterval(simulationInterval);
		//simulationPaused = true;
		clearInterval(simulationInterval);
		speed = this.value;
		console.log("speed");
		simulationPaused = false;
		startSimulation();

		
	}
*/

	// App interface.
	return {
		start: start
	}






}());











document.getElementById("anzahlKugelnN").oninput = function () {
	valueAnzahlKugelnN.innerHTML = this.value;
	if (document.getElementById("anzahlKrankeK").value > this.value) {
		document.getElementById("anzahlKrankeK").value = this.value;
		valueAnzahlKrankeK.innerHTML = this.value;
	}
	document.getElementById("anzahlKrankeK").max = this.value;
}

document.getElementById("anzahlKrankeK").oninput = function () {
	valueAnzahlKrankeK.innerHTML = this.value;
	valueAnzahlGesundeG.innerHTML = valueAnzahlKugelnN.innerHTML - this.value;
}
document.getElementById("gesundungsZeitschritteZ").oninput = function () {
	valueGesundungsZeitschritteZ.innerHTML = this.value;
}
document.getElementById("kugelRadiusR").oninput = function () {
	valueKugelRadiusR.innerHTML = Math.round((this.value * .1) * 100) / 100;
}







$(document).ready(function () {
	$('.modal').modal();
});