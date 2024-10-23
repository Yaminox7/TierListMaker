function setButtons(row, gear, up, down) {
    settingButton(row, gear);
    orderButtons(row, up, down);
}

function settingButton(row) {
    var gear = row.getElementsByClassName("gear")[0];
    gear.onclick = () => {
        var rows = container.childElementCount;
        var list = row.getElementsByClassName("list")[0];
        deleteBtn.disabled = rows <= MIN_ROWS;
        addUpBtn.disabled = rows >= MAX_ROWS;
        addDownBtn.disabled = rows >= MAX_ROWS;
        updateRowButtons(list);

        var label = row.getElementsByClassName("label")[0];
        overlay.style.display = "flex";
        overlay.setAttribute("target", label.id.replace("l", ""));
        
        var color = getBgColor(label);
        var index = colors.indexOf(color);
        if (index >= 0) {
            var selected = document.getElementById("selected");
            if (selected) { selected.id = ""; }
            Array.from(colorselect.children)[index].id = "selected";
        }

        settingslabel.innerText = label.firstElementChild.innerText;
    };
}

overlay.onclick = (e) => {
    if (e.target == overlay) {
        closeOverlay();
    }
};

settingslabel.oninput = () => {
    var label = document.getElementById("l"+overlay.getAttribute("target"));
    label.firstElementChild.innerText = settingslabel.value;
};

function setColorSpan(span) {
    span.onclick = () => {
        var label = document.getElementById("l"+overlay.getAttribute("target"));
        var selected = document.getElementById("selected");
        if (selected) { selected.id = ""; }
        span.id = "selected";
        label.style.backgroundColor = span.getAttribute("bg");
    };
}

deleteBtn.onclick = () => {
    if (document.getElementsByClassName("row").length <= MIN_ROWS) {
        return;
    }
    var row = document.getElementById("r"+overlay.getAttribute("target"));
    moveImages(row);
    row.remove();
    closeOverlay();
    updateButtons();
};

clearBtn.onclick = () => {
    var row = document.getElementById("r"+overlay.getAttribute("target"));
    moveImages(row);
    updateRowButtons(row.getElementsByClassName("list")[0]);
};

addUpBtn.onclick = () => {
    var row = document.getElementById("r"+overlay.getAttribute("target"));
    addRow(row, true);
};

addDownBtn.onclick = () => {
    var row = document.getElementById("r"+overlay.getAttribute("target"));
    addRow(row, false);
};

moveRestBtn.onclick = () => {
    var row = document.getElementById("r"+overlay.getAttribute("target"));
    var list = row.getElementsByClassName("list")[0];
    moveChildren(carousel, list);
    updateRowButtons(list);
}

moveAllBtn.onclick = () => {
    var row = document.getElementById("r"+overlay.getAttribute("target"));
    var list = row.getElementsByClassName("list")[0];
    moveChildren(carousel, list);
    for (var orow of container.children) {
        if (orow.id == row.id) { continue; }
        var olist = orow.getElementsByClassName("list")[0];
        moveChildren(olist, list);
    }
    updateRowButtons(list);
}

function orderButtons(row, up, down) {
    up.onclick = () => {
        var rows = Array.from(container.children);
        var index = rows.indexOf(row);
        if (index == 0) { return; }
        container.insertBefore(row, rows[index - 1]);
        disableButtons(row, index-1, rows);
        disableButtons(rows[index - 1], index, rows);
    }

    down.onclick = () => {
        var rows = Array.from(container.children);
        var index = rows.indexOf(row);
        if (index == rows.length - 1) { return; }
        container.insertBefore(row, rows[index + 2]);
        disableButtons(row, index+1, rows);
        disableButtons(rows[index + 1], index, rows);
    };
}

function disableButtons(row, index, rows) {
    var up = row.getElementsByClassName("up")[0];
    var down = row.getElementsByClassName("down")[0];
    if (rows.length == 1) {
        up.setAttribute("class", "up disabled");
        down.setAttribute("class", "down disabled");
    } else if (index == 0) {
        up.setAttribute("class", "up disabled");
        down.setAttribute("class", "down");
    } else if (index == rows.length-1) {
        up.setAttribute("class", "up");
        down.setAttribute("class", "down disabled");
    } else {
        up.setAttribute("class", "up");
        down.setAttribute("class", "down");        
    }
}

function getBgColor(elem) {
    var bg = window.getComputedStyle(elem)["backgroundColor"];
    var rgbArray = bg.match(/\d+/g);
    return `#${rgbArray.map((x) => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("")}`.toUpperCase();
}

function closeOverlay() {
    overlay.style.display = "none";
    overlay.removeAttribute("target");
}

function moveImages(row) {
    var list = row.getElementsByClassName("list")[0];
    moveChildren(list, carousel);
}

function addRow(row, before) {
    if (container.childElementCount >= MAX_ROWS) {
        return;
    } else if (container.childElementCount + 1 >= MAX_ROWS) {
        addUpBtn.disabled = true;
        addDownBtn.disabled = true;
    }
    var color = Math.floor(Math.random() * colors.length);
    var rows = Array.from(container.children);
    var index = rows.indexOf(row);
    var newRow = createRow(totalRows+1, row.parentElement, colors[color], "");
    container.insertBefore(newRow, rows[index-before+1])
    totalRows++;
    updateButtons();
}

function updateButtons() {
    var i = 0;
    var rows = Array.from(container.children);
    rows.forEach(child => {
        disableButtons(child, i, rows);
        i++;
    });
}

function moveChildren(src, out) {
    Array.from(src.children).forEach(child => { out.append(child); });
}

function updateRowButtons(list) {
    clearBtn.disabled = list.childElementCount == 0;
    moveRestBtn.disabled = carousel.childElementCount == 0;
    moveAllBtn.disabled = list.childElementCount == totalImages;
}

function resetImages() {
    for (var row of container.children) {
        moveImages(row);
    }
}