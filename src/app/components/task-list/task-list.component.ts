import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { TaskListType } from '../../shared/types/todo-list.types';
import { TaskComponent } from './task/task.component';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatChipsModule,
    TaskComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() taskList: TaskListType = [];
  @Output() check = new EventEmitter();

  public completeTask(taskId: string) {
    this.check.emit(taskId);
  }
}
