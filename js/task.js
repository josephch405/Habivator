function Task(nameIn, iconIn, idIn, activeDaysIn, daysDoneIn, unitIn, quantityIn) {
    this.name = "new task";
    this.editMode = 0;
    this.activeDays = [1, 1, 1, 1, 1, 1, 1]; //0 is no and 1 is yes
    this.daysDone = [0, 0, 0, 0, 0, 0, 0] //0 is n/a, 1 is blank, 2 is failed, 3 is half and 4 is complete
    if (activeDaysIn != null && daysDoneIn != null) {
        if (activeDaysIn.length == 7 && daysDoneIn.length == 7) {
            this.activeDays = activeDaysIn;
            this.daysDone = daysDoneIn;
        }
    }
    this.unit = unitIn || 0; //0 is no count, 1 is reps, 2 is minutes
    this.quantity = quantityIn || 0;
    this.name = nameIn || "New Task";
    this.id = idIn || -1;
    this.icon = iconIn || 1;
    //basic init. management
    //
    this.createTaskRow = function() {
        rowText = "";
        rowText += "<td class='iconGrid' id='" + this.id + "-i'><img class='icon' src='..\\img\\tile\\1.png'></td>";
        //icon

        rowText += "<td";
        if (this.unit == 0) {
            rowText += " colspan = 3";
        }
		else {
			rowText += " style='width:180px;'"
		}
		//spreads out colspan in case of non unit task
        rowText += ">" + this.name + "</td>";
        //title
		
		switch (this.unit){
			case 1:
				rowText+="<td colspan=2>" + this.quantity + " Reps</td>";
				break;
			case 2:
				rowText+="<td colspan=2>" + this.quantity + " Mins</td>";
				break;
		}
		//unit if applicable
		
        for (var i = 0; i < 7; i++) {
            rowText += "<td class='iconGrid'>";
            //opens grid
            rowText += this.buttonGen(i);
            //uses buttonGen to add button for day
            rowText += "</td>"
            //closes the grid
        }
        //week grids
        rowText += "<td class='halfIconGrid'>";
        rowText += "<img class='halfIcon'  id='" + this.id + "-e' src='..//img//tile//editButton.png'>";
        rowText += "</td>"
        //edit button
        rowText += "<td class='halfIconGrid'>";
        rowText += "<img class='halfIcon'  id='" + this.id + "-del' src='..//img//tile//deleteButton.png'>";
        rowText += "</td>"
        //delete
        return rowText;
    }
    //creates normal task row and returns string
    //
    this.createEditRow = function() {
        rowText = "";
        rowText += "<td class='iconGrid' id='" + this.id + "-i'><img class='icon' src='..\\img\\tile\\1.png'></td>";
        //icon 
        rowText += "<td"
		if (this.unit == 0) {
            rowText += " colspan = 2";
        }
		else if (this.unit > 0) {
            rowText += " colspan = 1";
        }
		rowText+=">";
        rowText += "<input id='" + this.id + "-tf" + "' class='editingTextBox' type = 'text' value='" + this.name + "'"
        rowText += "</td>";
        //title
		
		switch (this.unit) {
			case 0:
				rowText += "<td class='unitGrid' id='" + this.id + "-" + "cUnit" + "'>N/A</td>";
				break;
			case 1:
			case 2:
				rowText+="<td>" + this.quantity + "</td>";
				break;
		}
		switch (this.unit){
			case 1:
				rowText += "<td class='unitGrid' id='" + this.id + "-" + "cUnit" + "'>Reps</td>";
				break;
			case 2:
				rowText += "<td class='unitGrid' id='" + this.id + "-" + "cUnit" + "'>Mins</td>";
				break;
		}
		//unit editing
		
        for (var i = 0; i < 7; i++) {
            rowText += "<td class='iconGrid'>";
            //opens grid
            rowText += this.buttonGen(i, true);
            //uses buttonGen to add button for day
            rowText += "</td>"
            //closes the grid
        }
        //week grids
        rowText += "<td class='halfIconGrid'>";
        rowText += "<img class='halfIcon' id='" + this.id + "-e' src='..//img//tile//editButton.png'";
        rowText += ">";
        //edit button
        rowText += "<td class='halfIconGrid'>";
        rowText += "<img class='halfIcon'  id='" + this.id + "-del' src='..//img//tile//deleteButton.png'>";
        rowText += "</td>"
        //delete button
        return rowText;
    }
    //creates row for edit mode and returns string
    //
    this.attachEvents = function() {
        var id = this.id;
        if (this.editMode == 1) {
			
			
			
            for (var i = 0; i < this.activeDays.length; i++) {
                var pic = document.getElementById(this.id + "-" + (parseInt(i) + 1));
                switch (this.activeDays[i]) {
                case 0:
                    pic.onmouseover = function() {
                        this.src = "..//img//tile//lr.png"
                    };
                    pic.onmouseout = function() {
                        this.src = "..//img//tile//r.png"
                    }
                    break;
                case 1:
                    pic.onmouseover = function() {
                        this.src = "..//img//tile//lg.png"
                    };
                    pic.onmouseout = function() {
                        this.src = "..//img//tile//g.png"
                    };
                    break;
                }
                pic.onclick = function() {
                    dActiveHandler(parseInt(id), parseInt(this.id.split("-")[1]))
                };
            }
            editButton = document.getElementById(this.id + "-e")
            editButton.onmouseover = function() {
                this.src = "..//img//tile//leditButton.png"
            };
            editButton.onmouseout = function() {
                this.src = "..//img//tile//editButton.png"
            };
            editButton.onclick = function() {
                switchToTask(id)
            };
            //edit button

            editButton.onclick = function() {
                switchToTask(id)
            };
            tb = document.getElementById(this.id + "-tf");
            tb.onkeydown = function() {
                if (event.keyCode == 13) {
                    switchToTask(id)
                }
                //textfield input eventing
            };
        } else {
            for (var i = 0; i < this.daysDone.length; i++) {
                var pic = document.getElementById(this.id + "-" + (parseInt(i) + 1));
                var clickable = false;
                switch (this.daysDone[i]) {
                case 2:
                    pic.onmouseover = function() {
                        this.src = "..//img//tile//lr.png"
                    };
                    pic.onmouseout = function() {
                        this.src = "..//img//tile//r.png"
                    }
                    clickable = true;
                    break;
                case 4:
                    pic.onmouseover = function() {
                        this.src = "..//img//tile//lg.png"
                    };
                    pic.onmouseout = function() {
                        this.src = "..//img//tile//g.png"
                    }
                    clickable = true;
                    break;
                }
                clickable = clickable && i < dayOfWeek;
                if (clickable) {
                    pic.onclick = function() {
                        dDoneHandler(parseInt(id), parseInt(this.id.split("-")[1]))
                    };
                }
            }
            editButton = document.getElementById(this.id + "-e")
            editButton.onmouseover = function() {
                this.src = "..//img//tile//leditButton.png"
            };
            editButton.onmouseout = function() {
                this.src = "..//img//tile//editButton.png"
            };
            editButton.onclick = function() {
                switchToEdit(id)
            };
        }
        deleteButton = document.getElementById(this.id + "-del")
        deleteButton.onmouseover = function() {
            this.src = "..//img//tile//ldeleteButton.png"
        };
        deleteButton.onmouseout = function() {
            this.src = "..//img//tile//deleteButton.png"
        };
        deleteButton.onclick = function() {
            deleteTask(id);
        };
    }

    //output row text and paste to end of table at start build of page, when called
    //
    this.buttonGen = function(dayIn, inDaysActive) {
        var result = "";
        var daysActive = inDaysActive || false;
        result += "<img class='icon'"; //opens icon
        result += "id='" + this.id + "-" + (dayIn + 1) + "'";
        var referenceArray;
        if (daysActive) {
            referenceArray = this.activeDays;
        } else {
            referenceArray = this.daysDone;
        }
        if (inDaysActive) {
            switch (referenceArray[dayIn]) {
            case 0:
                result += "src='..//img//tile//r.png'";
                break;
            case 1:
                result += "src='..//img//tile//g.png'";
                break;
            }
        } else {
            switch (referenceArray[dayIn]) {
            case 0:
                result += "src='..//img//tile//b.png'/";
                break;
            case 1:
                result += "src='..//img//tile//w.png'/"
                break;
            case 2:
                result += "src='..//img//tile//r.png'";
                break;
            case 3:
                result += "src='..//img//tile//y.png'";
                break;
            case 4:
                result += "src='..//img//tile//g.png'";
                break;
            }
        }
        result += ">" //closes icon
        return result;
    }
    //creates a button, based on day and daysactive if mentioned
    //
    this.addToTable = function() {
        table = document.getElementById("tasks");
        var row = table.insertRow(table.rows.length)
        row.id = this.id;
        row.innerHTML = this.createTaskRow();
    }
    this.dDoneLocal = function(dayIn) {
        switch (this.daysDone[dayIn]) {
        case 1:
            //this.daysDone[dayIn] = 4;
            //document.getElementById(this.id + "-" + (dayIn+1)).innerHTML = this.buttonGen(dayIn);
        case 2:
            this.daysDone[dayIn] = 4;
            document.getElementById(this.id + "-" + (dayIn + 1)).parentNode.innerHTML = this.buttonGen(dayIn);
            break;
        case 4:
            this.daysDone[dayIn] = 2;
            document.getElementById(this.id + "-" + (dayIn + 1)).parentNode.innerHTML = this.buttonGen(dayIn);
            break;
        }
    }
    //local handler of main dDone function, toggles day completion
    this.dActiveLocal = function(dayIn) {
        switch (this.activeDays[dayIn]) {
        case 1:
            this.activeDays[dayIn] = 0;
            document.getElementById(this.id + "-" + (dayIn + 1)).parentNode.innerHTML = this.buttonGen(dayIn, true);
            break;
        case 0:
            this.activeDays[dayIn] = 1;
            document.getElementById(this.id + "-" + (dayIn + 1)).parentNode.innerHTML = this.buttonGen(dayIn, true);
            break;
        }
    }
    //local handler of main dActive function, toggles day activation
    //
    this.scrub = function() {
        for (i in this.daysDone) {
            if (this.activeDays[i] == 0) {
                this.daysDone[i] = 0;
            } else if (this.activeDays[i] == 1) {
                if (i >= dayOfWeek) {
                    this.daysDone[i] = 1;
                } else {
                    if (this.daysDone[i] < 2) {
                        this.daysDone[i] = 2;
                    }
                }
            }
        }
    }
    //scrubbles task; checks for discrepancies in daysdone and activedays
    this.scrubClean = function() {
        for (i in this.daysDone) {
            this.daysDone[i] = 1;
        }
        this.scrub();
    }
    this.exportInfo = function() {
        string = "";
        string += this.name + ";;" + this.icon + ";;" + this.id + ";;";
        string += this.activeDays + ";;" + this.daysDone + ";;";
        string += this.unit + ";;" + this.quantity;
        return string;
    }
}