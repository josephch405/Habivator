import { combineReducers } from 'redux'
import { ADD_TASK, TOGGLE_DAYSDONE, TOGGLE_ACTIVEDAYS, TOGGLE_UNIT, SET_QUANT } from './actions'

const blankTask = {
  name: "New Task",
  id: 0,
  karma: 0,
  activeDays: [true, true, true, true,true,true,true],
  daysDone: [2,2,2,2,2,2,2],                       //0: b, 1: w, 2: r, 3: g
  quantity: 0,
  unit: 0,
  toss: false
}

function nextId(tasks){
  var i = 0;
  while (this.tasks[i])
    i ++
  return i;
}


const task = (state = {}, action) => {
  if (state.id !== action.id) {
    return state
  }

  var newObj = Object.assign({}, state);
  var dd = newObj.daysDone;
  var ad = newObj.activeDays;
  var di = action.dayIndex;

  switch (action.type) {
    case TOGGLE_DAYSDONE:
      //if the day is toggleable, toggle between red and green
      if(ad[di])
        dd[di] = (dd[di] == 2) ? 3 : 2;
      //otherwise, return black
      else 
        dd[di] = 0;
      return newObj;

    case TOGGLE_ACTIVEDAYS:
      ad[di] = !ad[di];
      dd = ad[di] ? 2 : 0;
      return newObj;

    case TOGGLE_UNIT:
      newObj.unit = (newObj.unit + 1) % 3;
      return newObj;

    case SET_QUANT:
      newObj.quant = action.quant;
      return newObj

    default:
      return state
  }
}

const tasks = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      var _t = blankTask;
      _t.id = nextId(state);
      return [...state,_t];

    default:
      return state.map(t => {
        task(t, action)
      })
  }
}


const tasksApp = combineReducers({
  tasks
})

export default tasksApp