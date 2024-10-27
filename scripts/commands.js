document.onkeydown = (e) => {
    if (e.ctrlKey) {
        if (e.altKey) {
            if (e.key == "ArrowLeft") {
                var newpreset = parseInt(preset) - 1;
                if (newpreset > MIN_PRESETS) {
                    localStorage.setItem("preset", newpreset)
                    window.location.reload();
                }
                return;
            } else if (e.key == "ArrowRight") {
                var newpreset = parseInt(preset) + 1;
                if (newpreset <= MAX_PRESETS) {
                    localStorage.setItem("preset", newpreset)
                    window.location.reload();
                }
                return;
            }
        }
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