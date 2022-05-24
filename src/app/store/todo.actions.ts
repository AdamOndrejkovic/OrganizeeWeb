import { Action } from '@ngrx/store';
 
export enum ActionTypes {
  Create = '[Todo Component] Create',
  Reset = '[Counter Component] Reset',
}
 
export class Create implements Action {
  readonly type = ActionTypes.Create;
}
 
 
export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}