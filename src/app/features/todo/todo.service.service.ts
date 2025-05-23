import { Injectable } from '@angular/core';
import { Task, TaskListType } from '../../shared/types/todo-list.types';

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

  public taskList: TaskListType = [
    {
      id: '123',
      title: 'tarea 1',
      dueDate: this.date,
    },
    {
      id: '234',
      title: 'tarea 2',
      dueDate: this.date,
    },
    {
      id: '546',
      title: 'tarea 3',
      dueDate: this.date,
    },
  ];


  // public taskList: TaskListType = [
  // ];

  public addExpirationDate() {
    this.taskList = this.taskList.map((task: Task, inx: number) => ({
      ...task,
      expired: this.calculateIsExpired(task),
    }));
  }

  public getTaskList() {
    this.addExpirationDate();
    return this.taskList;
  }

  public calculateIsExpired(task: Task,) {
    const newDate = new Date();
    return newDate > new Date(task.dueDate ?? '');
  }
}
