if (localStorage.rowOrTileMode == "tile"){
    document.location = 'popup1.html'
}

document.getElementById(weekArray[dayOfWeek - 1]).style.backgroundColor = "yellow"; //changes color of current day

//imports from localStorage
importData(localStorage.save);
checkIfDatePassed();

if (localStorage.scrubNow == "true") {
    for (i in taskArray) {
        taskArray[i].scrubClean();
    }
    localStorage.scrubNow = "false";
    saveToLS();
}

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


document.getElementById("newTaskButton").onclick = function(){
    addNewTask();
    switchToEdit(maxId-1);
};

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

if(Math.random()<0.5 && localStorage.firstTime != null){
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

if (localStorage.firstTime == null){
    console.log("toot o");
    var i=document.createElement('IMG');
    i.src = "../img/tutorialCover.png";
    i.id="tutorial";
    i.style.cssText = "position:absolute; top:0px; left:0px;z-index:10";    
    console.log(i);
    document.body.appendChild(i);
    document.getElementById("tutorial").onclick = function(){
        var image = document.getElementById("tutorial");
        image.parentNode.removeChild(image);
        localStorage.firstTime = true;
    }
}