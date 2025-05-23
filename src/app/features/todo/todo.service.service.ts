import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../core/store/app.state';
import {
  addTask,
  deleteTask,
  resetTasks,
} from '../../core/store/task-list/task.actions';
import { Task, TaskListType } from '../../shared/types/todo-list.types';

const TIME_SETTINGS = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  public taskList: TaskListType = [];
  public tasks$: Observable<Task[]>;
  public title = '';

  constructor(private readonly store: Store<AppState>) {
    this.tasks$ = this.store.select('taskList');
    this.tasks$.subscribe((tasks) => {
      this.taskList = tasks;
      this.addExpirationDate();
    });
  }

  public getTasks() {
    return this.tasks$;
  }

  private addExpirationDate() {
    this.taskList = this.taskList.map((task: Task) => ({
      ...task,
      expired: this.calculateIsExpired(task.dueDate),
    }));
  }

  public getTaskList() {
    return this.taskList;
  }

  public addTask(task: Task) {
    this.store.dispatch(addTask({ task }));
  }

  public deleteTask(task: Task) {
    this.store.dispatch(deleteTask({ task }));
  }

  // public resetTasks(taskList: Task[]) {
  //   this.store.dispatch(resetTasks({ taskList }));
  //   return this.taskList;
  // }

  public calculateIsExpired(date?: string) {
    const newDate = new Date();
    return newDate > new Date(date ?? '');
  }

  public getFormattedValue(date: string) {
    return new Date(date).toLocaleString('en-US', TIME_SETTINGS as any);
  }
}
