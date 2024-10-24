function stringify(name, color, elems) {
    var obj = {name: name, color: color, elems: elems};
    return JSON.stringify(obj);
}

function unstringify(text) {
    var obj = JSON.parse(text);
    return obj;
}

function updateStorageElems(parent) {
    if (parent == carousel) {
        var elems = Array.from(carousel.children).map(child => { return child.id; });
        localStorage.setItem("carousel", elems);
    } else {
        var children = Array.from(container.getElementsByClassName("list"));
        var key = children.indexOf(parent);
        var obj = JSON.parse(localStorage.getItem(key));
        if (obj == null) {
            var label = document.getElementsByClassName("label")[key];
            var name = label.firstElementChild.innerText;
            var color = colors.indexOf(getBgColor(label));
            var elems = [];
            obj = {name: name, color: color, elems: elems};
        }
        obj.elems = Array.from(parent.getElementsByClassName("image")).map(child => { return child.id; });
        localStorage.setItem(key, JSON.stringify(obj));
    }
}

function switchIndexes(key1, key2) {
    var item1 = localStorage.getItem(key1);
    var item2 = localStorage.getItem(key2);

    localStorage.setItem(key1, item2);
    localStorage.setItem(key2, item1);
}

function updateName(label) {
    var children = Array.from(container.getElementsByClassName("label"));
    var key = children.indexOf(label);
    var obj = JSON.parse(localStorage.getItem(key));
    if (obj == null) {
        var list = document.getElementsByClassName("list")[key];
        var name = label.firstElementChild.innerText;
        var color = colors.indexOf(getBgColor(label));
        var elems = Array.from(list.getElementsByClassName("image")).map(child => { return child.id; });
        obj = {name: name, color: color, elems: elems};
    } else {
        obj.name = label.firstElementChild.innerText;
    }
    localStorage.setItem(key, JSON.stringify(obj));   
}

function updateColor(label) {
    var children = Array.from(container.getElementsByClassName("label"));
    var key = children.indexOf(label);
    var obj = JSON.parse(localStorage.getItem(key));
    if (obj == null) {
        var list = document.getElementsByClassName("list")[key];
        var name = label.firstElementChild.innerText;
        var color = colors.indexOf(getBgColor(label));
        var elems = Array.from(list.getElementsByClassName("image")).map(child => { return child.id; });
        obj = {name: name, color: color, elems: elems};
    } else {
        obj.color = colors.indexOf(getBgColor(label));
    }
    localStorage.setItem(key, JSON.stringify(obj));   
}

function updateStorageRows(row) {
    var entries = Object.entries(localStorage);

    var rowsEntries = entries.filter(entry => { return entry[0] != "carousel"; });
    rowsEntries = rowsEntries.sort((a, b) => { return parseInt(a[0]) - parseInt(b[0]); });

    var index = Array.from(container.children).indexOf(row);
    if (index+1 == rowsEntries.length) {
        localStorage.removeItem(rowsEntries[index][0]);
    } else {
        for (var i = 0; i < rowsEntries.length; i++) {
            if (i <= index) {
                continue;
            }
            
            var key = rowsEntries[i-1][0];
            var item = rowsEntries[i][1];
            localStorage.setItem(key, item);
            if (i+1 == rowsEntries.length) {
                localStorage.removeItem(rowsEntries[i][0]);
            }
        }
    }
}

function updateStorage(newrow) {
    var entries = Object.entries(localStorage);

    var rowsEntries = entries.filter(entry => { return entry[0] != "carousel"; });
    rowsEntries = rowsEntries.sort((a, b) => { return parseInt(a[0]) - parseInt(b[0]); });

    var index = Array.from(container.children).indexOf(newrow);
    if (index == rowsEntries.length) {
        var label = newrow.getElementsByClassName("label")[0];
        var list = newrow.getElementsByClassName("list")[0];
        var name = label.firstElementChild.innerText;
        var color = colors.indexOf(getBgColor(label));
        var elems = Array.from(list.getElementsByClassName("image")).map(child => { return child.id; });
        localStorage.setItem(index, stringify(name, color, elems));
    } else {
        for (var i = 0; i < rowsEntries.length; i++) {
            if (i < index-1) {
                continue;
            } else if (i == index) {
                var label = newrow.getElementsByClassName("label")[0];
                var list = newrow.getElementsByClassName("list")[0];
                var name = label.firstElementChild.innerText;
                var color = colors.indexOf(getBgColor(label));
                var elems = Array.from(list.getElementsByClassName("image")).map(child => { return child.id; });
                localStorage.setItem(i, stringify(name, color, elems));
            }
            
            var key = i+1;
            var item = rowsEntries[i][1];
            localStorage.setItem(key, item);
            // if (i+1 == rowsEntries.length) {
            //     localStorage.removeItem(rowsEntries[i][0]);
            // }
        }
    }
}