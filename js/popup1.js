//imports from localStorage

if (localStorage.rowOrTileMode == "row"){
    document.location = 'popup.html'
}

importData(localStorage.save);
checkIfDatePassed();

if (localStorage.scrubNow == "true") {
    for (i in taskArray) {
        taskArray[i].scrubClean();
    }
    localStorage.scrubNow = "false";
    saveToLS();
}

var maxRow = 0;
var maxCellsPerRow = 6;
var cellsInRow = 0;

if (taskArray.length == 0) {
    addNewTask();
}
else {
    for (var i in taskArray) {
        if (taskArray[i].daysDone[dayOfWeek-1] != 0){
            taskArray[i].addButton();
        }
    }
    for (var i in taskArray) {
        if (taskArray[i].daysDone[dayOfWeek-1] != 0){
        taskArray[i].attachButtons();
        }
    }
}
//shuffle at start of day?

var checkout = function(){
    pushTasksToArchive(localStorage.timer);
    //should be moved to another review page
    dayOfWeek = today.getDay();
    if (dayOfWeek == 0) {
	dayOfWeek = 7;
    }
    localStorage.timer = nextTriggerDate();
    localStorage.scrubNow=true;
    saveToLS();
    chrome.tabs.create({url: "html/options.html"});
}

var faceButton = document.getElementById("face");
faceButton.onmouseover = function() {
    faceButton.src = '../img/face/smile.png';
}
faceButton.onmouseout = function() {
    faceButton.src = '../img/face/up.png';
}
faceButton.onclick = smileyToggle;
var popBox = document.getElementById("popBox");
popBox.onclick = smileyKeepOn;
document.body.onclick = smileyOff;
//
var arrowButton = document.getElementById("arrow");
arrowButton.onmouseover = function() {
    arrowButton.src = '../img/checkItL.png';
}
arrowButton.onmouseout = function() {
    arrowButton.src = '../img/checkIt.png';
}
if (lockdown == true) {
    arrowButton.style.visibility = "visible";
} else {
    arrowButton.style.visibility = "hidden";
    console.log("hidden here")
}
arrowButton.onclick = checkout;

if(Math.random()<0.5 && localStorage.firstTime != true){
    smileyToggle();
}


var rowMode = document.getElementById("rowMode");
rowMode.onmouseover = function() {
    rowMode.src = '../img/lrow.png';
}
rowMode.onmouseout = function() {
    rowMode.src = '../img/row.png';
}

rowMode.onclick=function(){
    localStorage.rowOrTileMode = "row";
    document.location='popup.html'
};

var tileMode = document.getElementById("tileMode");
tileMode.onmouseover = function() {
    tileMode.src = '../img/ltile.png';
}
tileMode.onmouseout = function() {
    tileMode.src = '../img/tile.png';
}

tileMode.onclick=function(){
    localStorage.rowOrTileMode = "tile";
    document.location='popup1.html'};