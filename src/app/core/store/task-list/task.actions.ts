import { createAction, props } from '@ngrx/store';
import { Task } from '../../../shared/types/todo-list.types';

export const addTask = createAction('[Task] Add', props<{ task: Task }>());
export const deleteTask = createAction(
  '[Task] Delete',
  props<{ task: Task }>()
);
