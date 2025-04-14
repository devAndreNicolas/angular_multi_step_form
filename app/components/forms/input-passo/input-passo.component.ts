import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicField } from '../../../models/dynamic-field.module';

@Component({
  selector: 'app-input-passo',
  imports: [CommonModule, FormsModule],
  templateUrl: './input-passo.component.html',
  styleUrl: './input-passo.component.css'
})
export class InputPassoComponent {
  @Input() fields: DynamicField[] = [];

  formData: any = {};

  constructor(private formService: FormService) {
    this.formData = {
      ...this.formService.formData,
      nomeCompleto: '',
      email: '',
      idade: null,
      genero: ''
    };
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.formService.updateData(this.formData);
      this.formService.nextStep();
    }
  }
}
