function archivedTask(nameIn, iconIn, idIn, daysDoneIn, unitIn, quantityIn) {
    //essentially static records of past tasks

    this.name = "new task";
    this.editMode = 0;
    this.daysDone = [0, 0, 0, 0, 0, 0, 0] //0 is n/a, 1 is blank, 2 is failed, 3 is half and 4 is complete

    if (daysDoneIn != null && daysDoneIn.length == 7) {
        this.daysDone = daysDoneIn;
    }

    this.unit = unitIn || 0; //0 is no count, 1 is reps, 2 is minutes
    this.quantity = quantityIn || 0;
    this.name = nameIn || "New Task";
    this.id = idIn || -1;
    this.icon = iconIn || 1;
    //basic init. management
    //
    this.createTaskRow = function() {

        rowText = "<td class='iconGrid' id='" + this.id + "-i'><img class='icon' src='..\\img\\tile\\1.png'></td>";
        //icon

        rowText += "<td";
        if (this.unit == 0) {
            rowText += " colspan = 3;";
            rowText += ">" + this.name + "</td>";
        } else {
            rowText += " style='width:180px;'";
            rowText += ">" + this.name + "</td>";
            if (this.unit == 1) {
                rowText += "<td colspan=2>" + this.quantity + " Reps</td>";
            } else if (this.unit == 2) {
                rowText += "<td colspan=2>" + this.quantity + " Mins</td>";
            }
        }
        //colspanning for each case of unit and edit/taskrow

        for (var i = 0; i < 7; i++) {
            rowText += "<td class='iconGrid'>";
            rowText += this.buttonGen(i);
            console.log(this.buttonGen(i))
            rowText += "</td>"
        }

        rowText += "<td class='halfIconGrid'>";
        rowText += "<img class='halfIcon' id='" + this.id + "-del' src='..//img//tile//deleteButton.png'>";
        rowText += "</td>"
        //del button

        return rowText;
    }
    //creates normal task row and returns string
    //
    this.attachEvents = function() {
        var id = this.id;

        for (var i = 0; i < this.daysDone.length; i++) {
            var pic = document.getElementById(this.id + "-" + (parseInt(i) + 1));
            switch (parseInt(this.daysDone[i])) {
            case 2:
                pic.onmouseover = function() {
                    this.src = "..//img//tile//lr.png"
                };
                pic.onmouseout = function() {
                    this.src = "..//img//tile//r.png"
                }
                clickable = false;
                break;
            case 4:
                pic.onmouseover = function() {
                    this.src = "..//img//tile//lg.png"
                };
                pic.onmouseout = function() {
                    this.src = "..//img//tile//g.png"
                }
                break;
            }
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
    this.buttonGen = function(dayIn) {
        var result = "";
        result += "<img class='icon'"; //opens icon
        result += "id='" + this.id + "-" + (dayIn + 1) + "'";
        switch (parseInt(this.daysDone[dayIn])) {
        case 0:
            result += "src='..//img//tile//b.png'/";
            break;
        case 1:
            result += "src='..//img//tile//w.png'/"
            break;
        case 2:
            result += "src='..//img//tile//r.png'";
            console.log("asdf")
            break;
        case 3:
            result += "src='..//img//tile//y.png'";
            break;
        case 4:
            result += "src='..//img//tile//g.png'";
            break;
        }
        result += ">" //closes icon
        return result;
    }
    //creates a button, based on day and daysactive if mentioned
    //
    this.addToTable = function() {
        table = document.getElementById("archiveTasks");
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
    //local handler of main dLocal function, toggles day done
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

    this.exportInfo = function() {
        string = "arch;,;";
        string += this.name + ";,;" + this.icon + ";,;" + this.id + ";,;";
        string += this.daysDone + ";,;";
        string += this.unit + ";,;" + this.quantity;
        return string;
    }
}