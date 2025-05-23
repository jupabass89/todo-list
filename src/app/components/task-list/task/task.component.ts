import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../shared/types/todo-list.types';

@Component({
  standalone: true,
  selector: 'app-task',
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() toogleCheck = new EventEmitter<string>();

  checked: boolean = false;

  public onCheck() {
    this.checked = false;
    this.toogleCheck.emit(this.task.id);
  }
}
