document.getElementById(weekArray[dayOfWeek - 1]).style.backgroundColor = "yellow"; //changes color of current day

//
//
var importData = function() {
    saveData = localStorage.save;
    if (saveData != null) {

        saveData = saveData.split(";;;")
        if (saveData[0] == "saveVer 1") {
			maxId=parseInt(saveData[1]);
            for (var i = 2; i < saveData.length; i++) {
                var task = saveData[i].split(";;");
                tActDays = task[3].split(",");
                for (var ii in tActDays) {
                    tActDays[ii] = parseInt(tActDays[ii]);
                }
                tDoneDays = task[4].split(",");
                for (var iii in tDoneDays) {
                    tDoneDays[iii] = parseInt(tDoneDays[iii]);
                }
                taskArray.push(new Task(task[0], task[1], task[2], tActDays, tDoneDays))
            }
        }
    }
}
//imports from localStorage

importData();
checkIfDatePassed();
if (taskArray.length == 0) {
    addNewTask();
    console.log("bo");
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
    if (document.getElementById("popBox").style.visibility == "visible") {
        document.getElementById("popBox").style.visibility = "hidden";
    } else {
        document.getElementById("popBox").style.visibility = "visible";
    }
}
//
//

document.getElementById("newTaskButton").onclick = addNewTask;
document.getElementById("face").onmouseover = function() {
    document.getElementById("face").src = '../img/face/smile.png';
}
document.getElementById("face").onmouseout = function() {
    document.getElementById("face").src = '../img/face/up.png';
}
document.getElementById("face").onclick = smileyToggle;