// const fs = require('fs') 

function calcTetas(data, minX, maxX){
	let cpydata = JSON.parse(JSON.stringify(data))
	let teta0 = 0
	let teta1 = 0
	const learningRate = document.getElementById('predRatio').value
	const iteNumber = document.getElementById('predIte').value
	var m = cpydata.length;
	var tmpT0 = 1;
	var tmpT1 = 1;
	let scale = maxX - minX;

	// Scale the Xs to speed up the algo
	for (var i = 0; i < m; i++){
		cpydata[i].x = (cpydata[i].x - minX) / scale;
	}
	
	let loop = iteNumber
	while (loop--) {
	// while(Math.abs(tmpT1) > 0.001 && Math.abs(tmpT0) > 0.001){

		var sum0 = 0;
		var sum1 = 0;
		for (var i = 0; i < m; i++){
			sum0 += (teta0 + (teta1 * cpydata[i].x)) - cpydata[i].y;
			sum1 += ((teta0 + (teta1 * cpydata[i].x)) - cpydata[i].y) * cpydata[i].x;
		}

		tmpT0 = learningRate * (1 / m) * sum0;
		tmpT1 = learningRate * (1 / m) * sum1;

		// Sync previous thetas
		teta0 -= tmpT0;
		teta1 -= tmpT1;
	}

	// Scale down the slope
	teta1 = teta1 / scale;

	document.getElementById('teta0').value = teta0
	document.getElementById('teta1').value = teta1
}