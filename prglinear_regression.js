
const fs = require('fs')
const readline = require('readline');

eval(fs.readFileSync('./code/entrainement.js')+'');
if (process.argv.length != 3)
	return console.warn("usage : node prglinear_regression.js [file name]")
let file = process.argv[2]
let tmpfilename = file.split('.')
if (tmpfilename[tmpfilename.length - 1] != 'csv') {
    return console.warn("the file is not a csv")
}


let line_no = 0;

let rl = readline.createInterface({
    input: fs.createReadStream(file)
});

let data = []
let minX = 0;
let maxX = 0;
rl.on('line', function(line) {
    line_no++;
    line = line.split(',')
    if (line.length != 2) {
        if (Number(line[0]) != '') {
            return console.log("the line " + (line_no + 1) + " have bad format")
        }
    }
    else {
        if (line_no != 1) {
            line = [Number(line[0]),Number(line[1])]
            if (line[0] == NaN || line[1] == NaN) {
                return console.log("the line " + (line_no + 1) + " have bad number")
            }
            if (line_no == 2) {
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
});

rl.on('close', function() {
    fs.readFile('./data.json', (err, parameter) => { 
        if (err) {
            if (err.errno != -4058) return console.log(err)
            parameter = {"t0" : 0,
                    "t1" : 0,
                    "nbIter" : 10000,
                    "ratio" : 0.1}
        }
        else
        parameter = JSON.parse(parameter)

        let thetas = calcTetas(data, minX, maxX, parameter.ratio, parameter.nbIter)
        parameter.t0 = thetas.t0
        parameter.t1 = thetas.t1
    //*
        fs.writeFile('./data.json',JSON.stringify(parameter, null, 4), function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
            console.log('theta0 : ' + parameter.t0 + ', theta1 : ' + parameter.t1)

        })
    //*/
    }) 
    // console.log('Total lines : ' + line_no);
});



// eventTheta
