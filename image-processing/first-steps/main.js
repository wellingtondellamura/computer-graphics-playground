var image = document.getElementById('image');
var canvas = document.getElementById('image-canvas');
var context;
var canvasCIE = document.getElementById('image-canvasCIE');
var contextCIE;
var canvasNTSC = document.getElementById('image-canvasNTSC');
var contextNTSC;

let load = function (){
    context = canvas.getContext('2d');
    contextCIE = canvasCIE.getContext('2d');
    contextNTSC = canvasNTSC.getContext('2d');
    drawImage(canvas, context, image);
    drawImage(canvasCIE, contextCIE, image);
    drawImage(canvasNTSC, contextNTSC, image);
}

let drawImage = function(cv, ctx, img) {
    cv.width = img.width;
    cv.height = img.height;
    ctx.drawImage(img, 0, 0);
}

let grayScale = function() {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var gray = (red + green + blue) / 3; 
        data[i] = data[i+1] = data[i+2] = gray;
    }
    context.putImageData(imageData, 0, 0);
}


let grayScaleCIE = function() {
    var imageData = contextCIE.getImageData(0, 0, canvasCIE.width, canvasCIE.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var gray = (red*0.2126 + green*0.7152 + blue*0.0722); 
        data[i] = data[i+1] = data[i+2] = gray;
    }
    contextCIE.putImageData(imageData, 0, 0);
}



let grayScaleNTSC = function() {
    var imageData = contextNTSC.getImageData(0, 0, canvasNTSC.width, canvasNTSC.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var red = data[i];
        var green = data[i+1];
        var blue = data[i+2];
        var gray = (red*0.299 + green*0.587 + blue*0.144); 
        data[i] = data[i+1] = data[i+2] = gray;
    }
    contextNTSC.putImageData(imageData, 0, 0);
}

let monoScale = function() {
    var threshold = 95;
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i+=4) {
        var gray = (data[i] + data[i+1] + data[i+2]) / 3;
        var mono = 255;
        if (gray <= threshold){
            mono = 0;
        }
        data[i] = data[i+1] = data[i+2] = mono;
    }
    context.putImageData(imageData, 0, 0);
}

document.getElementById('btnLoad').addEventListener('click', load);
document.getElementById('btnGray').addEventListener('click', grayScale);
document.getElementById('btnGrayCIE').addEventListener('click', grayScaleCIE);
document.getElementById('btnGrayNTSC').addEventListener('click', grayScaleNTSC);
document.getElementById('btnMono').addEventListener('click', monoScale);