import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { TaskListType } from '../../shared/types/todo-list.types';
import { TaskComponent } from './task/task.component';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [TaskComponent],
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() taskList: TaskListType = [];
  @Output() check = new EventEmitter();

  public completeTask(taskId: string) {
    this.check.emit(taskId);
  }
}
