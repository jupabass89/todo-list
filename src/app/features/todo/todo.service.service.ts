import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../core/store/app.state';
import { addTask, deleteTask } from '../../core/store/task-list/task.actions';
import { DateService } from '../../shared/date.service';
import { Task, TaskListType } from '../../shared/types/todo-list.types';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  public taskList: TaskListType = [];
  public tasks$: Observable<Task[]>;
  public title = '';

  constructor(
    private readonly store: Store<AppState>,
    private readonly dateService: DateService
  ) {
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
      expired: this.dateService.calculateIsExpired(task.dueDate),
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
}
