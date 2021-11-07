


class MyChart {


	constructor() {


		this.ctx = document.getElementById('chart').getContext('2d');
		this.chart;

		this.immune;
		this.kranke;
		this.immune;
		this.immuneKranke;

	//	this.readyToPlay = true;


	}




	createChart() {
	//ctx = document.getElementById('chart').getContext('2d');

		this.chart = new Chart(this.ctx, {

			type: 'pie',
			data: {
				//labels: ["Kugeln", "Gesund", "Krank", "Immun", "Immun, Krank"],
				labels: ["Gesund", "Krank", "Immun", "Immun und Krank"],
				datasets: [
					{
						label: "Anzahl Kugeln (Prozent)",
						//backgroundColor: ["#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
						backgroundColor: ["#9e9e9e"],
						data: [100, 0, 0, 0, 0]
						//data: [100]
					}
				]
			},
			options: {
				plugins: {  // 'legend' now within object 'plugins {}'
					legend: {
					  labels: {
						color: "white",  // not 'fontColor:' anymore
						// fontSize: 18  // not 'fontSize:' anymore
						font: {
						  //size: 18 // 'size' now within object 'font {}'
						}
					  }
					}
				},
				tooltips: {
					enabled: false,
				},
				animation: {
					duration: 1,
				},
				title: {
					display: true,
					text: 'Grafische Darstellung der Corona-Simulation mit Anzahl der Kugeln'
				},
				
			}
		});
	}


	clear () {
		this.chart.data= {
			labels: ["Gesund", "Krank", "Immun", "Immun und Krank"],
			//labels: [""],
			datasets: [
				{
					backgroundColor: ["#9e9e9e"],
					
					//backgroundColor: ["#808080"],
					//data: [2478, 5267, 734, 784, 433]
					data: [100]
				}
			]
		};

		this.chart.options = {
				
				animation: {
					duration: 1,
				},

				plugins: {  // 'legend' now within object 'plugins {}'
					legend: {
					  labels: {
						color: "white",  // not 'fontColor:' anymore
						// fontSize: 18  // not 'fontSize:' anymore
						font: {
						  //size: 18 // 'size' now within object 'font {}'
						}
					  }
					}
				},
				
				
			
		};


		this.chart.update();






	}





	redraw(_kugelModels) {

		this.immune = _kugelModels.filter((kugel)=> kugel.immun == true && kugel.gesund == true).length;
		this.kranke = _kugelModels.filter((kugel)=> kugel.immun == false && kugel.gesund == false).length;
		this.gesunde = _kugelModels.filter((kugel)=> kugel.immun == false && kugel.gesund == true).length;
		this.immuneKranke = _kugelModels.filter((kugel)=> kugel.immun == true && kugel.gesund == false).length;

	//	console.log(chartVariables.immune);


		this.chart.data = {
				labels: ["Gesund", "Krank", "Immun", "Immun und Krank"],
				datasets: [
					{
						//label: "Population (millions)",
						backgroundColor: ["#00c851", "#ff4444", "#33b5e5", "#ffbb33"],
						data: [this.gesunde, this.kranke, this.immune,this.immuneKranke]
					}
				]
			};

			this.chart.options = {
				
				animation: {
					duration: 0,
				},
				
				plugins: {  // 'legend' now within object 'plugins {}'
					legend: {
					  labels: {
						color: "white",  // not 'fontColor:' anymore
						// fontSize: 18  // not 'fontSize:' anymore
						font: {
						  //size: 18 // 'size' now within object 'font {}'
						}
					  }
					}
				},
			
		};

			this.chart.update();
			
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

function createChart() {
	this.readyToPlay = true;
}
