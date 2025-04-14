import { Component } from '@angular/core';
import { MultiStepFormComponent } from "../multi-step-form/multi-step-form.component";
import { DynamicField } from '../../../models/dynamic-field.module';

@Component({
  selector: 'app-form-teste',
  imports: [MultiStepFormComponent],
  templateUrl: './form-teste.component.html',
})
export class FormTesteComponent {
  fields: DynamicField[] = [
    { label: 'Nome Completo', name: 'nomeCompleto', type: 'text', required: true },
    { label: 'Endereço', name: 'endereco', type: 'text', required: true },
    { label: 'Idade', name: 'idade', type: 'number', required: true },
    { label: 'Gênero', name: 'genero', type: 'select', required: true, options: ['Masculino', 'Feminino', 'Outro'] },
    { label: 'Email', name: 'email', type: 'email', required: true }
  ];
}