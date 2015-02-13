function archivedTaskGroup(inDateString, inarchString) {
    this.date = inDateString || Date().toDateString;
    this.id = this.date.replace(/\s+/g, '-');
    this.archArray = [];
    //initialization of local variables

    if (inarchString != null) {
        tarchArray = inarchString.split(";.;");
        for (var i in tarchArray) {
            var arch = tarchArray[i].split(";,;");
            tDoneDays = arch[4].split(",");
            for (var iv in tDoneDays) {
                tDoneDays[iv] = parseInt(tDoneDays[iv]);
            }
            this.archArray.push(new archivedTask(arch[1], arch[2], arch[3], tDoneDays, arch[5], arch[6]));
        }
    }
    //initialization of archArray from archString

    this.addArch = function(arch) {
        this.archArray.push(arch);
    }

    this.addToTable = function() {
        tableText = '<table id="'
            + this.id
            + '" style="margin-left:10px"><tbody id="archiveTasks"><tr>'
            + '<th width=312 colspan="4">';
        var tempDate = new Date(Date.parse(this.date));
        tempDate.setDate(tempDate.getDate()-6);
        tableText += tempDate.toDateString()
            + ' - '
            + this.date
            + '</th><th class="iconGrid">Mon</th>'
            + '<th class="iconGrid">Tue</th><th class="iconGrid">Wed</th>'
            + '<th class="iconGrid">Thu</th><th class="iconGrid">Fri</th>'
            + '<th class="iconGrid">Sat</th><th class="iconGrid">Sun</th>'
            + '</tr></tbody></table>'; 

        document.getElementById("archiveTables").innerHTML += tableText;

        archTaskRow = document.getElementById(this.id);

        for (var i = 0; i < this.archArray.length; i++) {
            this.archArray[i].addToTable(archTaskRow);
        }

        temp = archTaskRow.insertRow();
        temp.innerHTML = '<tfoot><tr id="deleteArchive"><td colspan="1" class="iconGrid"><img class="icon" id="deleteTaskButton" src="../img/tile/cross.png"></td>'
        + '<td colspan="1" class="iconGrid">' + floatToPercentagePoint(this.calculateTotalPercentage()) + '% achieved</td></tr>'
        + '</tfoot>'
    }

    this.attachEvents = function() {
        for (var i = 0; i < this.archArray.length; i++) {
            this.archArray[i].attachEvents();
        }
        var bob = this.id;
        $("#" + this.id + " #deleteTaskButton").click(function(){deleteArchive(bob);});
    }


    this.exportInfo = function() {
        var string = "archGroup;;";
        string += this.date + ";;";
        for (var i = 0; i < this.archArray.length; i++) {
            string += this.archArray[i].exportInfo() + ";.;";
        }
        string = string.substring(0, string.length - 3);
        return string;
    }
    
    this.calculateTotalPercentage = function(){
        var tempTotalOpen = 0;
        var tempTotalCounted = 0;
        for (var i = 0; i<this.archArray.length;i++) {
            for (var ii=0; ii<this.archArray[i].daysDone.length; ii++){
                if (this.archArray[i].daysDone[ii]>=2) {
                    tempTotalOpen += 1;
                }
                if (this.archArray[i].daysDone[ii]==4) {
                    tempTotalCounted += 1;
                }
            }
        }
    
        return tempTotalCounted/tempTotalOpen;
    }

    this.calculateDayPercentage = function(day){
        var tempTotalOpen = 0;
        var tempTotalCounted = 0;
        for (var i = 0; i<this.archArray.length;i++) {
            if (this.archArray[i].daysDone[day]>=2) {
                tempTotalOpen += 1;
            }
            if (this.archArray[i].daysDone[day]==4) {
                tempTotalCounted += 1;
            }
        }
    
        return tempTotalCounted/tempTotalOpen;
    }


}