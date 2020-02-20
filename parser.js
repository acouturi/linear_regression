
function trainalgo() {
	let files = document.getElementById('trainFile').files
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
	// let file = document.getElementById('trainFile').value
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
        cleargraph()
		calcTetas(data, minX, maxX)
		creagraph(data, [{x:maxX,y:predicCalc(maxX)},{x:minX,y:predicCalc(minX)}],nameX,nameY)
	};
	reader.readAsText(file);
}