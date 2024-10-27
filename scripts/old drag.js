var carousel = document.getElementById("carousel");
var images = carousel.children;
var lists = document.getElementsByClassName("list");

var placeholder = document.createElement("div");
placeholder.className = "image";
placeholder.id = "placeholder";

var img = new Image(80, 80);

makeDroppedOn(carousel);
for (var list of lists) {
    makeDroppedOn(list);
}
for (var image of images) {
    makeDraggable(image);
}

function _makeDroppedOn(element) {
    element.ondrop = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        var dragging = document.getElementById(data);
        
        var target = e.target;
        if (target.draggable) {
            target.parentNode.insertBefore(dragging, target);
        } else {
            element.appendChild(dragging);
        }
    };
    
    element.ondragover = (e) => {
        e.preventDefault();
    };
}

function makeDroppedOn(element) {
    element.ondrop = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        var dragging = document.getElementById(data);

        if (placeholder.parentNode) {
            placeholder.replaceWith(dragging);
        }
        placeholder.remove();
    };

    element.ondragover = (e) => {
        e.preventDefault();
        var target = e.target;

        if (target == placeholder) {
            return;
        } else if (target.draggable) {
            target.parentNode.insertBefore(placeholder, target);
        } else if (target == element) {
            if (!placeholder.parentNode) {
                element.appendChild(placeholder);
            }
        }
    };

    element.ondragleave = (e) => {
        if (!element.contains(e.relatedTarget)) {
            placeholder.remove();
        }
    };
}

function makeDraggable(element) {
    element.draggable = true;
    element.ondragstart = (e) => {
        var url = window.getComputedStyle(element)["backgroundImage"];
        placeholder.className = "";
        placeholder.style.backgroundImage = url;
        placeholder.className = "image";

        img.src = url.slice(5, url.length-2);
        
        e.dataTransfer.setDragImage(element, 0, 0);
        e.dataTransfer.setData("text", e.target.id);
    };

    element.ondragend = () => {
        // element.style.display = "inline-block";
    };
}