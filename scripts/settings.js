var MIN_ROWS = 1;
var MAX_ROWS = 15;

var container = document.getElementById("container");

var overlay = document.getElementById("overlay");
var colorselect = document.getElementById("color-select");
var settingslabel = document.getElementById("settings-label");

var deleteBtn = document.getElementById("delete-row");
var clearBtn = document.getElementById("clear-row");
var addUpBtn = document.getElementById("add-row-up");
var addDownBtn = document.getElementById("add-row-down");

for (var row of container.children) {
    setButtons(row);
}

function setButtons(row) {
    settingButton(row);
    orderButtons(row);
}

function settingButton(row) {
    var gear = row.getElementsByClassName("gear")[0];
    gear.onclick = () => {
        var rows = container.childElementCount;
        deleteBtn.disabled = rows <= MIN_ROWS;
        addUpBtn.disabled = rows >= MAX_ROWS;
        addDownBtn.disabled = rows >= MAX_ROWS;

        var label = row.getElementsByClassName("label")[0];
        overlay.style.display = "flex";
        overlay.setAttribute("target", label.id);
        
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
    var label = document.getElementById(overlay.getAttribute("target"));
    label.firstElementChild.innerText = settingslabel.value;
};

Array.from(colorselect.children).forEach(span => {
    span.onclick = () => {
        var label = document.getElementById(overlay.getAttribute("target"));
        var selected = document.getElementById("selected");
        if (selected) { selected.id = ""; }
        span.id = "selected";
        label.style.backgroundColor = span.getAttribute("bg");
    };
});

deleteBtn.onclick = () => {
    if (document.getElementsByClassName("row").length <= MIN_ROWS) {
        return;
    }
    var label = document.getElementById(overlay.getAttribute("target"));
    var row = label.parentElement;
    moveImages(row);
    row.remove();
    closeOverlay();
    updateButtons();
};

clearBtn.onclick = () => {
    var label = document.getElementById(overlay.getAttribute("target"));
    var row = label.parentElement;
    moveImages(row);
};

addUpBtn.onclick = () => {
    var label = document.getElementById(overlay.getAttribute("target"));
    var row = label.parentElement;
    addRow(row, true);
};

addDownBtn.onclick = () => {
    var label = document.getElementById(overlay.getAttribute("target"));
    var row = label.parentElement;
    addRow(row, false);
};

function orderButtons(row) {
    var up = row.getElementsByClassName("up")[0];
    var down = row.getElementsByClassName("down")[0];
    var rows = Array.from(container.children);
    disableButtons(row, rows.indexOf(row), rows);

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
    Array.from(list.children).forEach(child => { carousel.append(child); });
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
    makeDroppedOn(newRow.getElementsByClassName("list")[0]);
    setButtons(newRow);
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