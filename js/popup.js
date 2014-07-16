
var d = new Date();
var dayOfWeek = d.getDay();
var weekArray=["mon", "tue","wed","thu","fri","sat","sun"]

localStorage.tasks;

document.getElementById(weekArray[dayOfWeek]).style.backgroundColor="yellow";	//changes color of current day


function Task(nameIn, iconIn, activeDaysIn, daysDoneIn) {
	
	this.name="new task";
	this.icon=1;
	this.activeDays = [1,1,1,1,1,1,1];	//0 is no and 1 is yes
	this.daysDone = [0,0,0,0,0,0,0]		//0 is n/a, 1 is blank, 2 is failed, 3 is half and 4 is complete
	
	if (activeDaysIn!=null && daysDoneIn!=null) {
		activeDays=activeDaysIn;
		daysDone=daysDoneIn;
	}
}