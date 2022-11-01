const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const recipe = [
    'Apple',
    'Banana',
    'Orange',
    'Kiwi',
    'Watermelon',
    'Muskmelon'
];

const listItems = [];

let dragStartIndex;

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
    $('#backdrop-rotator').css('background-image', 'url("' + imageList[imgIndex] + '")');
    imgIndex = (imgIndex + 1) % (imageList.length);
}

function createList() {
    [...recipe]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((recipeName, index) => {
            const listItem = document.createElement("li");
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
            <span class='number'>${index + 1}</span>
            <div class='draggable' draggable='true'>
                <p class='recipe-name'>${recipeName}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
            listItems.push(listItem);

            draggableList.appendChild(listItem);
        });
    addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const recipeName = listItem.querySelector('.draggable').innerText.trim();

        if (recipeName !== recipe[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

$(document).ready(function(){
    swapBackground()
    setInterval(swapBackground, 17000);
});

createList();

check.addEventListener('click', checkOrder);