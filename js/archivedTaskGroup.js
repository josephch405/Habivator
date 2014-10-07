function archivedTaskGroup(inDateString, inarchString) {
    this.date = inDateString || Date().toDateString;
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
        console.log(this.date);
        tableText += this.date;
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
        tableText += '</tr></tbody></table>';
        //yes, a rather messy blob, but better than a huge line IMO
    
        document.getElementById("archiveTables").innerHTML += tableText;
        for (var i = 0; i < this.archArray.length; i++) {
            this.archArray[i].addToTable(this.date);
        }
    }

    this.attachEvents = function() {
        for (var i = 0; i < this.archArray.length; i++) {
            this.archArray[i].attachEvents();
        }
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