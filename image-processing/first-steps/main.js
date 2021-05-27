var image = document.getElementById('image');
var canvas = document.getElementById('image-canvas');
var context;

let load = function (){
    context = canvas.getContext('2d');
    drawImage();
}

let drawImage = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
}

let grayScale = function() {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var gray = (data[i] + data[i+1] + data[i+2]) / 3;
        data[i] = data[i+1] = data[i+2] = gray;
    }
    context.putImageData(imageData, 0, 0);
}

let monoScale = function() {
    var threshold = 100;
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var gray = (data[i] + data[i+1] + data[i+2]) / 3;
        var mono = 255;
        if (gray < threshold){
            mono = 0;
        }
        data[i] = data[i+1] = data[i+2] = mono;
    }
    context.putImageData(imageData, 0, 0);
}

document.getElementById('btnLoad').addEventListener('click', load);
document.getElementById('btnGray').addEventListener('click', grayScale);
document.getElementById('btnMono').addEventListener('click', monoScale);