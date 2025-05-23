import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../core/store/app.state';

export function localStorageReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    const nextTaskListState = reducer(state, action);
    if (action.type !== INIT && action.type !== UPDATE) {
      localStorage.setItem('taskList', JSON.stringify(nextTaskListState));
    }
    return nextTaskListState;
  };
}

export const getInitialState = (): AppState => {
  const taskList = localStorage.getItem('taskList');
  return taskList ? JSON.parse(taskList) : { taskList: [] };
};
