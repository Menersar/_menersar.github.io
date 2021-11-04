
var id;
var startPunkt; 
var richtung;
var geschwindigkeit;
var radius;
var gesund; 
var vergangeneZeitschritte;
var zeitZumGesundwerden;



class Kugel {
	constructor(_id, _radius, _gesund, _minPosition, _maxPosition, _zeitZumGesundwerden) {

	this.id = _id;
	this.startPunkt = [getRandomArbitrary(_minPosition, _maxPosition),getRandomArbitrary(_minPosition, _maxPosition),getRandomArbitrary(_minPosition, _maxPosition)];
	this.richtung = [randomIntFromInterval(0,1),randomIntFromInterval(0,1),randomIntFromInterval(0,1)];
	this.geschwindigkeit = getRandomArbitrary(1,10) *.001;
	this.radius = _radius,
	this.gesund = _gesund,
	this.vergangeneZeitschritte = 0;
	this.zeitZumGesundwerden = _zeitZumGesundwerden;

	}



	moveKugel() {

		if (!this.gesund) {
			this.vergangeneZeitschritte ++;
			if (this.vergangeneZeitschritte >= this.zeitZumGesundwerden) {
				this.gesund = true;
				this.vergangeneZeitschritte = 0;
			}
		}
		this.startPunkt[0] = this.startPunkt[0] + this.richtung[0] * this.geschwindigkeit;
		this.startPunkt[1] = this.startPunkt[1] + this.richtung[1] * this.geschwindigkeit;
		this.startPunkt[2] = this.startPunkt[2] + this.richtung[2] * this.geschwindigkeit;
	
		if (this.startPunkt[0] + this.radius > 1 ) {
			this.startPunkt[0] = -1 + this.radius;
		}
	
		if (this.startPunkt[0] - this.radius < -1 ) {
			this.startPunkt[0] = 1 - this.radius;
		}
	
	
		if (this.startPunkt[1] + this.radius > 1 ) {
			this.startPunkt[1] = -1 + this.radius ;
		}
	
		if (this.startPunkt[1] - this.radius < -1 ) {
			this.startPunkt[1] = 1 - this.radius;
		}
	
	
		if (this.startPunkt[2] + this.radius > 1 ) {
			this.startPunkt[2] = -1 + this.radius;
		}
	
		if (this.startPunkt[2] - this.radius < -1 ) {
			this.startPunkt[2] = 1 - this.radius;
		}

	//	if (kugel.gesund) {
			//	console.log("test if infected touch me");
		//		kugel.gesund = testInfection(kugel);
		//	}
	
	}


	testInfection(otherKugeln) {
		if (this.gesund) {
			let ges = true;
			otherKugeln.forEach((k) => {
				if (k.id != this.id && intersect(k.startPunkt, this.startPunkt)) {
		  			if (!k.gesund ) {
			  		//console.log("he touched me");
			  		this.gesund = false;
		  			}
				}
	  		});
  
		}
	}

	


	

}


function intersect(otherKugelPosition, thisKugelPosition) {
	let radius = parseFloat( this.radius);
	let distanz = Math.sqrt((otherKugelPosition[0] - thisKugelPosition[0]) * (otherKugelPosition[0] - thisKugelPosition[0])
		+ (otherKugelPosition[1] - thisKugelPosition[1]) * (otherKugelPosition[1] - thisKugelPosition[1])
		+ (otherKugelPosition[2] - thisKugelPosition[2]) * (otherKugelPosition[2] - thisKugelPosition[2]));
	//console.log("radius " + radius+radius);

  return distanz < (radius + radius);
}


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





