var imageList = [
    "../images/DALL·E 2022-10-21 09.43.54 - A fancy kitchen from a children's book.png",
    "../images/DALL·E 2022-10-21 09.46.46 - A fancy expressionist oil painting of a fancy italian kitchen in a childrens book.png",
    "../images/DALL·E 2022-10-21 09.46.49 - A fancy expressionist oil painting of a fancy italian kitchen in a childrens book.png",
    "../images/DALL·E 2022-10-21 09.46.51 - A fancy expressionist oil painting of a fancy italian kitchen in a childrens book.png",
    "../images/DALL·E 2022-11-10 23.26.24 - A childish smokehouse kitchen with soft undertones and warm lighting in an oil painting.png",
    "../images/DALL·E 2022-11-10 23.26.26 - A childish smokehouse kitchen with soft undertones and warm lighting in an oil painting.png",
    "../images/DALL·E 2022-11-10 23.26.28 - A childish smokehouse kitchen with soft undertones and warm lighting in an oil painting.png",
    "../images/DALL·E 2022-11-10 23.26.30 - A childish smokehouse kitchen with soft undertones and warm lighting in an oil painting.png",
    "../images/DALL·E 2022-11-10 23.27.51 - A childish Italian countryside kitchen with high contrast and smooth landscapes and bright lighting in an oil painting",
    "../images/DALL·E 2022-11-10 23.27.54 - A childish Italian countryside kitchen with high contrast and smooth landscapes and bright lighting in an oil painting",
    "../images/DALL·E 2022-11-10 23.28.00 - A childish Italian countryside kitchen with high contrast and smooth landscapes and bright lighting in an oil painting",
    "../images/DALL·E 2022-11-10 23.30.30 - A simple fish monger's shop who is dressed like a chef on the Atlantic selling fish to a nice woman in a blue coat drawn as an oil painting",
    "../images/DALL·E 2022-11-10 23.30.34 - A simple fish monger's shop who is dressed like a chef on the Atlantic selling fish to a nice woman in a blue coat drawn as an oil painting",
    "../images/DALL·E 2022-11-10 23.30.36 - A simple fish monger's shop who is dressed like a chef on the Atlantic selling fish to a nice woman in a blue coat drawn as an oil painting",
    "../images/DALL·E 2022-11-10 23.30.38 - A simple fish monger's shop who is dressed like a chef on the Atlantic selling fish to a nice woman in a blue coat drawn as an oil painting",
  ];
var imgIndex = 0;

// Can't find a scalable method for cross-fading backgrounds

function swapBackground(){
    $('.backdrop-rotator').css('background-image', 'url("' + imageList[imgIndex] + '")');
    imgIndex = (imgIndex + 1) % (imageList.length);
}

$(function(){
    console.log("Ready")
    swapBackground()
    setInterval(swapBackground, 17000);
});