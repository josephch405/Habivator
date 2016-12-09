import moment from 'moment';

const Tlib = {
    weekStart: null,
	tasks: [],
	create: function(_t){
        if (_t == null){
            _t = {};
        }
		var t = {
			name: _t.name ? _t.name : "New Task",
			id: _t.id ? _t.id : this.nextId(),
			karma: _t.karma ? _t.karma : 0,
			activeDays: [true, true, true, true,true,true,true],
			daysDone: [2,2,2,2,2,2,2],                       //0: b, 1: w, 2: r, 3: g
			quantity: _t.quantity ? _t.quantity : 0,
			unit: _t.unit ? _t.unit : 0,
			toss: _t.toss ? _t.toss : false
		}
		this.tasks.push(t);
        this.pruneTasks();
        this.push();
	},
    get: function(i){
        for (var _t in this.tasks){
            if (this.tasks[_t].id == i)
                return this.tasks[_t];
        }
        return null;
    },
    rerender: function(){
        this.rerenderHook(this.tasks);
    },
    rerenderHook: function(){

    },
    nextId: function(){
        var i = 0;
        while (this.tasks[i])
            i ++
        return i;
    },
    boxClick: function(tid, did, e){
        var _t = this.get(tid);
        if (!e){
            if(_t.activeDays[did]){
                _t.daysDone[did] = (_t.daysDone[did] == 2) ? 3 : 2;
            }
            this.push();
            return;
        }
        _t.activeDays[did] = !_t.activeDays[did];
        _t.daysDone[did] = _t.activeDays[did] ? 2 : 0;
        this.push();
    },
    remove: function(id){
        for (var _t in this.tasks){
            if (this.tasks[_t].id == id){
                this.tasks.splice(_t, 1);
                return;
            }
        }
        this.push();
    },
    dayOfWeek: function(){
        return (new Date().getDay() + 6) % 7;
    },
    revealUpTo: function(){
        console.log(moment())
        console.log(this.weekStart)
        return Math.min(moment().diff(this.weekStart, 'days'), 6);
    },
    push: function(){
        chrome.storage.sync.set({'tasks': this.tasks}, function() {
              console.log('tasks saved');
        });
        chrome.storage.sync.set({'weekStart': this.weekStart.toString()}, function() {
              console.log('weekStart saved');
        });
    },
    pull: function(){
        var a = this;
        chrome.storage.sync.get("tasks", function(t){
            a.tasks = t.tasks;
            console.log(t);
            a.rerender();

            chrome.storage.sync.get("weekStart", function(w){
                if (moment(w.weekStart).isValid()){
                    a.weekStart = moment(w.weekStart).startOf('isoweek');
                } else {
                    a.weekStart = moment().startOf('isoweek');
                }
                a.pruneTasks();
                a.rerender();
                a.push();
                console.log(a.revealUpTo());
            });
        });
    },
    pruneTasks: function(){
        var cutoff = this.revealUpTo();
        for (var i = 0; i < this.tasks.length; i ++){
            var t = this.tasks[i];
            //go through dates before cutoff
            for (var ii = 0; ii <= cutoff; ii ++){
                if (t.activeDays[ii]){
                    if (t.daysDone[ii] < 2)
                        t.daysDone[ii] = 2;
                }
                else{
                    t.daysDone[ii] = 0;
                }
            }
            for (var ii = cutoff + 1; ii <= 6; ii ++){
                if (t.activeDays[ii]){
                    t.daysDone[ii] = 1;
                }
                else{
                    t.daysDone[ii] = 0;
                }
            }
        }
    }
}

const ATlib = {
    archTasks: [],

}

export {Tlib, ATlib};


/*
    calculations

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
*/