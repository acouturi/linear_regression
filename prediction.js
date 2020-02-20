function calcButton() {
    let dist = Number(document.getElementById('predDist').value)
    document.getElementById('predSolv').value = predicCalc(dist)
}

function predicCalc(dist) {
    let teta0 = Number(document.getElementById('teta0').value)
    let teta1 = Number(document.getElementById('teta1').value)
    return ((teta1 * dist) + teta0)
}