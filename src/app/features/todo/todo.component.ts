import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TodoLayoutComponent } from '../../components/todo-layout/todo-layout.component';
import { DateService } from '../../shared/date.service';
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
export class TodoComponent implements OnInit {
  public filteredTasks: TaskListType = [];
  public searchControl = new FormControl('');

  private readonly destroy$ = new Subject<void>();
  private taskList: TaskListType = [];

  constructor(
    private readonly todoServiceService: TodoServiceService,
    private readonly dialog: MatDialog,
    private readonly dateService: DateService
  ) {}

  ngOnInit(): void {
    this.todoServiceService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.taskList = tasks;
        this.filteredTasks = tasks;
      });

    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(400))
      .subscribe((value) => {
        this.filteredTasks = this.taskList.filter((task) =>
          task.title.includes(value ?? '')
        );
      });
  }

  public openDialog() {
    this.dialog
      .open(AddTaskFormComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: Task) => {
        this.onAddTask(result);
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

  private onAddTask(task: Task) {
    const uid = crypto.randomUUID();
    const dueDate = this.dateService.getFormattedDate(task.dueDate);
    const newTask: Task = {
      id: uid,
      title: task.title,
      dueDate,
      expired: this.dateService.calculateIsExpired(dueDate),
    };
    this.todoServiceService.addTask(newTask);
    this.filteredTasks = [...this.taskList];
  }
}
