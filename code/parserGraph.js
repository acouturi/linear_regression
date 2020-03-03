
function trainalgo(files, learningRate, iteNumber) {
	if (files.length != 1) {
		alert("no file, one file is necessary")
		return
	}
	let file = files[0]
	let tmpfilename = file.name.split('.')
	if (tmpfilename[tmpfilename.length - 1] != 'csv') {
		alert("the file is not a csv")
		return
    }
	var reader = new FileReader();
	reader.onload = function(){
		let nameX = ''
		let nameY = ''
		let data = []
		let minX = 0;
		let maxX = 0;
		var lines = reader.result.split('\n');
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i].split(',')
			if (line.length != 2) {
				if (Number(line[0]) != '') {
					alert("the line " + (i + 1) + " have bad format")
					return
				}
			}
			else {
				if (i == 0) {
					nameX = line[0]
					nameY = line[1]
				}
				else {
					line = [Number(line[0]),Number(line[1])]
					if (line[0] == NaN || line[1] == NaN) {
						alert("the line " + (i + 1) + " have bad number")
						return
					}
					if (i == 1) {
						minX = line[0]
						maxX = line[0]
					}
					else {
						minX = minX < line[0] ? minX : line[0]
						maxX = maxX > line[0] ? maxX : line[0]
					}
					data = data.concat([{x:line[0],y:line[1]}])
				}
			}
		}
		// console.log(data)
		// calcTeta(data)
  		let thetas = calcTetas(data, minX, maxX, learningRate, iteNumber)
		let sendData = {
			"t0" : thetas.t0,
			"t1" : thetas.t1,
			"data" : data,
			"minX" : minX,
			"maxX" : maxX,
			"nameX" : nameX,
			"nameY" : nameY
		}
		let eventTheta = new CustomEvent('eventTheta', {detail: sendData})
		document.dispatchEvent(eventTheta)
	};
	reader.readAsText(file);
}