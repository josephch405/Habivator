export const ADD_TASK = '1'
export const REMOVE_TASK = '2'

export const TOGGLE_DAYSDONE = '3'
export const TOGGLE_ACTIVEDAYS = '4'
export const TOGGLE_UNIT = '5'

export const SET_QUANT = '6'
export const SET_NAME = '7'

export const PRUNE = '8'
export const SET_TIME = '9'

export const LOAD = '10'

export const SET_NOTIF_INTERV = '11'
export const WIPE_POPUP = '12'

/*
 * action creators
 */

export function addTask() {
  return { type: ADD_TASK }
}

export function removeTask(taskId) {
  return { type: REMOVE_TASK, taskId }
}

export function toggleDaysDone(taskId, dayIndex) {
  return { type: TOGGLE_DAYSDONE, taskId, dayIndex }
}

export function toggleActiveDays(taskId, dayIndex) {
  return { type: TOGGLE_ACTIVEDAYS, taskId, dayIndex }
}

export function toggleUnit(taskId) {
  return { type: TOGGLE_UNIT, taskId }
}

export function setQuant(taskId, quant) {
  return { type: SET_QUANT, taskId, quant }
}

export function setName(taskId, name){
	return {type: SET_NAME, taskId, name}
}

export function setTime(time){
	return {type: SET_TIME, time}
}

export function load(_state){
	return {type: LOAD, _state};
}

export function setNotifInterv(_state, target){
	return {type: SET_NOTIF_INTERV, _state, target};
}

export function wipePopup(time){
	return {type: WIPE_POPUP, time};
}