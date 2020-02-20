var myChart = null

function creagraph(data,linear,nameX,nameY){
    var ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'data',
                data: data,
                backgroundColor: '#5e64c1',
            },{
                label: 'prediction',
                data: linear,
                backgroundColor: "#ba1f1f",
                borderColor: "#ba1f1f",
                type : "line",
                fill: false
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: nameX != '',
                        labelString: nameX
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: nameY != '',
                        labelString: nameY
                    }
                }]
            }
        }
    });
}

function cleargraph() {
    if (myChart)
        myChart.destroy()
}