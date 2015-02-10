var weekArray = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
var today = new Date();
var dayOfWeek = today.getDay();
if (dayOfWeek == 0) {
    dayOfWeek = 7;
}                                                                       //initializing date vars

var lockdown = localStorage.locked || false;                            //if the app is on weekend lockdown mode
var maxId = 1;                                                          //maxId of all active ids, used for creation
var maxArchiveId = 1;                                                   //maxId of all archives, NOT archiveGroups
var taskArray = [];
var archGroupArray = [];
var smileyBob = new Smiley();                                           //new smiley instance for popup managing
var justClickedFace = false;                                            //justclicked variable used for smiley onclick events
var nameBoxWidth = 200;
if (localStorage.rowOrTileMode==null){
    localStorage.rowOrTileMode = "row";
}

//INDEX
    //TASK
    //SAVE
    //DATE
    //QUERY
    //ARCHIVE
    //TEXTFILE
    //SMILEY
    //MATH

/*
    TASK RELATED METHODS
*/

var addNewTask = function() {
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

var dDoneButtonHandler = function(idIn) {
    findTaskById(idIn).dDoneButtonLocal(dayOfWeek-1);
    saveToLS();
    findTaskById(idIn).attachButtons();
}

var switchToEdit = function(idIn) {
    row = document.getElementById(idIn);
    findTaskById(idIn).editMode = 1;
    rowText = findTaskById(idIn).createRow(false);
    row.innerHTML = rowText;
    findTaskById(idIn).attachEvents();
    row.style.border = "5px";
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

var deleteTask = function(idIn) {
    var task = findTaskById(idIn);
    taskArray.splice(taskArray.indexOf(task), 1);
    var row = document.getElementById(idIn);
    row.parentElement.removeChild(row);
    saveToLS();
}
//removes a task from array of tasks and removes row from popup table
//depends on findTaskById for finding task

var toggleUnitOutside = function(id) {
    console.log(id);
    findTaskById(id).toggleUnit();
}
//passes toggling of unit to respective task of id
//task, no archiveTask

var clearAllKarma = function(){
    for (var i in taskArray){
        taskArray[i].karma = 0;
    }
    return "karma cleared";
}








/*
    SAVE RELATED METHODS
*/

var importData = function(input) {                                           //directly imports from local storage
    saveData = input;

    if (saveData != null) {
        saveData = saveData.split(";;;");                                   //level one split, into data types: ids, tasks/archive groups
        
        if (saveData[0] == "saveVer 1") {
            maxId = parseInt(saveData[1]);
            maxArchiveId = parseInt(saveData[2]);                           //at this point, all basic global vars inputted

            for (var i = 3; i < saveData.length; i++) {
                var taskString = saveData[i].split(";;");                   //level two split, managing tasks and archivegroups
                type = taskString[0];

                if (type == "task") {
                    tActDays = taskString[4].split(",");        
                    for (var ii in tActDays) {
                        tActDays[ii] = parseInt(tActDays[ii]);
                    }                                                       //importing active days

                    tDoneDays = taskString[5].split(",");
                    for (var iii in tDoneDays) {
                        tDoneDays[iii] = parseInt(tDoneDays[iii]);
                    }                                                       //importing done days

                    var tempKarma = 0;
                    if (taskString[8] != null){
                        tempKarma = parseInt(taskString[8]);
                    }                                                       //importing karma

                    taskArray.push(new Task(taskString[1], taskString[2], taskString[3], tActDays, tDoneDays, parseInt(taskString[6]), parseInt(taskString[7]), tempKarma));
                                                                            //parsing for task

                } else if (type == "archGroup") {
                    archGroupArray.push(new archivedTaskGroup(taskString[1], taskString[2]));
                                                                            //parsing for archGroup instead
                }
            }
        }

    }
}

var saveToLS = function() {
    var string = "saveVer 1;;;";
    string += maxId + ";;;" + maxArchiveId;
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









/*
    DATE FUNCTIONS
*/

var nextTriggerDate = function() {
    var timerDate = new Date(today);
    timerDate.setDate(today.getDate() + 8 - dayOfWeek);
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
        if (today - (new Date(localStorage.timer)) > 0) {
            lockdown = true;
            localStorage.lockdown = true;
            dayOfWeek = 7;
            for (var i in taskArray) {
                taskArray[i].scrub();
            }
            saveToLS();
            //location.reload();
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


var simplifyDate = function(date){
    console.log(date);
    var temp = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
    return temp;
}

var simplifyDateEuro = function(date){
    var temp = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    return temp;
}






/*
    QUERY FUNCTIONS
*/

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

var findArchById = function(idIn) {
    for (var i = 0; i < archGroupArray.length; i++) {
        if (archGroupArray[i].id == idIn) {
            return archGroupArray[i];
            break;
        }
    }
}






/*
    ARCHIVE FUNCTIONS
*/

var deleteArchive = function(idIn) {
    var task = findArchById(idIn);
    console.log("task"+task);
    archGroupArray.splice(archGroupArray.indexOf(task), 1);
    var row = document.getElementById(idIn);
    console.log(idIn);
    console.log(row);
    row.parentElement.removeChild(row);
    saveToLS();
}
//OBSOLETE(?); will be modified to reflect changes in archive grouping



var pushTasksToArchive = function(dateString) {
    var tempDate = new Date(Date.parse(dateString));
    tempDate.setDate(tempDate.getDate()-1);
    var archGroup = new archivedTaskGroup(tempDate.toDateString());
    for (var i in taskArray) {
        archGroup.addArch(taskArray[i].exportAsArchive());
    }
    archGroupArray.push(archGroup);
    saveToLS();
}

//pushes all tasks to a date-labelled (coming soon) group of archs







/*
    TEXTFILE FUNCTIONS
*/
var importTxt = function() {
    if (!window.FileReader) {
        alert('Your browser is not supported')
    }
    var input = fileInput.get(0);

    // Create a reader object
    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        reader.readAsText(textFile);
        var text;
        reader.onload = function(e) {
            text = reader.result;
            localStorage.save = text;
            location.reload();
        };
    } else {
        alert('Please upload a file before continuing')
    }
}

var exportTxt = function() {
    var text = saveToLS();
    var link = document.createElement('a');

    link.setAttribute('download', "habivatorSave");
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
    link.click();
}






/*
    SMILEY FUNCTIONS
*/
var smileyToggle = function() {
    var popBox = document.getElementById("popBox");
    console.log("smileyToggles")
    if (popBox.style.visibility == "visible") {
        popBox.style.visibility = "hidden";
        justClickedFace=true;
    } else {
        popBox.style.visibility = "visible";
        popBox.children[1].innerHTML = smileyBob.chooseText();
        justClickedFace=true;
    }
    window.setTimeout(function(){justClickedFace=false},100);
    
}

var smileyOff= function() {
    var popBox = document.getElementById("popBox");
    if (!justClickedFace) {
    	if (popBox.style.visibility == "visible") {
    	    popBox.style.visibility = "hidden";
    	}
    }
    console.log("smileyOffed")
}

var smileyKeepOn= function() {
    var popBox = document.getElementById("popBox");
    justClickedFace=true;
    window.setTimeout(function(){justClickedFace=false},100);
}






/*
    MATH FUNCTIONS
*/
var floatToPercentagePoint = function(input){
    return Math.floor(input*1000)/10
}

var floatToPercentage = function(input){
    return Math.floor(input*100)
}

var floatToKarma = function(input){
    if (input <= .3){
            return -1;
        }
        else if (input <= .8){
            return 0;
        }
    return 1;
}





/*
GLOBAL INIT
*/