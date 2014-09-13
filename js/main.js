var d = new Date();
var lockdown = localStorage.locked || false;
d.setDate(d.getDate());
var dayOfWeek = d.getDay();
if (dayOfWeek == 0) {
    dayOfWeek = 7;
}
var maxId = 1;
var maxArchiveId = 1;
//converts sunday from 0 to 7
var weekArray = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
var taskArray = [];
var archGroupArray = [];
var archive = [];

var importData = function() {

    saveData = localStorage.save;
    if (saveData != null) {
        saveData = saveData.split(";;;")
        if (saveData[0] == "saveVer 1") {
            maxId = parseInt(saveData[1]);
            maxArchiveId = parseInt(saveData[2]);
            for (var i = 3; i < saveData.length; i++) {
                var task = saveData[i].split(";;");
                type = task[0];

                if (type == "task") {
                    tActDays = task[4].split(",");
                    for (var ii in tActDays) {
                        tActDays[ii] = parseInt(tActDays[ii]);
                    }
                    tDoneDays = task[5].split(",");
                    for (var iii in tDoneDays) {
                        tDoneDays[iii] = parseInt(tDoneDays[iii]);
                    }
                    taskArray.push(new Task(task[1], task[2], task[3], tActDays, tDoneDays, parseInt(task[6]), parseInt(task[7])))
                } else if (type == "archGroup") {
                    archGroupArray.push(new archivedTaskGroup(task[1], task[2]));
                }
            }
        }
    }
}
//import tasks and archiveGroups+tasks from localStorage
//initiation process

var addNewTask = function() {
    maxId = parseInt(maxId);
    taskArray.push(new Task(null, null, maxId));
    findTaskById(maxId).scrub();
    findTaskById(maxId).addToTable();
    findTaskById(maxId).attachEvents();
    maxId += 1;
    saveToLS();
}
//adds new default task to taskArray
var dDoneHandler = function(idIn, dayIn) {
    findTaskById(idIn).dDoneLocal(dayIn - 1);
    saveToLS();
    findTaskById(idIn).attachEvents();
}
//handles tile ddone events; finds appropriate task, then passes toggling
//reattaches events
//SAVES
var dActiveHandler = function(idIn, dayIn) {
    findTaskById(idIn).dActiveLocal(dayIn - 1);
    saveToLS();
    findTaskById(idIn).attachEvents();
}
//handles tile dActive events; finds appropriate task, then passes toggling
//reattaches events
//SAVES

var saveToLS = function() {
    var string = "saveVer 1;;;";
    string += maxId + ";;;";
    string += maxArchiveId;
    for (var i in taskArray) {
        string += ";;;"
        string += taskArray[i].exportInfo();
    }
    for (var ii in archGroupArray) {
        string += ";;;"
        string += archGroupArray[ii].exportInfo();
    }
    localStorage.save = string;
    return (string);
}
//saves everything to localstorage

var switchToEdit = function(idIn) {
    row = document.getElementById(idIn);
    findTaskById(idIn).editMode = 1;
    rowText = findTaskById(idIn).createRow(false);
    row.innerHTML = rowText;
    findTaskById(idIn).attachEvents();
}
//switches row to edit mode
//attaches events

var switchToTask = function(idIn) {
    findTaskById(idIn).name = document.getElementById(idIn + "-tf").value;
    if (document.getElementById(idIn + "-quant")) {
        findTaskById(idIn).quantity = document.getElementById(idIn + "-quant").value;
    }
    findTaskById(idIn).scrub();
    findTaskById(idIn).editMode = 0;
    saveToLS();
    row = document.getElementById(idIn);
    rowText = findTaskById(idIn).createRow();
    row.innerHTML = rowText;
    findTaskById(idIn).attachEvents();
}
//switches row to task mode
//only tasks

var nextTriggerDate = function() {
    var timerDate = new Date(d);
    timerDate.setDate(d.getDate() + 8 - dayOfWeek);
    timerDate.setHours(0);
    timerDate.setMinutes(0);
    timerDate.setSeconds(0);
    return timerDate;
}
//returns the next trigger date, the next monday 0 midnight

var checkIfDatePassed = function() {
    if (localStorage.timer == null) {
        localStorage.timer = nextTriggerDate();
    } else {
        if (d - (new Date(localStorage.timer)) > 0) {
            lockdown = true;
            localStorage.lockdown = true;
            pushTasksToArchive();
            saveToLs();
            //should be moved to another review page
            localStorage.timer = nextTriggerDate();
            for (i in taskArray) {
                taskArray[i].scrubClean();
            }
            location.reload();
            //new week!
        } else {
            for (var i in taskArray) {
                taskArray[i].scrub();
            }
            this.lockdown = false;
            localStorage.lockdown = false;
        }
    }
    saveToLS();
};
//manages date events; if date passed, triggers lockdown, otherwise scrubs
    //saves


var findTaskById = function(idIn) {
    for (var i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id == parseInt(idIn)) {
            return taskArray[i];
            break;
        }
    }
    return null;
}
//returns task by id, searches through array of tasks

var deleteTask = function(idIn) {
    var task = findTaskById(idIn);
    taskArray.splice(taskArray.indexOf(task), 1);
    var row = document.getElementById(idIn);
    row.parentElement.removeChild(row);
    saveToLS();
}

//removes a task from array of tasks and removes row from popup table
//depends on findTaskById for finding task

var deleteArchive = function(idIn) {
    var task = findTaskById(idIn);
    taskArray.splice(taskArray.indexOf(task), 1);
    var row = document.getElementById(idIn);
    row.parentElement.removeChild(row);
    saveToLS();
}
//OBSOLETE(?); will be modified to reflect changes in archive grouping

var toggleUnitOutside = function(id) {
    console.log(id);
    findTaskById(id).toggleUnit();
}
//passes toggling of unit to respective task of id
//task, no archiveTask

var pushTasksToArchive = function() {
    archGroup = new archivedTaskGroup();
    for (var i in taskArray) {
        archGroup.addArch(taskArray[i].exportAsArchive());
    }
    archGroupArray.push(archGroup);
}
//pushes all tasks to a date-labelled (coming soon) group of archs

var exportTxt = function() {
    var text = saveToLS();
    var link = document.createElement('a');

    link.setAttribute('download', "habivatorSave");
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
    link.click();
}

