var d = new Date();
var lockdown = localStorage.locked || false;
d.setDate(d.getDate());
var dayOfWeek = d.getDay();
if (dayOfWeek == 0)
{
        dayOfWeek = 7;
}
//converts sunday from 0 to 7
var weekArray = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
var taskArray = [];
document.getElementById(weekArray[dayOfWeek - 1]).style.backgroundColor = "yellow"; //changes color of current day
//
//
var importData = function ()
        {
                saveData = localStorage.save;
                if (saveData != null)
                {
                        saveData = saveData.split(";;;")
                        if (saveData[0] == "saveVer 1")
                        {
                                for (var i = 1; i < saveData.length; i++)
                                {
                                        var task = saveData[i].split(";;");
                                        tActDays = task[3].split(",");
                                        for (var ii in tActDays)
                                        {
                                                tActDays[ii] = parseInt(tActDays[ii]);
                                        }
                                        tDoneDays = task[4].split(",");
                                        for (var iii in tDoneDays)
                                        {
                                                tDoneDays[iii] = parseInt(tDoneDays[iii]);
                                        }
                                        taskArray.push(new Task(task[0], task[1], task[2], tActDays, tDoneDays))
                                }
                        }
                }
        }
        //imports from localStorage
var addNewTask = function ()
        {
                taskArray.push(new Task(null, null, taskArray.length + 1));
                taskArray[taskArray.length - 1].scrub();
                taskArray[taskArray.length - 1].addToTable();
                saveToLS();
        }
        //adds new default task
var dDoneHandler = function (idIn, dayIn)
        {
                idIn -= 1;
                taskArray[idIn].dDoneLocal(dayIn);
                saveToLS();
        }
        //handles tile ddone events
var dActiveHandler = function (idIn, dayIn)
        {
                idIn -= 1;
                taskArray[idIn].dActiveLocal(dayIn);
                saveToLS();
        }
        //handles tile dActive events
var saveToLS = function ()
        {
                var string = "saveVer 1";
                for (var i in taskArray)
                {
                        string += ";;;"
                        string += taskArray[i].exportInfo();
                }
                localStorage.save = string;
        }
        //saves everything to localstorage
var switchToEdit = function (idIn)
        {
                row = document.getElementById(idIn);
                rowText = taskArray[idIn - 1].createEditRow();
                row.innerHTML = rowText;
        }
        //switches row to edit mode
var switchToTask = function (idIn)
        {
                taskArray[idIn - 1].name = document.getElementById(idIn + "-tf").value;
                taskArray[idIn - 1].scrub();
                saveToLS();
                row = document.getElementById(idIn);
                rowText = taskArray[idIn - 1].createTaskRow();
                row.innerHTML = rowText;
        }
        //switches row to task mode
var nextTriggerDate = function ()
        {
                var timerDate = new Date(d);
                timerDate.setDate(d.getDate() + 8 - dayOfWeek);
                timerDate.setHours(0);
                timerDate.setMinutes(0);
                timerDate.setSeconds(0);
                return timerDate;
        }
        //returns the next trigger date, or the next monday 0 midnight
var checkIfDatePassed = function ()
        {
		console.log(localStorage.timer);
                if (localStorage.timer == null)
                {
                        localStorage.timer = nextTriggerDate();
                }
                if (d - (new Date(localStorage.timer)) > 0)
                {
			lockdown=true;
			localStorage.lockdown=true;
			//should be moved to another review page
                        localStorage.timer = nextTriggerDate();
			for (i in taskArray)
                        {
				taskArray[i].scrubClean();
                        }
                        //new week!
                }
		else {
			for (i in taskArray)
                        {
                                taskArray[i].scrub();
                        }
		}
		saveToLS();
        };
        //

importData();
checkIfDatePassed();
if (taskArray.length == 0)
{
        addNewTask();
        console.log("bo");
}
//
for (var i in taskArray)
{
        taskArray[i].addToTable();
}
//shuffle at start of day?

var smileyToggle = function(){
	if (document.getElementById("popBox").style.visibility=="visible") {
		document.getElementById("popBox").style.visibility="hidden";
	}
	else{
		document.getElementById("popBox").style.visibility="visible";
	}
}