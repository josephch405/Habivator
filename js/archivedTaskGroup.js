function archivedTaskGroup(inDateString, inarchString) {

    console.log(inDateString+"asdf");
    this.date = inDateString || Date();
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
        for (var i = 0; i < this.archArray.length; i++) {
            this.archArray[i].addToTable();
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
        console.log(string);
        for (var i = 0; i < this.archArray.length; i++) {
            string += this.archArray[i].exportInfo() + ";.;";
        }
        string = string.substring(0, string.length - 3);
        return string;
    }

}