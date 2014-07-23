function Task(nameIn, iconIn, idIn, activeDaysIn, daysDoneIn)
{
        this.name = "new task";
        this.icon = 1;
        this.id = -1;
        this.activeDays = [1, 1, 1, 1, 1, 1, 1]; //0 is no and 1 is yes
        this.daysDone = [0, 0, 0, 0, 0, 0, 0] //0 is n/a, 1 is blank, 2 is failed, 3 is half and 4 is complete
        if (activeDaysIn != null && daysDoneIn != null)
        {
                if (activeDaysIn.length == 7 && daysDoneIn.length == 7)
                {
                        this.activeDays = activeDaysIn;
                        this.daysDone = daysDoneIn;
                }
        }
        this.name = nameIn || "New Task";
        this.id = idIn || -1;
        this.icon = iconIn || 1;
        //basic init. management
	//
        this.createTaskRow = function ()
        {
                rowText = "";
                rowText += "<td class='iconGrid' id='" + this.id + "-i'><img class='icon' src='..\\img\\tile\\1.png'></td>";
                //icon
                rowText += "<td>" + this.name + "</td>";
                //title
                for (var i = 0; i < 7; i++)
                {
                        rowText += "<td class='iconGrid' id='" + this.id + "-" + (i + 1) + "'>";
                        //opens grid
                        rowText += this.buttonGen(i, i < dayOfWeek);
                        //uses buttonGen to add button for day
                        rowText += "</td>"
                        //closes the grid
                }
                //week grids
                rowText += "<td class='halfIconGrid' id='" + this.id + "-e'>";
                rowText += "<img class='halfIcon' src='..//img//tile//editButton.png'";
                rowText += "onmouseover='this.src=\"..//img//tile//leditButton.png\";' "
                rowText += "onmouseout='this.src=\"..//img//tile//editButton.png\"'";
                rowText += "onclick=switchToEdit(" + this.id + ")";
                rowText += ">";
                rowText += "</td>"
                //edit button
                return rowText;
        }
        //creates normal task row and returns string
	//
        this.createEditRow = function ()
        {
                rowText = "";
                rowText += "<td class='iconGrid' id='" + this.id + "-i'><img class='icon' src='..\\img\\tile\\1.png'></td>";
                //icon 
                rowText += "<td>";
                rowText += "<input id='" + this.id + "-tf" + "' class='editingTextBox' type = 'text' value='" + this.name + "'"
		rowText += "onkeydown='if (event.keyCode == 13) { switchToTask(" + this.id + ") }'>";
                rowText += "</td>";
                //title
                for (var i = 0; i < 7; i++)
                {
                        rowText += "<td class='iconGrid' id='" + this.id + "-" + (i + 1) + "'>";
                        //opens grid
                        rowText += this.buttonGen(i, true, true);
                        //uses buttonGen to add button for day
                        rowText += "</td>"
                        //closes the grid
                }
                //week grids
                rowText += "<td class='halfIconGrid' id='" + this.id + "-e'>";
                rowText += "<img class='halfIcon' src='..//img//tile//editButton.png'";
                rowText += "onmouseover='this.src=\"..//img//tile//leditButton.png\";' "
                rowText += "onmouseout='this.src=\"..//img//tile//editButton.png\"'";
                rowText += "onclick=switchToTask(" + this.id + ")";
                rowText += ">";
                rowText += "</td>"
                //edit button
                return rowText;
        }
        //creates row for edit mode and returns string
	//
        this.addToTable = function ()
        {
                table = document.getElementById("tasks");
                rowText = this.createTaskRow();
                table.innerHTML += "<tr id=" + this.id + ">" + rowText + "</tr>";
        }
        //output row text and paste to end of table at initiation
	//
        this.buttonGen = function (dayIn, clickable, inDaysActive)
        {
                var result = "";
                var daysActive = inDaysActive || false;
                result += "<img class='icon'"; //opens icon
                var referenceArray;
                if (daysActive)
                {
                        referenceArray = this.activeDays;
                }
                else
                {
                        referenceArray = this.daysDone;
                }
                if (inDaysActive)
                {
                        switch (referenceArray[dayIn])
                        {
                        case 0:
                                result += "src='..//img//tile//r.png'      onmouseover='this.src=\"..//img//tile//lr.png\";'      onmouseout='this.src=\"..//img//tile//r.png\"'";
                                break;
                        case 1:
                                result += "src='..//img//tile//g.png'      onmouseover='this.src=\"..//img//tile//lg.png\";'      onmouseout='this.src=\"..//img//tile//g.png\"'"
                                break;
                        }
                }
                else
                {
                        switch (referenceArray[dayIn])
                        {
                        case 0:
                                result += "src='..//img//tile//b.png'/";
                                break;
                        case 1:
                                result += "src='..//img//tile//w.png'/		"
                                break;
                        case 2:
                                result += "src='..//img//tile//r.png'      onmouseover='this.src=\"..//img//tile//lr.png\";'      onmouseout='this.src=\"..//img//tile//r.png\"'";
                                break;
                        case 3:
                                result += "src='..//img//tile//y.png'      onmouseover='this.src=\"..//img//tile//ly.png\";'      onmouseout='this.src=\"..//img//tile//y.png\"'"
                                break;
                        case 4:
                                result += "src='..//img//tile//g.png'      onmouseover='this.src=\"..//img//tile//lg.png\";'      onmouseout='this.src=\"..//img//tile//g.png\"'"
                                break;
                        }
                }
                if (clickable)
                {
                        if (!daysActive && (this.daysDone[dayIn] == 2 || this.daysDone[dayIn] == 4))
                        {
                                result += "onclick='dDoneHandler(" + this.id + "," + dayIn + ")'";
                        }
                        else if (daysActive)
                        {
                                result += "onclick='dActiveHandler(" + this.id + "," + dayIn + ")'";
                        }
                }
                result += ">" //closes icon
                return result;
        }
        //creates a button, based on day, clickable and daysactive if mentioned
	//
        this.dDoneLocal = function (dayIn)
        {
                switch (this.daysDone[dayIn])
                {
                case 1:
                        //this.daysDone[dayIn] = 4;
                        //document.getElementById(this.id + "-" + (dayIn+1)).innerHTML = this.buttonGen(dayIn);
                case 2:
                        this.daysDone[dayIn] = 4;
                        document.getElementById(this.id + "-" + (dayIn + 1)).innerHTML = this.buttonGen(dayIn, true);
                        break;
                case 4:
                        this.daysDone[dayIn] = 2;
                        document.getElementById(this.id + "-" + (dayIn + 1)).innerHTML = this.buttonGen(dayIn, true);
                        break;
                }
        }
        //local handler of main dDone function, toggles day completion
	
        this.dActiveLocal = function (dayIn)
        {
                switch (this.activeDays[dayIn])
                {
                case 1:
                        this.activeDays[dayIn] = 0;
                        document.getElementById(this.id + "-" + (dayIn + 1)).innerHTML = this.buttonGen(dayIn, true, true);
                        break;
                case 0:
                        this.activeDays[dayIn] = 1;
                        document.getElementById(this.id + "-" + (dayIn + 1)).innerHTML = this.buttonGen(dayIn, true, true);
                        break;
                }
        }
        //local handler of main dActive function, toggles day activation
	//
	
	this.scrub = function (){
		for (i in this.daysDone){
			if (this.activeDays[i]==0) {
				this.daysDone[i]=0;
			}
			else if (this.activeDays[i]==1) {
				if (i>=dayOfWeek) {
					this.daysDone[i]=1;
				}
				else{
					if (this.daysDone[i]<2) {
						this.daysDone[i]=2;
					}
				}
			}
		}
	}
	//scrubbles task; checks for discrepancies in daysdone and activedays
	
        this.exportInfo = function ()
        {
                string = "";
                string += this.name + ";;";
                string += this.icon + ";;";
                string += this.id + ";;";
                string += this.activeDays + ";;";
                string += this.daysDone;
                return string;
        }
}