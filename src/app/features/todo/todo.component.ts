import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TodoLayoutComponent } from '../../components/todo-layout/todo-layout.component';
import { Task, TaskListType } from '../../shared/types/todo-list.types';
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
export class TodoComponent {
  public filteredTasks: TaskListType = [];
  public taskList: TaskListType = [];
  public searchValue: string = '';
  public searchControl = new FormControl('');

  constructor(
    private readonly todoServiceService: TodoServiceService,
    private readonly dialog: MatDialog
  ) {
    this.todoServiceService.getTasks().subscribe((tasks) => {
      this.taskList = tasks;
      this.filteredTasks = tasks;
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.filteredTasks = this.taskList.filter((task) =>
          task.title.includes(value ?? '')
        );
      });
  }

  public openDialog() {
    const dialogRef = this.dialog.open(AddTaskFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const uid = crypto.randomUUID();
        const dueDate = this.todoServiceService.getFormattedValue(
          result.dueDate
        );
        const task: Task = {
          id: uid,
          title: result.title,
          dueDate,
          expired: this.todoServiceService.calculateIsExpired(dueDate),
        };
        this.todoServiceService.addTask(task);
        this.filteredTasks = [...this.taskList];
      }
    });
  }

  public onCheckedTask(id: string) {
    setTimeout(() => {
      const task = this.taskList.find((task) => task.id === id);
      if (task) {
        this.todoServiceService.deleteTask(task);
      }
      this.filteredTasks = [...this.taskList];
    }, 300);
    this.searchControl.setValue('');
  }
}
