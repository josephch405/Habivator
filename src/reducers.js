import { combineReducers } from 'redux'
import { ADD_TASK, TOGGLE_DAYSDONE, TOGGLE_ACTIVEDAYS, TOGGLE_UNIT, SET_QUANT, PRUNE, SET_TIME, REMOVE_TASK, SET_NAME, LOAD, SET_NOTIF_INTERV } from './actions'
import moment from 'moment';
import { habisave } from './habisave'

/* int - returns day of week, 0...6 (mon...sun)
 */
const dayOfWeek = () => (new Date().getDay() + 6) % 7;

/* int - returns number of days to "prune" the week; takes in moment as param
 */
const revealUpTo = (weekStart) => Math.min(moment().diff(moment(weekStart), 'days'), 6);

/* Template for default, blank task
 *Use for field reference
 */
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

/* bool - returns if task with this id exists in passed in array
 */
const idOccupied = (tasks, id) => {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            return true;
        }
    }
    return false;
}

const nextId = function(tasks) {
    var i = 0;
    while (idOccupied(tasks, i)) {
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

const daysDone = (state = [2, 2, 2, 2, 2, 2, 2], action, active) => {
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
            for (var i = 0; i <= cutoff; i++) {
                if (active[i] && _o[i] < 2)
                    _o[i] = 2;
                else if (!active[i])
                    _o[i] = 0;
            }
            for (var i = cutoff + 1; i <= 6; i++) {
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
            _t.id = nextId(state);
            return [...state, _t];
        case REMOVE_TASK:
            var _o = Object.assign([], state);
            for (var i = 0; i < state.length; i++) {
                if (_o[i].id == action.taskId) {
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
    switch (action.type) {
        case SET_TIME:
            return moment(action.time).startOf('isoweek').toString();
        default:
            return state;
    }
}

/* handles "whole week data" objects that have a "weekDate" and "tasks"
 * should be renamed tbh
 */
const popupApp = (state = {}, action) => {
    var _o = Object.assign({}, state);
    switch (action.type) {
        case PRUNE:
            var cutoff = revealUpTo(state.weekDate);
            action.dayIndex = cutoff;
            _o.tasks = tasks(state.tasks, action);
            _o.weekDate = weekDate(state.weekDate, action);
            return _o;
        case LOAD:
            _o = action._state;
            _o = popupApp(_o, { type: PRUNE });
            return _o;
        case ADD_TASK:
        case TOGGLE_DAYSDONE:
        case TOGGLE_ACTIVEDAYS:
        case TOGGLE_UNIT:
        case SET_QUANT:
        case SET_NAME:
        case REMOVE_TASK:
            var pushChanges = true;
        default:
            _o = {
                tasks: tasks(state.tasks, action),
                weekDate: weekDate(state.weekDate, action)
            };

            _o = popupApp(_o, { type: PRUNE });
            if (pushChanges)
                habisave.pushPopup(_o);
            return _o;
    }
}

const settings = (state = {}, action) => {
    var _o = Object.assign({}, state);
    switch (action.type) {
        case SET_NOTIF_INTERV:
            _o.notifInterv = action.target;
    }
    return _o;
}


const archTask = (state = {}, action) => {
    var _o = {
        tasks: tasks(state.tasks, LOAD),
        weekDate: weekDate(state.weekDate, LOAD)
    };
    return _o;
}

/* handles "whole archive data" as an array - essentially the "charts" in options
 */
const archTasks = (state = [], action) => {
    var _o = Object.assign([], state);
    switch (action.type) {
        default: for (var i = 0; i < state.length; i++) {
            _o[i] = archTask(_o[i], LOAD);
        }
        return _o;
    }
}

/* reducer for entire "options" side - combines settings, archtasks and popupApp
*/
const optionsApp = (state = {}, action) => {
    var _o = Object.assign({}, state);
    switch (action.type) {
        case LOAD: _o = {
                settings: settings(action._state.settings, action),
                archTasks: archTasks(action._state.archTasks, action),
                current: popupApp(action._state.current, action)
            };
            break;
        default: _o = {
                settings: settings(state.settings, action),
                archTasks: archTasks(state.weekDate, action),
                current: popupApp(state.current, action)
            };
    }
    return _o;
}

module.exports = {
    popupApp,
    optionsApp
}
