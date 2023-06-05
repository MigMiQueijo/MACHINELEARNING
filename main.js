function tirarFoto() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='selfie' src=' " + data_uri + "'/>"
    })
}
Webcam.set({
    width: 300,
    height: 300,
    image_format: 'png',
    png_quality: 90
})
camera = document.getElementById("camera")
Webcam.attach("camera")


console.log("version ml5", ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/B98_zRi_h/model.json", modelLoaded)
function modelLoaded() {
    console.log("model Loaded")
}

function checar() {
    image = document.getElementById("selfie")
    classifier.classify(image, gotResult)
}
function gotResult(error, results){
    if (error) {
        console.error(error)
    }
    else{
        console.log(results)
        var zeroObjeto = results[0].label
        var zeroConfidence = results[0].confidence
        document.getElementById("nomeObjeto").innerHTML = zeroObjeto
        document.getElementById("precisao").innerHTML = Math.floor(zeroConfidence * 100) + "%"
    }
}