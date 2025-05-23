import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

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
})
export class TaskComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() dueDate?: string;
  @Input() isExpired?: boolean = false;
  @Output() toogleCheck = new EventEmitter<string>();

  checked: boolean = false;

  public onCheck() {
    this.checked = false;
    // setTimeout(() => {
    this.toogleCheck.emit(this.id);
    // }, 1000);
  }
}
