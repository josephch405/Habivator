const Tlib = {
	tasks: [],
	create: function(_t){
		var t = {
			name: _t.name ? _t.name : "New Task",
			id: _t.id ? _t.id : -1,
			karma: _t.karma ? _t.karma : 0,
			activeDays: [true, true, true, true,true,true,true],
			daysDone: [0,0,0,0,0,0,0],
			quantity: _t.quantity ? _t.quantity : 0,
			unit: _t.unit ? _t.unit : 0,
			toss: _t.toss ? _t.toss : false
		}
		this.tasks.push(t);
	}
}

export default Tlib;

function Task(nameIn, iconIn, idIn, activeDaysIn, daysDoneIn, unitIn, quantityIn, karmaIn, tossIn) {

    this.name = nameIn || "New Task";                       //name
    this.id = parseInt(idIn) || -1;                         //unique and ascending order according to creation date
    this.karma = parseInt(karmaIn) || 0;                    //used for recommendations
    this.activeDays = [1, 1, 1, 1, 1, 1, 1];                //0 is no and 1 is yes
    this.daysDone = [0, 0, 0, 0, 0, 0, 0];                  //0 is n/a, 1 is blank, 2 is failed, 3 is half and 4 is complete
    if (activeDaysIn !== null && daysDoneIn !== null) {
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
    if (typeof toss == "number" && tossIn !== 0){
        this.toss = 1;
    }

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
        this.karma *= .9;
        saveToLS();
        switchToEdit(id);
    }
    //toggles unit
    
    this.setUnit = function(unit) {
        this.unit = unit;
        this.karma *=.5;
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
        pTage = this.calculateTaskPercentage()*100;
        return .000059246*pTage*pTage*pTage - .011043 * pTage * pTage + 1.6045 * pTage - 67.867;
    }
}