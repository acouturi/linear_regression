
    
function calcButton() {
    let dist = Number(document.getElementById('predDist').value)
    let teta0 = Number(document.getElementById('teta0').value)
    let teta1 = Number(document.getElementById('teta1').value)
    document.getElementById('predSolv').value = predicCalc(dist, teta0, teta1)
}

function trainBtn() {
    let files = document.getElementById('trainFile').files
	const learningRate = document.getElementById('predRatio').value
	const iteNumber = document.getElementById('predIte').value
    trainalgo(files, learningRate, iteNumber)
}

document.addEventListener('eventTheta', function (e) { 
    cleargraph()
	document.getElementById('teta0').value = e.detail.t0
	document.getElementById('teta1').value = e.detail.t1
    creagraph(e.detail.data, 
        [{x:e.detail.maxX,y:predicCalc(e.detail.maxX, e.detail.t0, e.detail.t1)},
         {x:e.detail.minX,y:predicCalc(e.detail.minX, e.detail.t0, e.detail.t1)}],
        e.detail.nameX,e.detail.nameY)
    // console.log('listen',e.detail)
}, false);


// import { predicCalc } from './prediction';
// console.log(predicCalc(1,1,1))


// var ctx = document.getElementById('myChart');
// var myChart = null
// cleargraph(myChart)
// myChart = creagraph(data, [{x:maxX,y:predicCalc(maxX)},{x:minX,y:predicCalc(minX)}],nameX,nameY, ctx)
