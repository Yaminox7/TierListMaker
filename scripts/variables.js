var MIN_ROWS = 1;
var MAX_ROWS = 15;

var colors = [ 
    "#FF7F7F", "#FFBF7F", "#FFDF7F", "#FFFF7F", "#BFFF7F", "#7FFF7F", "#7FFFFF", "#7FBFFF", 
    "#7F7FFF", "#FF7FFF", "#BF7FBF", "#3B3B3B", "#858585", "#CFCFCF", "#F7F7F7"
];

var defaultTexts = ["A", "B", "C"];

var reset = false;

var totalRows = 0;
var carousel = document.getElementById("carousel");
var images = document.getElementById("images");
var totalImages = images.childElementCount;
var container = document.getElementById("container");

var overlay = document.getElementById("overlay");
var colorselect = document.getElementById("color-select");
var settingslabel = document.getElementById("settings-label");

var deleteBtn = document.getElementById("delete-row");
var clearBtn = document.getElementById("clear-row");
var addUpBtn = document.getElementById("add-row-up");
var addDownBtn = document.getElementById("add-row-down");
var moveRestBtn = document.getElementById("move-rest-row");
var moveAllBtn = document.getElementById("move-all-row");

var MIN_PRESETS = 0;
var MAX_PRESETS = 3;
var preset = localStorage.getItem("preset") || "1";
var presets = {
    "1": {
        "0": {"name": "Pure Perfection", "color": 14, "elems": []}, 
        "1": {"name": "Already Speak", "color": 0, "elems": ["3", "16", "13"]}, 
        "2": {"name": "Learning", "color": 1, "elems": []}, 
        "3": {"name": "Plan to Learn", "color": 2, "elems": ["32", "17"]}, 
        "4": {"name": "Want to Learn", "color": 3, "elems": ["7"]}, 
        "5": {"name": "Might try", "color": 4, "elems": ["34"]}, 
        "6": {"name": "Would be Cool", "color": 5, "elems": ["23", "29", "12"]}, 
        "7": {"name": "Maybe", "color": 6, "elems": ["18", "19", "26"]}, 
        "8": {"name": "Probably not", "color": 7, "elems": ["9", "14"]}, 
        "9": {"name": "Evil Nordic Group", "color": 9, "elems": ["11", "27", "33"]}, 
        "10": {"name": "Evil Slavic Group", "color": 8, "elems": ["10", "28", "8", "31", "30"]}, 
        "11": {"name": "Nope", "color": 10, "elems": ["2", "4", "5", "35", "21", "1"]}, 
        "12": {"name": "Absolutely not", "color": 11, "elems": ["6", "22", "15"]}, 
        "13": {"name": "???", "color": 12, "elems": ["25", "24", "20"]}, 
        "carousel": []
    }, 
    "2": {}
};

localStorage.setItem("1", JSON.stringify(presets["1"]));
// localStorage.setItem("2", JSON.stringify(presets["2"]));
