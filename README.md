ezocr
=====

OCR practice with pure-javascript OCR module

------

## 1. Introduction

In order to recognize the words on captcha, we need the OCR tech.

To achieve the goal, there are two challanges:
    1. Image preprocessing: How to filter out the noise in image 
    2. Accuracy of OCR result: How to raise the accuracy of your model 

Unfortunately, these challanges I mentioned would not be disscussed in the project.
Instead of disscussing the challanges of OCR, we will disscuss how to implement simple OCR on NodeJS.

There are two available OCR engines we can use:
    1. Tesseract
    2. Ocrad.js

The difference between the two engines is that Ocrad.js is implement with pure javascript 
so we can directly use it without installing.

There are two modules which based on tesseract I uesd 
    1. [node-tesseract](https://github.com/desmondmorris/node-tesseract)
    2. [nodecr](https://github.com/joscha/nodecr)

Do not forget to intall tesseract engine before use them.
The installing steps are shown below:
```
sudo apt-get update  
sudo apt-get install tesseract-ocr
sudo apt-get install tesseract-ocr-eng
```

In my opinion, the tesseract based modules have to read particular physical image everytime.
It will take a lot of efforts on file read/write.
Therefore, I tried to search another based module, and I finally found the Ocrad.js.

However, the OCR performance of tesseract is much better than Ocrad.js. (without any training)

## 2. How to implement OCR with Ocrad.js

Ocrad.js supports process directly on canvas without physical image, 
so we need install [node-canvas](https://github.com/Automattic/node-canvas) module.

I recommand to install the latest version of node-canvas (>=1.3.10), 
because the previous version have fragment fault (core dump) bug.

After installing node-canvas, we can pass images by Base64 string and rebuild on canvas.
In this way, online OCR api would be easy to implement and use.

## 3. Demo

Run the project on your web server and click submit button which will call the OCR api and get result.