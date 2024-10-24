load(defaultTexts);

function load(defaultTexts) {
    for (var image of images.children) { makeDraggable(image); }

    var entries = Object.entries(localStorage);

    var imgs = localStorage.getItem("carousel");
    localStorage.clear();
    imgs = (imgs == "" || imgs == null) ? [] : imgs.split(",");
    for (var img of imgs) { carousel.append(document.getElementById(img)); }
    localStorage.setItem("carousel", Array.from(carousel.children).map(child => { return child.id; }));

    var rowsEntries = entries.filter(entry => { return entry[0] != "carousel"; });
    rowsEntries = rowsEntries.sort((a, b) => { return parseInt(a[0]) - parseInt(b[0]); });
    if (rowsEntries.length > 0) {
        var rows = [];
        for (var i = 0; i < rowsEntries.length; i++) {
            var key = rowsEntries[i][0];
            var item = rowsEntries[i][1];

            var obj = unstringify(item);
            var name = obj.name;
            var color = colors[parseInt(obj.color)];
            var elems = obj.elems;
            localStorage.setItem(key, item);
            
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
        var name = text;
        var color = totalRows % colors.length;
        var elems = [];
        localStorage.setItem(totalRows, stringify(name, color, elems))
        var row = createRow(totalRows+1, container, colors[color], name);
        rows.push(row);
        totalRows++;
    }
    disableButtons(rows[0], 0, rows);
    disableButtons(rows[totalRows-1], totalRows-1, rows);
}

function createRow(index, container, color, text) {
    var row = createElement("div", "r" + index, "row", container);

    var label = createElement("div", "l" + index, "label", row);
    label.style.backgroundColor = color;
    var span = createElement("span", "", "", label);
    span.innerText = text;
    span.setAttribute("contenteditable", "plaintext-only");
    span.oninput = () => { updateName(label); }

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