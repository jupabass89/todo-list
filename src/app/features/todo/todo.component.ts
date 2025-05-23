import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TodoLayoutComponent } from '../../components/todo-layout/todo-layout.component';
import { Task, TaskListType } from '../../shared/types/todo-list.types';
import { getFormattedValue } from '../../shared/utils/todo.utils';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TodoServiceService } from './todo.service.service';

@Component({
  standalone: true,
  selector: 'app-todo',
  imports: [
    TaskListComponent,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    SearchBarComponent,
    TodoLayoutComponent,
  ],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  public filteredTasks: TaskListType = [];
  public taskList: TaskListType = [];
  public searchValue: string = '';
  public searchControl = new FormControl('');

  constructor(
    private todoServiceService: TodoServiceService,
    private dialog: MatDialog
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.filteredTasks = this.taskList.filter((task) =>
          task.title.includes(value ?? '')
        );
      });
  }

  ngOnInit(): void {
    this.taskList = this.todoServiceService.getTaskList();
    this.filteredTasks = [...this.taskList];
  }

  public openDialog() {
    const dialogRef = this.dialog.open(AddTaskFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const uid = crypto.randomUUID();
        const payload: Task = {
          id: uid,
          title: result.title,
          dueDate: getFormattedValue(result.dueDate),
        };
        payload.expired = this.todoServiceService.calculateIsExpired(payload);
        this.taskList.push(payload);
        this.filteredTasks = [...this.taskList];
      }
    });
  }

  public onCheckedTask(id: string) {
    setTimeout(() => {
      this.taskList = this.taskList.filter((task) => task.id !== id);
      this.filteredTasks = [...this.taskList];
    }, 300);

    this.searchControl.setValue('');
  }
}
