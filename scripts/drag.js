function makeDroppedOn(element) {
    element.ondragover = (e) => {
        e.preventDefault();
        var target = e.target;
        var dragging = document.querySelector("[placeholder]");

        var parent;
        var old = dragging.parentElement;
        if (target.draggable) {
            target.parentNode.insertBefore(dragging, target);
            parent = target.parentElement;
        } else if (target == element) {
            element.appendChild(dragging);
            parent = element;
        }
        updateStorageElems(old);
        updateStorageElems(parent);
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