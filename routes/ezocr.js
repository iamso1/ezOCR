var express = require('express');
var router = express.Router();

//include ocrad.js
var OCRAD=require("ocrad.js");

//include canvas
var Canvas = require('canvas');
var Image = Canvas.Image;


var ProcessImage=function(base64Str,callback){
    var canvas = new Canvas(331, 49); //remember to adjust this params according to the size of target image 
    var ctx = canvas.getContext('2d');
    var image = new Image();
    image.src=base64Str;
    ctx.drawImage(image, 0, 0);
    var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    
    //remove noise of image 
    
    
    ctx.putImageData(canvasData, 0, 0);
    callback(canvas);
}

/* POST ezocr listing. */
router.post('/', function(req, res, next) {
    //image preprocessing
    ProcessImage(req.body.base64Str, function(canvas){
        res.send(OCRAD(canvas));    
    });
});

module.exports = router;
