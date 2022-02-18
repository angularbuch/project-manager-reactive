import {Task} from "../../models/model-interfaces";

export const LOAD = 'LOAD';
export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const REMOVE = 'REMOVE';

export type ActionType = typeof  LOAD | typeof  ADD | typeof  EDIT | typeof  REMOVE;

export interface Action {
  type: ActionType;
  data: any;
}
