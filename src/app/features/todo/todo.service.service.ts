import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../core/store/app.state';
import { Task, TaskListType } from '../../shared/types/todo-list.types';
import { addTask, resetTasks } from '../../core/store/task-list/task.actions';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  public date = new Date('12/09/2027').toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: undefined,
    minute: undefined,
    second: undefined,
  });

  // public taskList: TaskListType = [
  //   {
  //     id: '123',
  //     title: 'tarea 1',
  //     dueDate: this.date,
  //   },
  //   {
  //     id: '234',
  //     title: 'tarea 2',
  //     dueDate: this.date,
  //   },
  //   {
  //     id: '546',
  //     title: 'tarea 3',
  //     dueDate: this.date,
  //   },
  // ];
  
  title = '';
  tasks$: Observable<Task[]>;

  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.select('taskList');
    this.tasks$.subscribe((tasks) => {
      console.log(tasks)
      this.taskList = tasks;
      this.addExpirationDate();
    });
  }

  public taskList: TaskListType = [];

  private addExpirationDate() {
    this.taskList = this.taskList.map((task: Task) => ({
      ...task,
      expired: this.calculateIsExpired(task),
    }));
  }

  public getTaskList() {
    // this.addExpirationDate();
    return this.taskList;
  }

  public addTask(task: Task) {
    // this.addExpirationDate();
    this.store.dispatch(addTask({task}))
    return this.taskList;
  }


  public resetTasks(taskList: Task[]) {
    // this.addExpirationDate();
    this.store.dispatch(resetTasks({taskList}))
    return this.taskList;
  }

  public calculateIsExpired(task: Task) {
    const newDate = new Date();
    return newDate > new Date(task.dueDate ?? '');
  }
}
