document.onkeydown = (e) => {
    if (e.key == "Control") {
        document.body.setAttribute("class", "control");
    } else if (e.key == "r") {
        reset = true;
        window.location.reload();
    }
};

document.onkeyup = (e) => {
    if (e.key == "Control") {
        document.body.removeAttribute("class");
    }
}; 

window.onblur = document.onvisibilitychange = () => {
    document.body.removeAttribute("class");
};

document.body.ondblclick = (e) => {
    if (e.target == document.body || e.target.parentElement == document.body) {
        resetImages();
    }
}

window.onbeforeunload = () => {
    localStorage.clear();
    if (reset) { return; }
    var i = 0;
    for (var row of container.children) {
        var label = row.getElementsByClassName("label")[0];
        var list = row.getElementsByClassName("list")[0];
        var name = label.firstElementChild.innerText;
        var color = colors.indexOf(getBgColor(label));
        var elems = [];
        for (var img of list.children) { elems.push(img.id); }
        localStorage.setItem(i, stringify(name, color, elems))
        i++;
    }
    var elems = [];
    for (var img of carousel.children) { elems.push(img.id); }
    localStorage.setItem("carousel", elems)
}