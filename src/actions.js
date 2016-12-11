export const ADD_TASK = 'ADD_TASK'
export const TOGGLE_DAYSDONE = 'TOGGLE_DAYSDONE'
export const TOGGLE_ACTIVEDAYS = 'TOGGLE_ACTIVEDAYS'
export const TOGGLE_UNIT = 'TOGGLE_UNIT'
export const SET_QUANT = 'SET_QUANT'

/*
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
*/

/*
 * action creators
 */

export function addTask() {
  return { type: ADD_TASK }
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