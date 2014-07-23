var d = new Date();
var dayOfWeek = d.getDay();
var weekArray = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
var taskArray = [];
localStorage.tasks;
document.getElementById(weekArray[dayOfWeek - 1]).style.backgroundColor = "yellow"; //changes color of current day
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
importData();



for (var i in taskArray)
{
        taskArray[i].addToTable();
}
var addNewTask = function ()
        {
                taskArray.push(new Task(null, null, taskArray.length + 1));
		taskArray[taskArray.length - 1].scrub();
                taskArray[taskArray.length - 1].addToTable();
                saveToLS();
        }
var dDoneHandler = function (idIn, dayIn)
        {
                idIn -= 1;
                taskArray[idIn].dDoneLocal(dayIn);
                saveToLS();
        }
var dActiveHandler = function (idIn, dayIn)
        {
                idIn -= 1;
                taskArray[idIn].dActiveLocal(dayIn);
                saveToLS();
        }
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
var switchToTask = function (idIn)
        {
		taskArray[idIn-1].name=document.getElementById(idIn+"-tf").value;
		taskArray[idIn-1].scrub();
		saveToLS();
                row = document.getElementById(idIn);
                rowText = taskArray[idIn - 1].createTaskRow();
                row.innerHTML = rowText;
        }
	
//
if (taskArray.length==0) {
	addNewTask();
	console.log("bo");
}