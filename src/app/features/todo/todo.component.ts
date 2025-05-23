import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { debounceTime, Observable } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TodoLayoutComponent } from '../../components/todo-layout/todo-layout.component';
import { AppState } from '../../core/store/app.state';
import { addTask, deleteTask } from '../../core/store/task-list/task.actions';
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
export class TodoComponent {
  public filteredTasks: TaskListType = [];
  public taskList: TaskListType = [];
  public searchValue: string = '';
  public searchControl = new FormControl('');
  tasks$: Observable<Task[]>;

  constructor(
    private todoServiceService: TodoServiceService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.tasks$ = this.store.select('taskList');
    this.tasks$.subscribe((tasks) => {
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
        const task: Task = {
          id: uid,
          title: result.title,
          dueDate: getFormattedValue(result.dueDate),
        };
        task.expired = this.todoServiceService.calculateIsExpired(task);
        this.store.dispatch(addTask({ task }));
        this.filteredTasks = [...this.taskList];
      }
    });
  }

  public onCheckedTask(id: string) {
    setTimeout(() => {
      const task = this.taskList.find((task) => task.id === id);
      if (task) {
        this.store.dispatch(deleteTask({ task }));
      }

      this.filteredTasks = [...this.taskList];
    }, 300);

    this.searchControl.setValue('');
  }
}
