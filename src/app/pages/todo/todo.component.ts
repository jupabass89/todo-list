import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { Task, TaskListType } from '../../shared/types/todo-list.types';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TodoServiceService } from './todo.service.service';

const timeSettings = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};
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
    MatDialogModule,
    SearchBarComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
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
  openDialog() {
    const dialogRef = this.dialog.open(AddTaskFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const uid = crypto.randomUUID();
        const payload: Task = {
          id: uid,
          title: result.title,
          dueDate: this.getFormattedValue(result.dueDate),
        };
        payload.expired = this.todoServiceService.calculateIsExpired(payload);
        this.taskList.push(payload);
        this.filteredTasks = [...this.taskList];
      }
    });
  }

  getFormattedValue(date: string) {
    return new Date(date).toLocaleString('en-US', timeSettings as any);
  }

  ngOnInit(): void {
    this.taskList = this.todoServiceService.getTaskList();
    this.filteredTasks = [...this.taskList];
  }

  public onCheckedTask(id: string) {
    setTimeout(() => {
      this.taskList = this.taskList.filter((task) => task.id !== id);
      this.filteredTasks = [...this.taskList];
    }, 300);

    this.searchControl.setValue('');
  }
}
