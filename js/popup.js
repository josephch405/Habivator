document.getElementById(weekArray[dayOfWeek - 1]).style.backgroundColor = "yellow"; //changes color of current day

//
//

//imports from localStorage

importData();

var justClicked = false;

checkIfDatePassed();
if (localStorage.scrubNow == "true") {
    for (i in taskArray) {
        taskArray[i].scrubClean();
    }
    localStorage.scrubNow = "false";
    saveToLS();
    console.log("scrubbed")
}
if (taskArray.length == 0) {
    addNewTask();
}
//
else {
    for (var i in taskArray) {
	taskArray[i].addToTable();
    }
    for (var i in taskArray) {
	taskArray[i].attachEvents();
    }
}
//shuffle at start of day?

var smileyToggle = function() {
    var popBox = document.getElementById("popBox");
    if (popBox.style.visibility == "visible") {
        popBox.style.visibility = "hidden";
	justClicked=true;
    } else {
        popBox.style.visibility = "visible";
	justClicked=true;
    }
    window.setTimeout(function(){justClicked=false},100);
}
var smileyOff= function() {
    var popBox = document.getElementById("popBox");
    if (!justClicked) {
	if (popBox.style.visibility == "visible") {
	    popBox.style.visibility = "hidden";
	}
    }
}

var smileyKeepOn= function() {
    var popBox = document.getElementById("popBox");
    justClicked=true;
    window.setTimeout(function(){justClicked=false},100);
}
//
var checkout = function(){
    pushTasksToArchive(localStorage.timer);
    //should be moved to another review page
    localStorage.timer = nextTriggerDate();
    localStorage.scrubNow=true;
    saveToLS();
    chrome.tabs.create({url: "html/options.html"});
}
//
//
document.getElementById("newTaskButton").onclick = addNewTask;
//
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