var d = new Date();
var dayOfWeek = d.getDay();
var weekArray=["mon", "tue","wed","thu","fri","sat","sun"]
var taskArray=[];

localStorage.tasks;

document.getElementById(weekArray[dayOfWeek-1]).style.backgroundColor="yellow";	//changes color of current day


var importData = function() {
	saveData=localStorage.save;
	if (saveData!=null){
		saveData = saveData.split(";;;")
		if (saveData[0]== "saveVer 1") {
			for (var i=1; i<saveData.length; i++){
				task=saveData[i].split(";;");
				console.log("["+task[4]+"]");
				tActDays=task[3].split(",");
				for (var i in tActDays){
					tActDays[i]=parseInt(tActDays[i]);
				}
				tDoneDays=task[4].split(",");
				for (var i in tDoneDays){
					tDoneDays[i]=parseInt(tDoneDays[i]);
				}
				taskArray.push( new Task(task[0], task[1], task[2], tActDays, tDoneDays))
			}
		}
	}
}

importData();

for (var i in taskArray){
	taskArray[i].addToTable();
}

var dDoneHandler = function(idIn, dayIn){
	idIn-=1;
	taskArray[idIn].dDoneLocal(dayIn);
	saveToLS();
}

var saveToLS = function(){
	var string = "saveVer 1";
	for (var i in taskArray){
		string+=";;;"
		string += taskArray[i].exportInfo();
	}
	localStorage.save=string;
}

