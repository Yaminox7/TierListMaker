var carousel = document.getElementById("carousel");
var images = carousel.children;
var lists = document.getElementsByClassName("list");

makeDroppedOn(carousel);
for (var list of lists) {
    makeDroppedOn(list);
}

for (var image of images) {
    makeDraggable(image);
}

function makeDroppedOn(element) {
    element.ondragover = (e) => {
        e.preventDefault();
        var target = e.target;
        var dragging = document.querySelector("[placeholder]");

        if (target.draggable) {
            target.parentNode.insertBefore(dragging, target);
        } else if (target == element) {
            element.appendChild(dragging);
        }
    };
}

function makeDraggable(element) {
    element.draggable = true;
    element.ondragstart = () => {
        element.setAttribute("placeholder", true);
    };

    element.ondragend = () => {
        element.removeAttribute("placeholder");
    };
}