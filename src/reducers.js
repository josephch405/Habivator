import { combineReducers } from 'redux'
import { ADD_TASK, TOGGLE_DAYSDONE, TOGGLE_ACTIVEDAYS, TOGGLE_UNIT, SET_QUANT, PRUNE, SET_TIME, REMOVE_TASK, SET_NAME, LOAD } from './actions'
import moment from 'moment';
import { habisave } from './habisave'

const dayOfWeek = () => (new Date().getDay() + 6) % 7;

const revealUpTo = (weekStart) => Math.min(moment().diff(moment(weekStart), 'days'), 6);

const blankTask = {
    name: "New Task",
    id: 0,
    karma: 0,
    activeDays: [true, true, true, true, true, true, true],
    daysDone: [2, 2, 2, 2, 2, 2, 2], //0: b, 1: w, 2: r, 3: g
    quant: 0,
    unit: 0,
    toss: false
}

const idOccupied = (tasks, id)=>{
    for (var i = 0; i < tasks.length; i ++){
        if(tasks[i].id == id){
            return true;
        }
    }
    return false;
}

const nextId = function(tasks){
    var i = 0;
    while (idOccupied(tasks, i)){
        i++
    }
    return i;
}

const activeDays = (state = [true, true, true, true, true, true, true], action) => {
    var di = action.dayIndex;
    var _o = Object.assign([], state);
    switch (action.type) {
        case TOGGLE_ACTIVEDAYS:
            _o[di] = !_o[di];
            return _o;
        default:
            return state;
    }
}

const daysDone = (state = [2,2,2,2,2,2,2], action, active) => {
    var di = action.dayIndex;
    var _o = Object.assign([], state);
    switch (action.type) {
        case TOGGLE_DAYSDONE:
            //if the day is toggleable, toggle between red and green
            if (active[di])
                _o[di] = (_o[di] == 2) ? 3 : 2;
            //otherwise, return black
            else
                _o[di] = 0;
            return _o;
        case TOGGLE_ACTIVEDAYS:
            //if the day is toggleable, and is black/white, set to red
            if (active[di] && _o[di] < 2)
                _o[di] = 2;
            //otherwise, set to black
            else if (!active[di])
                _o[di] = 0;
            return _o;
        case PRUNE:
            var cutoff = action.dayIndex;
            //dates before cutoff
            for (var i = 0; i <= cutoff; i ++){
                if (active[i] && _o[i] < 2)
                        _o[i] = 2;
                else if (!active[i])
                    _o[i] = 0;
            }
            for (var i = cutoff + 1; i <= 6; i ++){
                if (active[i])
                    _o[i] = 1;
                else
                    _o[i] = 0;
            }
            return _o;
        default:
            return state;
    }
}

const task = (state = {}, action) => {
    if (action.taskId != null && state.id != action.taskId) {
        return state;
    }
    var _o = Object.assign({}, state);
    var di = action.dayIndex;

    switch (action.type) {
        case TOGGLE_DAYSDONE:
        case TOGGLE_ACTIVEDAYS:
        case PRUNE:
            _o.activeDays = activeDays(state.activeDays, action);
            _o.daysDone = daysDone(state.daysDone, action, _o.activeDays);
            return _o;

        case TOGGLE_UNIT:
            _o.unit = (_o.unit + 1) % 3;
            return _o;

        case SET_QUANT:
            _o.quant = action.quant;
            return _o;

        case SET_NAME:
            _o.name = action.name;
            return _o;

        default:
            return state
    }
}

const tasks = (state = [blankTask], action) => {
    switch (action.type) {
        case ADD_TASK:
            var _t = Object.assign({}, blankTask);
            console.log("TID")
            console.log(nextId(state))
            console.log(state)
            _t.id = nextId(state);
            return [...state, _t];
        case REMOVE_TASK:
            console.log("RMT")
            var _o = Object.assign([], state);
            for (var i = 0; i < state.length; i ++){
                console.log(i)
                if (_o[i].id == action.taskId){
                    _o.splice(i, 1);
                    return _o;
                }
            }
            return _o;

        default:
            return state.map(t => task(t, action))
    }
}

const weekDate = (state = moment().startOf('isoweek').toString(), action) => {
    switch (action.type){
        case SET_TIME:
            return moment(action.time).startOf('isoweek').toString();
        default:
            return state;
    }
}

export default function popupApp(state = {}, action){
    var _o = Object.assign({}, state);
    switch (action.type){
        case PRUNE:
            var cutoff = revealUpTo(state.weekDate);
            action.dayIndex = cutoff;
            _o.tasks = tasks(state.tasks, action);
            _o.weekDate = weekDate(state.weekDate, action);
            console.log(_o)
            return _o;
        case LOAD:
            _o = action._state;
            _o = popupApp(_o, {type: PRUNE});
            return _o;
        case ADD_TASK:
        case TOGGLE_DAYSDONE:
        case TOGGLE_ACTIVEDAYS:
        case TOGGLE_UNIT:
        case SET_QUANT:
            var pushChanges = true;
        default: 
            _o = {
                tasks: tasks(state.tasks, action),
                weekDate: weekDate(state.weekDate, action)
            };

            _o = popupApp(_o, {type: PRUNE});
            if (pushChanges)
                habisave.pushPopup(_o);
            return _o;
    }
}