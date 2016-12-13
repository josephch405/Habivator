export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'

export const TOGGLE_DAYSDONE = 'TOGGLE_DAYSDONE'
export const TOGGLE_ACTIVEDAYS = 'TOGGLE_ACTIVEDAYS'
export const TOGGLE_UNIT = 'TOGGLE_UNIT'

export const SET_QUANT = 'SET_QUANT'
export const SET_NAME = 'SET_NAME'

export const PRUNE = 'PRUNE'
export const SET_TIME = 'SET_TIME'

export const LOAD = 'LOAD'

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