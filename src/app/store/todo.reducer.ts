import { Action } from '@ngrx/store';
import { ActionTypes } from './todo.actions';
 
export const initialState = false;
 
export function counterReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.Create:
      return true;
 
    case ActionTypes.Reset:
      return false;
 
    default:
      return state;
  }
}