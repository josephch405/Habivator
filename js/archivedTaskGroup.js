function archivedTaskGroup(inDateString, inarchString) {
    this.date = inDateString || Date().toDateString;
    this.id = this.date.replace(/\s+/g, '-');
    this.archArray = [];

    if (inarchString != null) {
        tarchArray = inarchString.split(";.;");
        for (var i = 0; i < tarchArray.length; i++) {
            var arch = tarchArray[i].split(";,;");
            tDoneDays = arch[4].split(",");
            for (var iv in tDoneDays) {
                tDoneDays[iv] = parseInt(tDoneDays[iv]);
            }
            this.archArray.push(new archivedTask(arch[1], arch[2], arch[3], tDoneDays, arch[5], arch[6]));
        }
    }

    this.addArch = function(arch) {
        this.archArray.push(arch);
    }


    this.addToTable = function() {
        
        tableText = '<table id="'
        console.log(this.id);
        tableText += this.id;
        tableText += '" style="margin-left:10px"><tbody id="archiveTasks"><tr>';
        tableText += '<th width=312 colspan="4">';
        var tempDate = new Date(Date.parse(this.date));
        tempDate.setDate(tempDate.getDate()-6);
        tableText += tempDate.toDateString();
        tableText += ' - '
        tableText += this.date;
        tableText += '</th><th class="iconGrid">Mon</th>';
        tableText += '<th class="iconGrid">Tue</th><th class="iconGrid">Wed</th>';
        tableText += '<th class="iconGrid">Thu</th><th class="iconGrid">Fri</th>';
        tableText += '<th class="iconGrid">Sat</th><th class="iconGrid">Sun</th>';
        tableText += '</tr>';
        tableText +='</tbody>';
        tableText += '<tfoot><tr id="deleteArchive"><td colspan="1" class="iconGrid"><img class="icon" id="deleteTaskButton" src="..\\img\\tile\\cross.png"></td>';
        tableText += '<td colspan="1" class="iconGrid">' + Math.floor(this.calculateTotalPercentage()*1000)/10 + '% achieved</td></tr>'
        tableText += '</tfoot>'

        tableText +='</table>';
        //yes, a rather messy blob, but better than a huge line IMO
    
        document.getElementById("archiveTables").innerHTML += tableText;
        for (var i = 0; i < this.archArray.length; i++) {
            this.archArray[i].addToTable(this.id);
        }
    }

    this.attachEvents = function() {
        for (var i = 0; i < this.archArray.length; i++) {
            this.archArray[i].attachEvents();
        }
        console.log(bob);
        var bob = this.id;
        console.log($("#" + this.id + " #deleteTaskButton").click());
        $("#" + this.id + " #deleteTaskButton").click(function(){deleteArchive(bob); console.log(bob)});
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
        console.log( tempTotalCounted);
        console.log( tempTotalOpen);
    
        return tempTotalCounted/tempTotalOpen;
    }

}