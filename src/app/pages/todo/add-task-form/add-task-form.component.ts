import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],

  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskFormComponent {
  form: FormGroup;
  dialogRef = inject(MatDialogRef<AddTaskFormComponent>);
  fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      title: [''],
      dueDate: [''],
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
