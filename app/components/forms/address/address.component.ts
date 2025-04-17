// address.component.ts
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddressForm } from '../../../models/user-form-types.module';

@Component({
  selector: 'app-address',
  template: `
    <div class="field" [formGroup]="form">
      <label class="label">{{label}}</label>
      <div class="control">
        <input class="input" type="text" formControlName="street" />
      </div>

      <label class="label">{{label2}}</label>
      <div class="control">
        <input class="input" type="text" formControlName="city" />
      </div>
    </div>
  `,
  styleUrls: ['./address.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddressFormComponent {
  @Input() form!: FormGroup<AddressForm>;
  @Input() label!: string;
  @Input() label2!: string;
}