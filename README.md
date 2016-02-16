ezocr
=====

OCR practice with pure-javascript OCR module

------
(因為英文太破, 還是寫個中文的說明好了)

## 1. Introduction

為了要處理惱人的captcha, 我們需要OCR的技術
但是OCR有兩個困難的地方
1. 影像前處理: 要怎麼把雜訊都去掉 只留下文字的部分 並且加強
2. 提升辨識準確率: 要如何改進字元辨識模組的準確度(例如訓練)

但是, 以上的問題在本專案中都不會討論XD
取而代之的, 是討論該如何在NodeJS上做簡單的OCR 用現有的模組

就我知道的, 目前有兩個OCR引擎可以用 (如果我說的不精確再麻煩指正)
    1. Tesseract
    2. Ocrad.js

這兩個的最大不同就在於, Tesseract需要先在機器上安裝tesseract的程式, 之後再利用javascript去呼叫他
而Ocrad.js則是完全用javascript實作而成不需要另外安裝,直接使用即可

若是使用tesseract, 有兩個模組我有使用過:
    1. [node-tesseract](https://github.com/desmondmorris/node-tesseract)
    2. [nodecr](https://github.com/joscha/nodecr)

使用上述兩個模組之前, 記得先安裝tesseract,
安裝方式如下:

```
sudo apt-get update  
sudo apt-get install tesseract-ocr
sudo apt-get install tesseract-ocr-eng
```

就我的看法, 如果是用tesseract, 每次辨識時必須要先有一張實際存在的圖片, 
呼叫tesseract去辨識該張圖片, 但是這樣感覺會多出許多額外的IO 

傳入圖片後先圖片處理→處理之後另存圖片→辨識後刪掉

這流程我覺得是有點麻煩的, 而且我因為這流程造成系統會整個掛掉
例外事件為:同時開太多檔案
不過這障礙似乎在較新版的nodejs就有被排除了, 當初我遇到時是使用0.8.x版的nodejs

不過也因為如此, 我試著尋找不用進行這步驟的模組, 
最後讓我找到了Ocrad.js.這模組

不過不得不說, 就完全沒有處理的圖片而言
tesseract的辨識準度比Ocrad.js高就是..

## 2. How to implement OCR with Ocrad.js

Ocrad.js 有支援直接在canvas上做OCR, 換句話說就是, 不需要存成實體圖片\@Q@/
所以, 我們必須安裝[canvas模組](https://github.com/Automattic/node-canvas)

若要安裝的話, 建議安裝最新版的canvas (>=1.3.10) 因為先前的版本有 fragment fault (core dump) bug 
這bug一樣會造成整個程式掛掉...很不方便

裝完之後事前準備就完成拉!
再來就可以透過Base64字串圖片, 並且在nodejs裡面重建在canvas上
這樣就可以寫些簡單的web api提供簡單的OCR服務囉

## 3. Demo

運行這個專案, 在首頁的部分可以看到範例圖片, 按下送出鈕後就會呼叫我們寫好的API取得辨識結果
範例中我已經寫死該張範例圖片的base64字串, 若要使用可自行轉換其他張圖片成Base64字串試試看


## 4. Conclusion

以上就是簡單的範例, 希望可以幫到需要的人, 也順便做個筆記
若有覺得要修改的地方, 請不要客氣儘管提出喔, 畢竟我寫的方式可能不太正確.
(或是英文看不下去要幫我修改也可以XD)


ezocr
=====

OCR practice with pure-javascript OCR module

------

## 1. Introduction

In order to recognize the words on captcha, we need the OCR tech.

To achieve the goal, there are two challenges:
    1. Image preprocessing: How to filter out the noise in image 
    2. Accuracy of OCR result: How to raise the accuracy of your model 

Unfortunately, these challenges I mentioned would not be discussed in the project.
Instead of discussing the challenges of OCR, we will discuss how to implement simple OCR on NodeJS.

There are two available OCR engines we can use:
    1. Tesseract
    2. Ocrad.js

The difference between the two engines is that Ocrad.js is implemented with pure javascript 
so we can directly use it without installing.

There are two modules which based on tesseract I used  
    1. [node-tesseract](https://github.com/desmondmorris/node-tesseract)
    2. [nodecr](https://github.com/joscha/nodecr)

Do not forget to install tesseract engine before use them.
The installing steps are shown below:
```
sudo apt-get update  
sudo apt-get install tesseract-ocr
sudo apt-get install tesseract-ocr-eng
```

In my opinion, the tesseract-based modules have to read particular physical image every time.
It will take a lot of efforts on file read/write.
Therefore, I tried to search another based module, and I finally found the Ocrad.js.

However, the OCR performance of tesseract is much better than Ocrad.js. (without any training)

## 2. How to implement OCR with Ocrad.js

Ocrad.js supports process directly on canvas without a physical image, 
so we need install [node-canvas](https://github.com/Automattic/node-canvas) module.

I recommend to install the latest version of node-canvas (>=1.3.10), 
because the previous version has fragment fault (core dump) bug.

After installing node-canvas, we can pass images by Base64 string and rebuild on canvas.
In this way, online OCR api would be easy to implement and use.

## 3. Demo

Run the project on your web server and click submit button which will call the OCR api and get the result.

## 4. Conclusion

If there are some errors, please feel free to send me advice
THX

