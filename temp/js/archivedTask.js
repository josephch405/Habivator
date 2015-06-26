function archivedTask(nameIn, iconIn, idIn, daysDoneIn, unitIn, quantityIn) {
    //essentially static records of past tasks
    this.name = "new task";
    this.daysDone = [0, 0, 0, 0, 0, 0, 0] //0 is n/a, 1 is blank, 2 is failed, 3 is half and 4 is complete
    if (daysDoneIn != null && daysDoneIn.length == 7) {
        this.daysDone = daysDoneIn;
    }
    this.unit = unitIn || 0; //0 is no count, 1 is reps, 2 is minutes
    this.quantity = parseInt(quantityIn) || 0;
    this.name = nameIn || "New Task";
    this.id = parseInt(idIn) || -1;
    this.icon = iconIn || 1;
    //basic init. management
    


/*
    INDEX
    createTaskRow
    attachEvents
    buttonGen
    addToTable
    exportInfo
    calculateTaskPercentage
*/

    this.createTaskRow = function() {

        var iconTag = "green";
        var tPercentage = this.calculateTaskPercentage();
        var tempKarma = floatToKarma(tPercentage);
        if (tempKarma == -1){
            iconTag = "red";
        }
        else if (tempKarma == 0){
            iconTag = "orange";
        }
        rowText = "<tr><td class='iconGrid' id='" + this.id + "-i'><img class='icon' src='..\\img\\tile\\" + iconTag + ".png'></td>";
        //icon

        rowText += "<td";
        if (this.unit == 0) {
            rowText += " colspan = 3;";
            rowText += ">" + this.name + "</td>";
        } else {
            rowText += " style='width:" + nameBoxWidth + "px;'>" + this.name + "</td>";
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
            rowText += "</td>"
        }

        //rowText += "<td class='smallText'>";
        //rowText += floatToPercentage(this.calculateTaskPercentage()) + "%";
        //rowText += "</td>"
        //use for task percentaging

        rowText+="</tr>"

        return rowText;
    }
    //creates normal task row and returns string



    this.attachEvents = function() {
        var id = this.id;
        for (var i = 0; i < this.daysDone.length; i++) {
            var pic = document.getElementById(this.id + "-" + (parseInt(i) + 1));
            var pic_id = this.id + "-" + (parseInt(i) + 1);
            switch (parseInt(this.daysDone[i])) {
            case 2:
                picSetup(pic_id, iconDB.r, iconDB.lr)
                clickable = false;
                break;
            case 4:
                var pic = document.getElementById(this.id + "-" + (parseInt(i) + 1));
                picSetup(pic_id, iconDB.g, iconDB.lg)
                break;
            }
        }
    }
    //attaches onhover events



    this.buttonGen = function(dayIn) {
        var result = "";
        result += "<img class='icon'"; //opens icon
        result += "id='" + this.id + "-" + (dayIn + 1) + "'";
        switch (parseInt(this.daysDone[dayIn])) {
        case 0:
            result += "src='../img/tile/b.png'>";
            break;
        case 2:
            result += "src='../img/tile/r.png'>";
            break;
        case 4:
            result += "src='../img/tile/g.png'>";
            break;
        }
        return result;
    }
    //creates a button, based on day
    


    this.addToTable = function(input) {
        temp = input.insertRow();
        temp.innerHTML = this.createTaskRow();
    }
    //adds archived task to archTaskRow



    this.exportInfo = function() {
        string = "arch;,;"
            + this.name + ";,;" + this.icon + ";,;" + this.id + ";,;"
            + this.daysDone + ";,;" + this.unit + ";,;" + this.quantity;
        return string;
    }
    //exports archive task in same format as imports
    


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
}