


class Kugel {


	constructor(_id, _radius, _gesund, _minPosition, _maxPosition, _zeitZumGesundwerden, _kugelModels, _canBecomeImmune) {



		this.id = _id;
		this.radius = _radius;
		this.startPunkt; 
		this.createPosition(_minPosition, _maxPosition, _kugelModels);
		this.richtung = [getRandomArbitrary(0.1, 1), getRandomArbitrary(0.1, 1), getRandomArbitrary(0.1, 1)];
		//console.log("before:"+this.richtung[0]+"|"+this.richtung[1]+"|"+this.richtung[2]);
		vec3.normalize(this.richtung,this.richtung);
		//console.log("after:"+this.richtung[0]+"|"+this.richtung[1]+"|"+this.richtung[2]);
		this.geschwindigkeit = getRandomArbitrary(1, 10) * .001;
		this.gesund = _gesund;
		this.vergangeneZeitschritte = 0;
		this.zeitZumGesundwerden = _zeitZumGesundwerden;

		this.immun = false;

		this.sound = true;

		this.soundFile = new Audio('pew.wav');

		this.canBecomeImmune = _canBecomeImmune;

	//	this.readyToPlay = true;


	}


	createPosition (_minPos, _maxPos, _kugelMod) {
		this.startPunkt =  [getRandomArbitrary(_minPos, _maxPos), getRandomArbitrary(_minPos, _maxPos), getRandomArbitrary(_minPos, _maxPos)];

		if (_kugelMod.length > 0) {
			_kugelMod.forEach((k) => {
			if (this.intersect(k.startPunkt)) {
				this.createPosition(_minPos, _maxPos, _kugelMod);
			}
		});
	}
	}


	toggleSound() {
		this.sound = !this.sound;
	}


	moveKugel() {

		if (!this.gesund) {
			this.vergangeneZeitschritte++;
			if (this.vergangeneZeitschritte >= this.zeitZumGesundwerden) {
				this.gesund = true;
				this.vergangeneZeitschritte = 0;
				if (this.canBecomeImmune) {
				this.immun = true;
				//chartVariables.immune ++;
				}
			}
		}

		if (this.immun && !this.gesund) {
			this.vergangeneZeitschritte++;
			if (this.vergangeneZeitschritte >= 10) {
				this.gesund = true;
				this.vergangeneZeitschritte = 0;
				//this.immun = true;
			}
		}


		vec3.scaleAndAdd(this.startPunkt, this.startPunkt, this.richtung, this.geschwindigkeit);


		if (this.startPunkt[0] + this.radius > 1) {
			this.startPunkt[0] = -1 + this.radius;
		}

		if (this.startPunkt[0] - this.radius < -1) {
			this.startPunkt[0] = 1 - this.radius;
		}


		if (this.startPunkt[1] + this.radius > 1) {
			this.startPunkt[1] = -1 + this.radius;
		}

		if (this.startPunkt[1] - this.radius < -1) {
			this.startPunkt[1] = 1 - this.radius;
		}


		if (this.startPunkt[2] + this.radius > 1) {
			this.startPunkt[2] = -1 + this.radius;
		}

		if (this.startPunkt[2] - this.radius < -1) {
			this.startPunkt[2] = 1 - this.radius;
		}

		//	if (kugel.gesund) {
		//	console.log("test if infected touch me");
		//		kugel.gesund = testInfection(kugel);
		//	}

	}


	testInfection(otherKugeln, _sound ) {

		//console.log("test infection");
	/*	if (!this.gesund) {
			return;
		}*/
	//	if (this.gesund) {
			//let ges = true;
			otherKugeln.forEach((k) => {
				if (k.id != this.id && this.intersect(k.startPunkt)) {
					
					vec3.normalize(k.richtung, vec3.subtract(this.richtung, this.richtung, k.richtung));
					vec3.negate(this.richtung, k.richtung);

					vec3.scaleAndAdd(this.startPunkt, this.startPunkt, this.richtung, this.radius*.1);
					vec3.scaleAndAdd(k.startPunkt, k.startPunkt, k.richtung, k.radius*.1);

					if (this.sound && _sound) {
					//	this.readyToPlay = false;
					this.soundFile.volume = .1;
					this.soundFile.play();
					//this.soundFile.onended = function() {makeReadyToPlay()};
					}

					//vec3.negate(this.richtung, this.richtung);
					//vec3.negate(k.richtung, k.richtung);
				//	vec3.normalize(this.richtung,this.richtung);
				//	console.log("test intersect");
					if (!k.gesund) {
					//	console.log("he touched me");
						this.gesund = false;
					}
				}
			});

	//	} 
					
				
	}

	




	intersect(otherKugelPosition) {
		let r = this.radius;
		let d =	vec3.distance(otherKugelPosition, this.startPunkt);
		//console.log("radius " + radius+radius);

		return d <= (r + r);
	}



}
/*

function intersect(otherKugelPosition) {
	let _radius = this.radius;
	let _distanz = Math.sqrt((otherKugelPosition[0] - this.startPunkt[0]) * (otherKugelPosition[0] - this.startPunkt[0])
		+ (otherKugelPosition[1] - this.startPunkt[1]) * (otherKugelPosition[1] - this.startPunkt[1])
		+ (otherKugelPosition[2] - this.startPunkt[2]) * (otherKugelPosition[2] - this.startPunkt[2]));
	//console.log("radius " + radius+radius);

  return _distanz < (_radius + _radius);
}*/

function makeReadyToPlay() {
	this.readyToPlay = true;
}
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

/*

function magnitude (x,y,z) {
    return Math.sqrt(x * x + y * y + z + z);
}



function normalizeVector (v) {
    var mag = this.magnitude(v[0],v[1],v[2]);
    return new Vector(this.mX/mag, this.mY/mag, this.mZ/mag);
};*/

/*


function createKugel(id, radius, gesund, minPosition, maxPosition) {

	var k = {
		id: id,
		startPunkt: [getRandomArbitrary(minPosition, maxPosition),getRandomArbitrary(minPosition, maxPosition),getRandomArbitrary(minPosition, maxPosition)],
		richtung: [randomIntFromInterval(0,1),randomIntFromInterval(0,1),randomIntFromInterval(0,1)],
		geschwindigkeit: getRandomArbitrary(1,10) *.001,
		radius: radius,
		gesund: gesund,
		vergangeneZeitschritte:0,

	};

	return k;

}*/





