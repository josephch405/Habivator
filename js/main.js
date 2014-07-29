var d = new Date();
var lockdown = localStorage.locked || false;
d.setDate(d.getDate());
var dayOfWeek = d.getDay();
if (dayOfWeek == 0) {
    dayOfWeek = 7;
}
var maxId=1;
//converts sunday from 0 to 7
var weekArray = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
var taskArray = [];

var addNewTask = function() {
	maxId=parseInt(maxId);
    taskArray.push(new Task(null, null, maxId));
    findTaskById(maxId).scrub();
    findTaskById(maxId).addToTable();
    findTaskById(maxId).attachEvents();
    maxId+=1;
    saveToLS();
}
//adds new default task
var dDoneHandler = function(idIn, dayIn) {
    console.log(idIn + " " + dayIn)
    findTaskById(idIn).dDoneLocal(dayIn - 1);
    saveToLS();
    findTaskById(idIn).attachEvents();
}
//handles tile ddone events
var dActiveHandler = function(idIn, dayIn) {
    findTaskById(idIn).dActiveLocal(dayIn - 1);
    saveToLS();
    findTaskById(idIn).attachEvents();
}
//handles tile dActive events
var saveToLS = function() {
    var string = "saveVer 1;;;";
	string += maxId;
    for (var i in taskArray) {
        string += ";;;"
        string += taskArray[i].exportInfo();
    }
    localStorage.save = string;
}
//saves everything to localstorage
var switchToEdit = function(idIn) {
    row = document.getElementById(idIn);
    findTaskById(idIn).editMode = 1;
    rowText = findTaskById(idIn).createEditRow();
    row.innerHTML = rowText;
    findTaskById(idIn).attachEvents();
}
//switches row to edit mode
var switchToTask = function(idIn) {
    findTaskById(idIn).name = document.getElementById(idIn + "-tf").value;
    findTaskById(idIn).scrub();
    findTaskById(idIn).editMode = 0;
    saveToLS();
    row = document.getElementById(idIn);
    rowText = findTaskById(idIn).createTaskRow();
    row.innerHTML = rowText;
    findTaskById(idIn).attachEvents();
}
//switches row to task mode
var nextTriggerDate = function() {
    var timerDate = new Date(d);
    timerDate.setDate(d.getDate() + 8 - dayOfWeek);
    timerDate.setHours(0);
    timerDate.setMinutes(0);
    timerDate.setSeconds(0);
    return timerDate;
}
//returns the next trigger date, or the next monday 0 midnight
var checkIfDatePassed = function() {
    console.log(localStorage.timer);
    if (localStorage.timer == null) {
        localStorage.timer = nextTriggerDate();
    }
    if (d - (new Date(localStorage.timer)) > 0) {
        lockdown = true;
        localStorage.lockdown = true;
        //should be moved to another review page
        //localStorage.timer = nextTriggerDate();
        //for (i in taskArray) {
        //    taskArray[i].scrubClean();
        //}
        //new week!
    } else {
        for (i in taskArray) {
            taskArray[i].scrub();
        }
    }
    saveToLS();
};

var findTaskById = function(idIn){
    for (var i=0; i<taskArray.length;i++){
        if (taskArray[i].id==parseInt(idIn)) {
            return taskArray[i];
            break;
        }
    }
    return null;
}

var deleteTask = function(idIn){
    var task = findTaskById(idIn);
    taskArray.splice(taskArray.indexOf(task),1);
    var row = document.getElementById(idIn);
    row.parentElement.removeChild(row);
    saveToLS();
}