var colors = [ 
    "#FF7F7F", "#FFBF7F", "#FFDF7F", "#FFFF7F", "#BFFF7F", "#7FFF7F", "#7FFFFF", "#7FBFFF", 
    "#7F7FFF", "#FF7FFF", "#BF7FBF", "#3B3B3B", "#858585", "#CFCFCF", "#F7F7F7"
];

var totalRows = 0;

load();

function load() {
    var texts = ["A", "B", "C"];

    makeColorSpans();
    makeRows(texts);
}

function makeColorSpans() {
    var colordiv = document.getElementById("color-select")

    for (var color of colors) {
        var span = createElement("span", "", "", colordiv);
        span.style.backgroundColor = color;
        span.setAttribute("bg", color);
    }
}

function makeRows(texts) {
    var container = document.getElementById("container");
    for (var text of texts) {
        createRow(totalRows+1, container, colors[totalRows % colors.length], text);
        totalRows++;
    }
}

function createRow(index, container, color, text) {
    var row = createElement("div", "r" + index, "row", container);

    var label = createElement("div", "l" + index, "label", row);
    label.style.backgroundColor = color;
    label.setAttribute("contenteditable", "plaintext-only");
    var span = createElement("span", "", "", label);
    span.innerText = text;

    var list = createElement("div", "", "list", row);

    var settings = createElement("div", "", "settings", row);
    var gear = createElement("div", "", "gear", settings);
    var buttons = createElement("div", "", "buttons", settings);
    var up = createElement("div", "", "up", buttons);
    var down = createElement("div", "", "down", buttons);

    return row;
}

function createElement(tag, id, className, parent) {
    var elem = document.createElement(tag);
    elem.id = id;
    elem.className = className;
    parent.append(elem);
    return elem;
}