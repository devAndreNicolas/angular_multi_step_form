import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserForm } from '../../../models/user-form-types.module';

@Component({
  selector: 'app-personal-info-form',
  template: `
    <div class="field" [formGroup]="form">
      <label class="label">{{ label }}</label>
      <div class="control">
        <input class="input" type="text" formControlName="name" />
      </div>

      <label class="label">{{ label2 }}</label>
      <div class="control">
        <input class="input" type="email" formControlName="email" />
      </div>

      <label class="label">{{ label3 }}</label>
      <div class="control">
        <input class="input" type="number" formControlName="age" min="0" />
      </div>
    </div>
  `,
  standalone: true,
  styleUrls: ['./personal-info.component.css'],
  imports: [ReactiveFormsModule],
})
export class PersonalInfoFormComponent {
  @Input() form!: FormGroup<UserForm>;
  @Input() label!: string;
  @Input() label2!: string;
  @Input() label3!: string;
}