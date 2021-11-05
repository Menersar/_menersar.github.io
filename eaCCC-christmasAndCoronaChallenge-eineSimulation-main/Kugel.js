


class Kugel {


	constructor(_id, _radius, _gesund, _minPosition, _maxPosition, _zeitZumGesundwerden) {



		this.id = _id;
		this.startPunkt = [getRandomArbitrary(_minPosition, _maxPosition), getRandomArbitrary(_minPosition, _maxPosition), getRandomArbitrary(_minPosition, _maxPosition)];
		this.richtung = [randomIntFromInterval(0, 1), randomIntFromInterval(0, 1), randomIntFromInterval(0, 1)];
		this.geschwindigkeit = getRandomArbitrary(1, 10) * .001;
		this.radius = _radius;
		this.gesund = _gesund;
		this.vergangeneZeitschritte = 0;
		this.zeitZumGesundwerden = _zeitZumGesundwerden;

		this.immun = false;

	}



	moveKugel() {

		if (!this.gesund) {
			this.vergangeneZeitschritte++;
			if (this.vergangeneZeitschritte >= this.zeitZumGesundwerden) {
				this.gesund = true;
				this.vergangeneZeitschritte = 0;
				this.immun = true;
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


		this.startPunkt[0] = this.startPunkt[0] + this.richtung[0] * this.geschwindigkeit;
		this.startPunkt[1] = this.startPunkt[1] + this.richtung[1] * this.geschwindigkeit;
		this.startPunkt[2] = this.startPunkt[2] + this.richtung[2] * this.geschwindigkeit;

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


	testInfection(otherKugeln) {
		//console.log("test infection");
		if (!this.gesund) {
			return;
		}
		if (this.gesund) {
			//let ges = true;
			otherKugeln.forEach((k) => {
				if (k.id != this.id && this.intersect(k.startPunkt)) {
				//	console.log("test intersect");
					if (!k.gesund) {
					//	console.log("he touched me");
						this.gesund = false;
					}
				}
			});

		}
	}




	intersect(otherKugelPosition) {
		let r = this.radius;
		let d = Math.sqrt((otherKugelPosition[0] - this.startPunkt[0]) * (otherKugelPosition[0] - this.startPunkt[0])
			+ (otherKugelPosition[1] - this.startPunkt[1]) * (otherKugelPosition[1] - this.startPunkt[1])
			+ (otherKugelPosition[2] - this.startPunkt[2]) * (otherKugelPosition[2] - this.startPunkt[2]));
		//console.log("radius " + radius+radius);

		return d < (r + r);
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


function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

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





