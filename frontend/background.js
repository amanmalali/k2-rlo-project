var imageList = [
    "../images/DALL·E 2022-10-21 09.43.54 - A fancy kitchen from a children's book.png",
    "../images/DALL·E 2022-10-21 09.43.58 - A fancy kitchen from a children's book.png",
    "../images/DALL·E 2022-10-21 09.44.00 - A fancy kitchen from a children's book.png",
    "../images/DALL·E 2022-10-21 09.46.46 - A fancy expressionist oil painting of a fancy italian kitchen in a childrens book.png",
    "../images/DALL·E 2022-10-21 09.46.49 - A fancy expressionist oil painting of a fancy italian kitchen in a childrens book.png",
    "../images/DALL·E 2022-10-21 09.46.51 - A fancy expressionist oil painting of a fancy italian kitchen in a childrens book.png"
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