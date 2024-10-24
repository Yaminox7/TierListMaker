document.onkeydown = (e) => {
    if (e.key == "Control") {
        document.body.setAttribute("class", "control");
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