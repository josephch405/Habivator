var BGPAGE = chrome.extension.getBackgroundPage();

//shared code below
importData(localStorage.save);
checkIfDatePassed();

if (localStorage.scrubNow == "true") {
    for (var i in taskArray) {
        taskArray[i].scrubClean();
    }
    localStorage.scrubNow = "false";
    saveToLS();
}
//scrubs if required

var checkout = function(){
    pushTasksToArchive(localStorage.timer);
    dayOfWeek = today.getDay();
    if (dayOfWeek === 0) {
    dayOfWeek = 7;
    }
    localStorage.timer = nextTriggerDate();
    localStorage.scrubNow=true;
    saveToLS();
    chrome.tabs.create({url: "html/options.html"});
}
//establishing checkout function to be attached to button

var popBox = document.getElementById("popBox");
var face = document.getElementById("face");

smileySetup(face, popBox);
document.body.onclick = function(){smileyOff(popBox)};
//popbox and face events

if(Math.random()<0.5 && localStorage.firstTime != null){
    smileyToggle(popBox);
}

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


//random smiley toggling

var weekMode = document.getElementById("weekMode");
weekMode.onmouseover = function() {
    weekMode.src = '../img/week2.png';
}
weekMode.onmouseout = function() {
    weekMode.src = '../img/week.png';
}
weekMode.onclick=function(){
    chrome.storage.sync.weekOrDayMode = "week";
    document.location='popup.html'
};
var dayMode = document.getElementById("dayMode");
dayMode.onmouseover = function() {
    dayMode.src = '../img/day2.png';
}
dayMode.onmouseout = function() {
    dayMode.src = '../img/day.png';
}
dayMode.onclick=function(){
    chrome.storage.sync.weekOrDayMode = "day";
    document.location='popup.html'};
//row and tile mode toggling

var moreMode = document.getElementById("moreMode");
moreMode.onmouseover = function() {
    moreMode.src = '../img/more2.png';
}
moreMode.onmouseout = function() {
    moreMode.src = '../img/more.png';
}
moreMode.onclick=function(){
    chrome.tabs.create({url: "html/options.html"});
};



//builds page and constructs respectively based on tile vs row mode
if (chrome.storage.sync.weekOrDayMode == "day"){
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
            if (taskArray[i].daysDone[dayOfWeek-1] != 0 && taskArray[i].toss === 0){
                taskArray[i].addButton();
            }
        }
        for (var i in taskArray) {
            if (taskArray[i].daysDone[dayOfWeek-1] != 0 && taskArray[i].toss === 0){
                taskArray[i].attachButtons();
            }
        }
    }
}
else {
    $('body').append('<table id="table"><tbody id="tasks"><tr><th colspan="4"></th><th id="mon">Mon</th>' +
        '<th id="tue">Tue</th><th id="wed">Wed</th><th id="thu">Thu</th><th id="fri">Fri</th>' +
        '<th id="sat">Sat</th><th id="sun">Sun</th><th colspan="2"></th></tr></tbody>' +
        '<tr id="plusTaskRow"><td colspan="13" class="iconGrid"><img class="icon" id="newTaskButton" src="../img/tile/plus.png"></td>' +
        '</tr></table>');

    document.getElementById(weekArray[dayOfWeek - 1]).style.backgroundColor = "yellow"; //changes color of current day

    if (taskArray.length == 0) {
        addNewTask();
    }
    else {
        for (var i in taskArray) {
            if (taskArray[i].toss === 0){
               	taskArray[i].addToTable();
            }
        }
        for (var i in taskArray) {
            if (taskArray[i].toss === 0){
                taskArray[i].attachEvents();
            }
        }
    }

    document.getElementById("newTaskButton").onclick = function(){
        addNewTask();
        switchToEdit(maxId-1);
    };
}

updateBadge();