load(defaultTexts);

function load(defaultTexts) {
    for (var image of images.children) {
        makeDraggable(image);
    }

    var entries = Object.entries(localStorage);
    if (entries.length > 0) {
        var rows = [];
        for (var i = 0; i < entries.length-1; i++) {
            var item = localStorage.getItem(i);
            var unpacked = unstringify(item);
            var name = unpacked[0];
            var color = colors[parseInt(unpacked[1])];
            var elems = unpacked[2];
            
            var row = createRow(totalRows+1, container, color, name);
            rows.push(row);
            var list = row.getElementsByClassName("list")[0];
            for (var elem of elems) {
                list.append(document.getElementById(elem));
            }
            totalRows++;
        }
        disableButtons(rows[0], 0, rows);
        disableButtons(rows[totalRows-1], totalRows-1, rows);
        
        var imgs = localStorage.getItem("carousel");
        imgs = imgs == "" ? [] : imgs.split(",");
        for (var img of imgs) {
            carousel.append(document.getElementById(img));
        }
    } else {
        makeRows(defaultTexts);
    }
    Array.from(images.children).forEach(img => { carousel.append(img); })
    makeColorSpans();
    makeDroppedOn(carousel);
}

function makeColorSpans() {
    var colordiv = document.getElementById("color-select")

    for (var color of colors) {
        var span = createElement("span", "", "", colordiv);
        span.style.backgroundColor = color;
        span.setAttribute("bg", color);
        setColorSpan(span);
    }
}

function makeRows(texts) {
    var rows = [];
    for (var text of texts) {
        rows.push(createRow(totalRows+1, container, colors[totalRows % colors.length], text));
        totalRows++;
    }
    disableButtons(rows[0], 0, rows);
    disableButtons(rows[totalRows-1], totalRows-1, rows);
}

function createRow(index, container, color, text) {
    var row = createElement("div", "r" + index, "row", container);

    var label = createElement("div", "l" + index, "label", row);
    label.style.backgroundColor = color;
    label.setAttribute("contenteditable", "plaintext-only");
    var span = createElement("span", "", "", label);
    span.innerText = text;

    var list = createElement("div", "", "list", row);
    makeDroppedOn(list);

    var settings = createElement("div", "", "settings", row);
    var gear = createElement("div", "", "gear", settings);
    var buttons = createElement("div", "", "buttons", settings);
    var up = createElement("div", "", "up", buttons);
    var down = createElement("div", "", "down", buttons);
    setButtons(row, gear, up, down);

    return row;
}

function createElement(tag, id, className, parent) {
    var elem = document.createElement(tag);
    if (id) { elem.id = id; }
    if (className) { elem.className = className; }
    parent.append(elem);
    return elem;
}