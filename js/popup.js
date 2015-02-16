//shared code below
importData(localStorage.save);
checkIfDatePassed();

if (localStorage.scrubNow == "true") {
    for (i in taskArray) {
        taskArray[i].scrubClean();
    }
    localStorage.scrubNow = "false";
    saveToLS();
}
//scrubs if required

var checkout = function(){
    pushTasksToArchive(localStorage.timer);
    dayOfWeek = today.getDay();
    if (dayOfWeek == 0) {
    dayOfWeek = 7;
    }
    localStorage.timer = nextTriggerDate();
    localStorage.scrubNow=true;
    saveToLS();
    chrome.tabs.create({url: "html/options.html"});
}
//establishing checkout function to be attached to button

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
//popbox and face events

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
}
arrowButton.onclick = checkout;
//arrow/checkout events

if(Math.random()<0.5 && localStorage.firstTime != null){
    smileyToggle();
}
//random smiley toggling

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
    document.location='popup.html'};
//row and tile mode toggling

if (localStorage.firstTime == null){
    var i=document.createElement('IMG');
    i.src = "../img/tutorialCover.png";
    i.id="tutorial";
    i.style.cssText = "position:absolute; top:0px; left:0px;z-index:10";
    document.body.appendChild(i);
    document.getElementById("tutorial").onclick = function(){
        var image = document.getElementById("tutorial");
        image.parentNode.removeChild(image);
        localStorage.firstTime = true;
    }
}
//first time tutorial toggling





//builds page and constructs respectively based on tile vs row mode
if (localStorage.rowOrTileMode == "tile"){
    $("body").append('<table id="table"><tbody id="tasks"><tr><td class = "topPlaceholder"></td>'+
            '<td class = "topPlaceholder"></td><td class = "topPlaceholder"></td>' +
            '<td class = "topPlaceholder"></td><td class = "topPlaceholder"></td>' +
            '<td class = "topPlaceholder"></td></tr></tbody></table>')

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
}
else {
    $('body').append('<table id="table"><tbody id="tasks"><tr><th colspan="4"></th><th id="mon">Mon</th>' +
        '<th id="tue">Tue</th><th id="wed">Wed</th><th id="thu">Thu</th><th id="fri">Fri</th>' + 
        '<th id="sat">Sat</th><th id="sun">Sun</th><th colspan="2"></th></tr></tbody>' +
        '<tr id="plusTaskRow"><td colspan="13" class="iconGrid"><img class="icon" id="newTaskButton" src="..\img\tile\plus.png"></td>' +
        '</tr></table>');

    document.getElementById(weekArray[dayOfWeek - 1]).style.backgroundColor = "yellow"; //changes color of current day

    if (taskArray.length == 0) {
        addNewTask();
    }
    else {
        for (var i in taskArray) {
    	taskArray[i].addToTable();
        }
        for (var i in taskArray) {
    	taskArray[i].attachEvents();
        }
    }

    document.getElementById("newTaskButton").onclick = function(){
        addNewTask();
        switchToEdit(maxId-1);
    };
}

updateBadge();