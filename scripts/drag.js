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