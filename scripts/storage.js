/** 
 * @param {object} obj 
 * @returns {string}
*/
function stringify(obj) {
    return JSON.stringify(obj);
}

/** 
 * @param {string} text 
 * @returns {object}
*/
function unstringify(text) {
    return JSON.parse(text);
}

/** 
 * @param {string} key
 * @param {(string | object)} value
 * @returns {void}
*/
function setItem(key, value) {
    // if (typeof value == "object") {
    //     value = stringify(value);
    // }
    var obj = localStorage.getItem(preset);
    if (obj == null) { 
        obj = {[key]: value};
    } else {
        obj = unstringify(obj);
        obj[key] = value;
    }
    localStorage.setItem(preset, stringify(obj));
};

/*
1: {1: {1}, 2: {2}}
2: {1: {2}, 2: {0}}
3: {1: {0}, 2: {1}}
*/

/** 
 * @param {string} key
 * @returns {(string | null)}
*/
function getItem(key) {
    var obj = localStorage.getItem(preset);
    if (obj == null) { return null; }
    obj = unstringify(obj);
    return obj[key];
};

/** 
 * @param {string} key
 * @returns {void}
*/
function removeItem(key) {
    var obj = localStorage.getItem(preset);
    if (obj == null) { return; }
    obj = unstringify(obj);
    delete obj[key];
    localStorage.setItem(preset, stringify(obj));
};

/** 
 * @returns {void}
*/
function clear() {
    localStorage.removeItem(preset);
}

function getEntries() {
    var obj = localStorage.getItem(preset);
    if (obj == null) { return []; }
    obj = unstringify(obj);
    return Object.entries(obj);
}

function updateStorageElems(parent) {
    if (parent == carousel) {
        setItem("carousel", Array.from(carousel.children).map(child => { return child.id; }));
    } else {
        var children = Array.from(container.getElementsByClassName("list"));
        var key = children.indexOf(parent);
        var obj = getItem(key);
        if (obj == null) {
            var label = document.getElementsByClassName("label")[key];
            var name = label.firstElementChild.innerText;
            var color = colors.indexOf(getBgColor(label));
            var elems = [];
            obj = {name: name, color: color, elems: elems};
        }
        obj.elems = Array.from(parent.getElementsByClassName("image")).map(child => { return child.id; });
        setItem(key, obj);
    }
}

function switchIndexes(key1, key2) {
    var item1 = getItem(key1);
    var item2 = getItem(key2);

    setItem(key1, item2);
    setItem(key2, item1);
}

function updateName(label) {
    var children = Array.from(container.getElementsByClassName("label"));
    var key = children.indexOf(label);
    var obj = getItem(key);
    if (obj == null) {
        var list = document.getElementsByClassName("list")[key];
        var name = label.firstElementChild.innerText;
        var color = colors.indexOf(getBgColor(label));
        var elems = Array.from(list.getElementsByClassName("image")).map(child => { return child.id; });
        obj = {name: name, color: color, elems: elems};
    } else {
        obj.name = label.firstElementChild.innerText;
    }
    setItem(key, obj);   
}

function updateColor(label) {
    var children = Array.from(container.getElementsByClassName("label"));
    var key = children.indexOf(label);
    var obj = getItem(key);
    if (obj == null) {
        var list = document.getElementsByClassName("list")[key];
        var name = label.firstElementChild.innerText;
        var color = colors.indexOf(getBgColor(label));
        var elems = Array.from(list.getElementsByClassName("image")).map(child => { return child.id; });
        obj = {name: name, color: color, elems: elems};
    } else {
        obj.color = colors.indexOf(getBgColor(label));
    }
    setItem(key, obj);   
}

function updateStorageRows(row) {
    var entries = getEntries();

    var rowsEntries = entries.filter(entry => { return entry[0] != "carousel"; });
    rowsEntries = rowsEntries.sort((a, b) => { return parseInt(a[0]) - parseInt(b[0]); });

    var index = Array.from(container.children).indexOf(row);
    if (index+1 == rowsEntries.length) {
        removeItem(rowsEntries[index][0]);
    } else {
        for (var i = 0; i < rowsEntries.length; i++) {
            if (i <= index) {
                continue;
            }
            
            var key = rowsEntries[i-1][0];
            var item = rowsEntries[i][1];
            setItem(key, item);
            if (i+1 == rowsEntries.length) {
                removeItem(rowsEntries[i][0]);
            }
        }
    }
}

function updateStorage(newrow) {
    var entries = getEntries();

    var rowsEntries = entries.filter(entry => { return entry[0] != "carousel"; });
    rowsEntries = rowsEntries.sort((a, b) => { return parseInt(a[0]) - parseInt(b[0]); });

    var index = Array.from(container.children).indexOf(newrow);
    if (index == rowsEntries.length) {
        var label = newrow.getElementsByClassName("label")[0];
        var list = newrow.getElementsByClassName("list")[0];
        var name = label.firstElementChild.innerText;
        var color = colors.indexOf(getBgColor(label));
        var elems = Array.from(list.getElementsByClassName("image")).map(child => { return child.id; });
        var obj = {name: name, color: color, elems: elems};
        setItem(index, obj);
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
                var obj = { name: name, color: color, elems: elems };
                setItem(i, obj);
            }
            
            var key = i+1;
            var item = rowsEntries[i][1];
            setItem(key, item);
            // if (i+1 == rowsEntries.length) {
            //     localStorage.removeItem(rowsEntries[i][0]);
            // }
        }
    }
}