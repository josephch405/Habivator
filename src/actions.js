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

export function toggleDaysdone(taskIndex, dayIndex) {
  return { type: TOGGLE_DAYSDONE, taskIndex, dayIndex }
}

export function toggleActivedays(taskIndex, dayIndex) {
  return { type: TOGGLE_ACTIVEDAYS, taskIndex, dayIndex }
}

export function toggleUnit(taskIndex) {
  return { type: TOGGLE_UNIT, taskIndex }
}

export function setQuant(taskIndex, quant) {
  return { type: SET_QUANT, taskIndex, quant }
}