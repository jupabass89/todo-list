import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime } from 'rxjs';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskListType } from '../../shared/types/todo-list.types';

@Component({
  standalone: true,
  selector: 'app-todo',
  imports: [
    TaskListComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  public filteredTasks: TaskListType = [];
  public taskList: TaskListType = [];
  public isSearchBarShown = false;
  public searchValue: string = '';

  public searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(400)) // waits 300ms after last change
      .subscribe((value) => {
        console.log('Debounced value:', value);
        this.filteredTasks = this.taskList.filter((task) =>
          task.title.includes(value ?? '')
        );
      });
  }

  ngOnInit(): void {
    console.log('init');
    this.taskList = [
      {
        id: '123',
        title: 'tarea 1',
        dueDate: new Date('12/09/1989').toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: undefined,
          minute: undefined,
          second: undefined,
        }),
      },
      {
        id: '234',
        title: 'tarea 2',
        dueDate: new Date('12/09/1989').toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: undefined,
          minute: undefined,
          second: undefined,
        }),
      },
      {
        id: '546',
        title: 'tarea 3',
        dueDate: new Date('12/09/2026').toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: undefined,
          minute: undefined,
          second: undefined,
        }),
      },
    ];
    this.filteredTasks = [...this.taskList];
  }

  public onBlur() {
    setTimeout(() => {
      this.filteredTasks = [...this.taskList];
      this.searchControl.setValue('');
    }, 400);
  }

  public onCheckedTask(id: string) {
    setTimeout(() => {
      this.taskList = this.taskList.filter((task) => task.id !== id);
      this.filteredTasks = [...this.taskList];
    }, 300);

    this.searchControl.setValue('');
  }
}
