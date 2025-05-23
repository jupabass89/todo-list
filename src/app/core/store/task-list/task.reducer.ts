import { createReducer, on } from '@ngrx/store';
import { Task } from '../../../shared/types/todo-list.types';
import { addTask, deleteTask, resetTasks } from './task.actions';

export const initialState: Task[] = [];

export const taskListReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => [...state, task]),
  on(deleteTask, (state, { task }) => [
    ...state.filter((ta) => task.id !== ta.id),
  ]),
  on(resetTasks, (state, { taskList }) => [...taskList])
);
