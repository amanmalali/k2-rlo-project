const draggableList = document.getElementById("game-front");
const check = document.getElementById("check");
const ranked_elem = document.getElementById("ranked-codifier");
const ranked_button = document.getElementById("start-ranked-btn");
var sndSucc = new Audio("../static/audio/mixkit-cooking-bell-ding-1791.wav");
var sndFail = new Audio("../static/audio/mixkit-pot-hit-1810.wav");

const gemList = [
    '../static/images/gems/blue_gem_1.png',
    '../static/images/gems/cyan_gem_4.png',
    '../static/images/gems/green_gem_3.png',
    '../static/images/gems/yellow_gem_7.png',
    '../static/images/gems/orange_gem_7.png',
    '../static/images/gems/pink_gem_7.png',
];

var ranked = false;
if (document.contains(ranked_elem)) {
    ranked = true
};
pointCounter = 0;

const recipe = [
    'Get Eggs and Olive oil',
    'Scramble the eggs in the bowl',
    'Heat a pan on medium heat',
    'Wait until pan is hot',
    'Pour two big spoons of Olive oil into the pan',
    'Pour scrambled eggs and stir until dry and cooked'
];

const order = {
    'Get Eggs and Olive oil':1,
    'Scramble the eggs in the bowl':2,
    'Heat a pan on medium heat':2,
    'Wait until pan is hot':3,
    'Pour two big spoons of Olive oil into the pan':4,
    'Pour scrambled eggs and stir until dry and cooked':5
};
const listItems = [];

let dragStartIndex;

function createList() {
    [...recipe]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((recipeName, index) => {
            const listItem = document.createElement("li");
            listItem.setAttribute('data-index', index);
            listItem.setAttribute('data-order', order['Get Eggs and Olive oil']);
            // Slight front end bug if you use a number with the scholar font
            listItem.innerHTML = `
            <span style="font-family: 'Upheaval';" class='number'>${index + 1}</span>
            <div class='draggable' draggable='true'>
                <p style="font-family: 'Scholar';" class='recipe-name'>${recipeName}</p>
                <i class="fas fa-grip-lines"></i>
            </div>`;
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
    var sorted = true;
    listItems.forEach((listItem, index) => {
        const recipeName = listItem.querySelector('.draggable').innerText.trim();

        if (recipeName !== recipe[index]) {
            listItem.classList.add('wrong');
            sorted = false
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
    // listItems.forEach((listItem, index) => {
    //     const recipeName = listItem.querySelector('.draggable').innerText.trim();
    //     const elOrder = listItem.getAttribute('data-order');

    //     if (elOrder !== order.get(recipeName)) {
    //         listItem.classList.add('wrong');
    //         sorted = false
    //     } else {
    //         listItem.classList.remove('wrong');
    //         listItem.classList.add('right');
    //     }
    // });
    if (sorted) {
        sndSucc.play();
        if (pointCounter < 5) {
            $("#gemPicture").attr('src', "../static/images/gems/blue_gem_1.png");
        } else if (pointCounter < 10) {
            $("#gemPicture").attr('src', "../static/images/gems/cyan_gem_4.png");
        } else if (pointCounter < 15) {
            $("#gemPicture").attr('src', "../static/images/gems/green_gem_3.png");
        } else if (pointCounter < 25) {
            $("#gemPicture").attr('src', "../static/images/gems/yellow_gem_7.png");
        } else if (pointCounter < 30) {
            $("#gemPicture").attr('src', "../static/images/gems/orange_gem_7.png");
        } else {
            $("#gemPicture").attr('src', "../static/images/gems/pink_gem_7.png");
        };
        pointCounter += 1;
        $("#point-counter").text(pointCounter);
    } else {
        sndFail.play();
        pointCounter = 0;
    }
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

function resetCounter() {
    $("#gemPicture").attr('src', "../static/images/gems/blue_gem_1.png");
    pointCounter = 0;
    $("#point-counter").text(pointCounter);
}

createList();

check.addEventListener('click', checkOrder);

if (document.contains(ranked_elem)) {
    ranked_button.addEventListener('click', resetCounter);
};
sndFail.addEventListener('ended', function() {
    this.currentTime = 0;
});
sndSucc.addEventListener('ended', function() {
    this.currentTime = 0;
});