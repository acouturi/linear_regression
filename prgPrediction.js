 
const fs = require('fs') 
eval(fs.readFileSync('./code/prediction.js')+'');

if (process.argv.length < 3)
	return console.warn("usage : node prgPrediction.js [distance number, ...]")
let lstdist = process.argv.splice(2)
for (let i = 0; i < lstdist.length; i++) {
	if (isNaN(lstdist[i]))
		return console.warn("usage : all distances must be numbers")
}
lstdist = lstdist.map(x => Number(x))

fs.readFile('./data.json', (err, data) => { 
	if (err) throw err; 
  
	data = JSON.parse(data)
	console.log('theta0 : ' + data.t0 + ', theta1 : ' + data.t1)
	lstdist.forEach(element => {
		console.log('pour une distance de ' + element + ' le prix estimé est ' + predicCalc(element, data.t0, data.t1))
		
	});
}) 
