function stringify(name, color, elems) {
    return `${name}:${color}+${elems}`;
}

function unstringify(text) {
    var i = text.indexOf(":");
    var j = text.lastIndexOf("+");
    var name = text.slice(0, i);
    var color = text.slice(i + 1, j);
    var elems = text.slice(j + 1);
    elems = elems == "" ? [] : elems.split(",");
    return [name, color, elems];
}
