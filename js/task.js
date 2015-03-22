function Task(nameIn, iconIn, idIn, activeDaysIn, daysDoneIn, unitIn, quantityIn, karmaIn, tossIn) {

//INDEX
    //INIT functions
    //ROW
    //local HANDLERS
    //SCRUB, EXPORT
    //CALCULATIONS
    //BUTTON/TILE
    //attachIconOnEvents

/*
    INIT functions
*/

    this.name = nameIn || "New Task";                       //name
    this.id = parseInt(idIn) || -1;                         //unique and ascending order according to creation date
    this.karma = parseInt(karmaIn) || 0;                    //used for recommendations
    this.activeDays = [1, 1, 1, 1, 1, 1, 1];                //0 is no and 1 is yes
    this.daysDone = [0, 0, 0, 0, 0, 0, 0]                   //0 is n/a, 1 is blank, 2 is failed, 3 is half and 4 is complete
    if (activeDaysIn != null && daysDoneIn != null) {
        if (activeDaysIn.length == 7 && daysDoneIn.length == 7) {
            this.activeDays = activeDaysIn;
            this.daysDone = daysDoneIn;
        }
    }                                                       //imports active days and days done if they are correct
    this.unit = unitIn || 0;                                //0 is no unit count, 1 is reps, 2 is minutes
    this.quantity = parseInt(quantityIn) || 0;
    if (this.quantity <=0){
        this.quantity = 1;
    }
    this.editMode = 0;
    this.toss = tossIn|| 0;
    if (typeof toss == "number" && tossIn != 0){
        this.toss = 1;
    }





/*
    ROW related
*/

    this.createRow = function(inIfTaskRow) {
        var ifTaskRow = false;
        if (inIfTaskRow == null) {ifTaskRow = true;
        } else {ifTaskRow = inIfTaskRow;}
        //catches cases where inIfTaskRow DNE

        var iconTagColor = "green";
        var tPercentage = this.calculateTaskPercentage();
        var tempKarma = floatToKarma(tPercentage);
        if (tempKarma == -1){
            iconTagColor = "red";
        }
        else if (tempKarma == 0){
            iconTagColor = "orange";
        }
        rowText = "<td class='iconGrid' id='" + this.id + "-i'><img class='icon' src='../img/tile/" + iconTagColor + ".png'></td>";
        //snippet gets percentage, then color tag, builds icon

        rowText += "<td";
        if (ifTaskRow) {
            if (this.unit == 0) {
                rowText += " colspan = 3;>" + this.name + "</td>";
            } else {
                rowText += " style='width:" + nameBoxWidth + "px;'>" + this.name + "</td>";
                if (this.unit == 1) {
                    rowText += "<td colspan=2>" + this.quantity + " Reps</td>";
                } else if (this.unit == 2) {
                    rowText += "<td colspan=2>" + this.quantity + " Mins</td>";
                }
            }
        } else {
            if (this.unit == 0) {
                rowText += " colspan = 2>";
            } else if (this.unit > 0) {
                rowText += " colspan = 1>";
            }
            rowText += "<input id='" + this.id + "-tf" + "' class='editingTextBox' type = 'text' value='" + this.name + "' ></td>";

            if (this.unit == 0) {
                rowText += "<td class='unitGrid' id='" + this.id + "-" + "cUnit" + "'>N/A</td>";
            } else if (this.unit == 1 || this.unit == 2) {
                rowText += "<td class='unitGrid'>" + "<input id=" + this.id + "-quant type='number' min='0' class='editUnitTextBox' value=" + this.quantity + ">" + "</td>";
                if (this.unit == 1) {
                    rowText += "<td class='unitGrid' id='" + this.id + "-" + "cUnit" + "'>Reps</td>";
                } else if (this.unit == 2) {
                    rowText += "<td class='unitGrid' id='" + this.id + "-" + "cUnit" + "'>Mins</td>";
                }
            }
        }
        //colspanning for each case of unit and edit/taskrow

        for (var i = 0; i < 7; i++) {
            rowText += "<td class='iconGrid'>";
            rowText += this.buttonGen(i, !ifTaskRow);
            rowText += "</td>"
        }
        //adds buttons for each day

        rowText += "<td class='halfIconGrid'>";
        rowText += "<img class='halfIcon' id='" + this.id + "-e' src='../img/tile/editButton.png'>";
        rowText += "</td>"
        //edit button

        rowText += "<td class='halfIconGrid'>";
        rowText += "<img class='halfIcon' id='" + this.id + "-del' src='../img/tile/deleteButton.png'>";
        rowText += "</td>"
        //del button

        return rowText;
    }
    //creates html rows for edit and dDone mode and returns string

    this.attachEvents = function() {
        var id = this.id;
        if (this.editMode == 1) {

            var editButton = document.getElementById(this.id + "-cUnit");
            editButton.onclick = function() {
                toggleUnitOutside(id);
            }

            for (var i = 0; i < this.activeDays.length; i++) {
                var pic_id = this.id + "-" + (parseInt(i) + 1);
                var pic = document.getElementById(this.id + "-" + (parseInt(i) + 1));
                switch (this.activeDays[i]) {
                case 0:
                    picSetup(pic_id, "../img/tile/rEdit.png", "../img/tile/lrEdit.png");
                    break;
                case 1:
                    picSetup(pic_id, "../img/tile/gEdit.png", "../img/tile/lgEdit.png");
                    break;
                }
                pic.onclick = function() {
                    dActiveHandler(parseInt(id), parseInt(this.id.split("-")[1]))
                };
            }
            editButton = document.getElementById(this.id + "-e")
            editButton_id = this.id + "-e";
            picSetup(editButton_id, "../img/tile/editButton.png", "../img/tile/leditButton.png")
            editButton.onclick = function() {
                switchToTask(id)
            };
            //edit button\

            tb = document.getElementById(this.id + "-tf");

            tb.onkeydown = function() {
                if (event.keyCode == 13) {
                    switchToTask(id)
                }
                //textfield input eventing
            };
            if (document.getElementById(this.id + "-quant")) {
                tb2 = document.getElementById(this.id + "-quant");
                tb2.onkeydown = function() {
                    if (event.keyCode == 13) {
                        switchToTask(id)
                    }
                    //quantity field input eventing
                };
            }
            //case for edit mode
        } else {
            for (var i = 0; i < this.daysDone.length; i++) {
                var pic_id = this.id + "-" + (parseInt(i) + 1);
                var pic = document.getElementById(this.id + "-" + (parseInt(i) + 1));
                var clickable = false;
                switch (this.daysDone[i]) {
                case 2:
                    picSetup(pic_id, iconDB.r, iconDB.lr)
                    clickable = true;
                    break;
                case 4:
                    picSetup(pic_id, iconDB.g, iconDB.lg)
                    clickable = true;
                    break;
                }
                if (clickable && i < dayOfWeek) {
                    pic.onclick = function() {
                        dDoneHandler(parseInt(id), parseInt(this.id.split("-")[1]))
                    };
                }
                pic.draggable = false;
            }
            editButton = document.getElementById(this.id + "-e")
            edit_id = this.id + "-e";
            picSetup(edit_id, iconDB.editButton, iconDB.leditButton)
            editButton.onclick = function() {
                switchToEdit(id)
            };
            editButton.draggable = false;
        }
        deleteButton = document.getElementById(this.id + "-del")
        del_id = this.id + "-del";
        picSetup(del_id, iconDB.deleteButton, iconDB.ldeleteButton)
        deleteButton.onclick = function() {
            deleteTask(id);
        };
        deleteButton.draggable = false;
        //case for not edit mode
    }

    //binds events to row

    this.buttonGen = function(dayIn, inDaysActive) {
        var daysActive = inDaysActive || false;
        result = "<img class='icon'"; //opens icon
        result += "id='" + this.id + "-" + (dayIn + 1) + "'";
        if (inDaysActive) {
            switch (this.activeDays[dayIn]) {
            case 0:
                result += "src='../img/tile/rEdit.png'";
                break;
            case 1:
                result += "src='../img/tile/gEdit.png'";
                break;
            }
        } else {
            switch (this.daysDone[dayIn]) {
            case 0:
                result += "src='../img/tile/b.png'";
                break;
            case 1:
                result += "src='../img/tile/w.png'"
                break;
            case 2:
                result += "src='../img/tile/r.png'";
                break;
            case 3:
                result += "src='../img/tile/y.png'";
                break;
            case 4:
                result += "src='../img/tile/g.png'";
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
        row.innerHTML = this.createRow(true);
    }
    //adds row to table, using createRow










/*
    local handlers
*/

    this.dDoneLocal = function(dayIn) {
        switch (this.daysDone[dayIn]) {
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
    //local handler of dActive, toggles day active status

    this.dDoneButtonLocal = function(){
        switch (this.daysDone[dayOfWeek-1]) {
        case 2:
            this.daysDone[dayOfWeek-1] = 4;
            document.getElementById(this.id).parentNode.innerHTML = this.createButton(dayOfWeek,2);
            break;
        case 4:
            this.daysDone[dayOfWeek-1] = 2;
            document.getElementById(this.id).parentNode.innerHTML = this.createButton(dayOfWeek,2);
            break;
        }
    }
    //local handler of button toggle in button view

    this.toggleUnit = function() {
        var id = this.id;
        switchToTask(id);
        this.unit = (this.unit + 1) % 3;
        this.karma = 0;
        saveToLS();
        switchToEdit(id);
    }
    //toggles unit
    
    this.setUnit = function(unit) {
        this.unit = unit;
        this.karma = 0;
        saveToLS();
    }
    //sets unit








/*
    SCRUB and EXPORT
*/
    this.scrub = function() {
        for (var i in this.daysDone) {
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
        for (var i in this.daysDone) {
            this.daysDone[i] = 1;
        }
        this.scrub();
    }
    
    this.exportInfo = function() {
        string = "task;;";
        string += this.name + ";;" + this.icon + ";;" + this.id + ";;";
        string += this.activeDays + ";;" + this.daysDone + ";;";
        string += this.unit + ";;" + this.quantity + ";;" + this.karma + ";;" + this.toss;
        return string;
    }
    
    this.exportAsArchive = function(){
        console.log("archive exported");
        var dDone = this.daysDone;
        var archive = new archivedTask(String(this.name), String(this.icon), +maxArchiveId, dDone, +this.unit, +this.quantity);
        maxArchiveId += 1;
        this.karma += this.calculateKarma();
        saveToLS();
        return archive;
    }










/*
    calculations
*/
    this.calculateTaskPercentage = function(){
        var tempTotalOpen = 0;
        var tempTotalCounted = 0;

        for (var ii=0; ii<this.daysDone.length; ii++){
            if (this.daysDone[ii]>=2) {
                tempTotalOpen += 1;
            }
            if (this.daysDone[ii]==4) {
                tempTotalCounted += 1;
            }
        }

        if (tempTotalOpen == 0){
            return 1;
        }

        return tempTotalCounted/tempTotalOpen;
    }

    this.calculateKarma = function(){
        percentage = this.calculateTaskPercentage();
        if (percentage >= .8){
            return 1;
        }
        else if(percentage <= .2){
            return -1;
        }
        return 0;
    }









/*
    button/tile functions
*/
    this.createButton = function(dayIn, ifUp) {
        var text;
        if (ifUp == 1){
            text = "<td id='" + this.id + "-i'>";
            text += "<div class='bigIconDiv'>";
            text += this.name;
            if (this.unit == 1){
                text += "<br>" + this.quantity + " reps";
            }
            else if (this.unit == 2){
                text += "<br>" + this.quantity + " mins";
            }
            text += "</div></td>";
            return text;
        }

        else {
            text = "<td><img class='bigIcon'"; //opens icon
            text += "id='" + this.id + "'";
            var referenceArray;
            referenceArray = this.daysDone;
            switch (referenceArray[dayIn-1]) {
                case 0:
                    text += "src='../img/tile/b.png'/";
                    break;
                case 1:
                    text += "src='../img/tile/w.png'/"
                    break;
                case 2:
                    text += "src='../img/tile/r.png'";
                    break;
                case 3:
                    text += "src='../img/tile/y.png'";
                    break;
                case 4:
                    text += "src='../img/tile/g.png'";
                    break;
            }
            text += "</td>";
            return text;
        }
    }

    this.addButton = function() {
        table = document.getElementById("tasks");
        var row, row2;
        if((cellsInRow >= maxCellsPerRow) || (maxRow==0 && cellsInRow == 0))
        {
            row = table.insertRow(table.rows.length)
            row.id = "row"+maxRow;
            row2 = table.insertRow(table.rows.length)
            row2.id = "row"+(maxRow+"b");
            maxRow += 2;
            cellsInRow = 1;
        }
        else {
            row = document.getElementById("row"+(maxRow-2));
            row2 = document.getElementById("row"+(maxRow-2)+"b");
            cellsInRow += 1;
        }
        var cell = row.insertCell(cellsInRow-1);
        var button = row2.insertCell(cellsInRow-1);
        cell.innerHTML = this.createButton(dayOfWeek, 1);
        button.innerHTML = this.createButton(dayOfWeek, 2);
    }

    this.attachButtons = function(){
        var pic = document.getElementById(this.id);
        var pic_id = this.id;
        switch (this.daysDone[dayOfWeek-1]) {
        case 2:
            picSetup(pic_id, iconDB.r, iconDB.lr)
            break;
        case 4:
            picSetup(pic_id, iconDB.g, iconDB.lg)
            clickable = true;
            break;
        }
        pic.onclick = function() {
            dDoneButtonHandler(parseInt(this.id));
        };
        pic.draggable = false;
    }

}