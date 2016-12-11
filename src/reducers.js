import { combineReducers } from 'redux'
import { ADD_TASK, TOGGLE_DAYSDONE, TOGGLE_ACTIVEDAYS, TOGGLE_UNIT, SET_QUANT } from './actions'

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

const nextId = (tasks) => {
    var i = 0;
    while (tasks[i])
        i++
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
            if (active)
                _o[di] = (_o[di] == 2) ? 3 : 2;
            //otherwise, return black
            else
                _o[di] = 0;
            return _o;
        case TOGGLE_ACTIVEDAYS:
            //if the day is toggleable, and is black/white, set to red
            if (active && _o[di] < 2)
                _o[di] = 2;
            //otherwise, set to black
            else if (!active)
                _o[di] = 0;
            return _o
        default:
            return state;
    }
}

const task = (state = {}, action) => {
    if (state.id != action.taskId) {
        return state;
    }
    var _o = Object.assign({}, state);
    var di = action.dayIndex;

    switch (action.type) {
        case TOGGLE_DAYSDONE:
            _o.activeDays = activeDays(state.activeDays, action);
            _o.daysDone = daysDone(state.daysDone, action, _o.activeDays[di]);
            return _o;

        case TOGGLE_ACTIVEDAYS:
            _o.activeDays = activeDays(state.activeDays, action);
            _o.daysDone = daysDone(state.daysDone, action, _o.activeDays[di]);
            return _o;

        case TOGGLE_UNIT:
            _o.unit = (_o.unit + 1) % 3;
            return _o;

        case SET_QUANT:
            _o.quant = action.quant;
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

        default:
            return state.map(t => task(t, action))
    }
}

const mainApp = combineReducers({
    tasks
})

export default mainApp
