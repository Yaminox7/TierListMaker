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
var totalImages = carousel.childElementCount;
var container = document.getElementById("container");
var images = document.getElementById("images");

var overlay = document.getElementById("overlay");
var colorselect = document.getElementById("color-select");
var settingslabel = document.getElementById("settings-label");

var deleteBtn = document.getElementById("delete-row");
var clearBtn = document.getElementById("clear-row");
var addUpBtn = document.getElementById("add-row-up");
var addDownBtn = document.getElementById("add-row-down");
var moveRestBtn = document.getElementById("move-rest-row");
var moveAllBtn = document.getElementById("move-all-row");