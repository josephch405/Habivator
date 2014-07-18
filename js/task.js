function Task(nameIn, iconIn, idIn, activeDaysIn, daysDoneIn) {
	
	this.name="new task";
	this.icon=1;
	this.id=-1;
	this.activeDays = [1,1,1,1,1,1,1];	//0 is no and 1 is yes
	this.daysDone = [0,0,0,0,0,0,0]		//0 is n/a, 1 is blank, 2 is failed, 3 is half and 4 is complete
	
	if (activeDaysIn.length==7 && daysDoneIn.length==7) {
		this.activeDays=activeDaysIn;
		this.daysDone=daysDoneIn;
	}
	
	if (nameIn!=null) {
		this.name=nameIn;
	}
	if (idIn!=null) {
		this.id=idIn;
	}
	if (iconIn!=null) {
		this.icon=iconIn;
	}
	
	this.addToTable = function(){
		table=document.getElementById("table");
		rowText = "";
		rowText += "<tr>"
		
		rowText += "<td class='iconGrid' id='" + this.id + "-i'><img class='icon' src='..\\ti\\1.png'></td>";
		//icon 
		rowText += "<td>" + this.name + "</td>";
		//title
		for (var i=0; i<7; i++){
			rowText += "<td class='iconGrid' id='" + this.id + "-" + (i+1) + "'>";
			//opens grid
			
			rowText += this.buttonGen(i, i<dayOfWeek);
			//uses buttonGen to add button for day
			
			rowText += "</td>"
			//closes the grid
		}
		//week grids
		rowText += "<td class='halfIconGrid' id='" + this.id + "-e'></td>"
		//edit button
		rowText += "</tr>"
		table.children[0].innerHTML+=rowText;
	}
	
	this.buttonGen = function (dayIn, clickable) {
		var result = "";
		result += "<img class='icon'";	//opens icon
		console.log(this.daysDone);
		switch(this.daysDone[dayIn]){
			case 0: result += "src='..//ti//b.png'/";
				break;
			case 1: result += "src='..//ti//w.png'/		"
				break;
			case 2: result += "src='..//ti//r.png'      onmouseover='this.src=\"..//ti//lr.png\";'      onmouseout='this.src=\"..//ti//r.png\"'";
				break;
			case 3: result += "src='..//ti//y.png'      onmouseover='this.src=\"..//ti//ly.png\";'      onmouseout='this.src=\"..//ti//y.png\"'"
				break;
			case 4: result += "src='..//ti//g.png'      onmouseover='this.src=\"..//ti//lg.png\";'      onmouseout='this.src=\"..//ti//g.png\"'"
				break;
		}
		
		if (clickable && (this.daysDone[dayIn]== 2 || this.daysDone[dayIn]== 4)) {
			result += "onclick='dDoneHandler(" + this.id + "," + dayIn + ")'"
		}
		
		result += ">"	//closes icon
		return result;
	}
	
	this.dDoneLocal = function(dayIn){
		switch(this.daysDone[dayIn]){
			case 1:
				//this.daysDone[dayIn] = 4;
				//document.getElementById(this.id + "-" + (dayIn+1)).innerHTML = this.buttonGen(dayIn);
			case 2:
				this.daysDone[dayIn] = 4;
				document.getElementById(this.id + "-" + (dayIn+1)).innerHTML = this.buttonGen(dayIn,true);
				break;
			case 4:
				this.daysDone[dayIn] = 2;
				document.getElementById(this.id + "-" + (dayIn+1)).innerHTML = this.buttonGen(dayIn,true);
				break;
		}
	}
	
	this.exportInfo = function(){
		string="";
		string+=this.name+";;";
		string+=this.icon+";;";
		string+=this.id+";;";
		string+=this.activeDays+";;";
		string+=this.daysDone+";;";
                
		return string;
	}
	
}
