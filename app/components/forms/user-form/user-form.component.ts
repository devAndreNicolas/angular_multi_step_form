// user-form.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserTest } from '../../../models/user-test.module';
import { PersonalInfoFormComponent } from '../personal-info/personal-info.component';
import { AddressFormComponent } from '../address/address.component';
import { AddressForm, UserForm } from '../../../models/user-form-types.module';

@Component({
  selector: 'app-user-form',
  template: `
<section class="section">
  <div class="container">
    <div *ngIf="!isConfirmed; else confirmation">
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="box">
        <app-personal-info-form [form]="userForm" label="Nome" label2="Email" label3="Idade"></app-personal-info-form>
        <app-address [form]="userForm.controls.address" label="Rua" label2="Cidade"></app-address>
        <button type="submit" class="button is-primary" [disabled]="userForm.invalid">Enviar</button>
      </form>
    </div>

    <ng-template #confirmation>
      <div class="box has-text-centered">
        <h2 class="title is-4">Confirmação de Dados</h2>
        <p><strong>Nome:</strong> {{ userForm.value.name }}</p>
        <p><strong>Email:</strong> {{ userForm.value.email }}</p>
        <p><strong>Idade:</strong> {{ userForm.value.age }}</p>
        <p><strong>Rua:</strong> {{ userForm.value.address?.street }}</p>
        <p><strong>Cidade:</strong> {{ userForm.value.address?.city }}</p>

        <button class="button is-link mt-4" (click)="onEdit()">Editar</button>
        <button class="button is-success mt-4 ml-3" (click)="finalize()">Confirmar</button>
      </div>
    </ng-template>
  </div>
</section>
  `,
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, PersonalInfoFormComponent, AddressFormComponent],
})
export class UserFormComponent {
  isConfirmed = false; 
  userForm: FormGroup<UserForm>;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group<UserForm>({
      name: this.fb.control('', { nonNullable: true, validators: Validators.required }),
      email: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      age: this.fb.control(0, { 
        nonNullable: true, 
        validators: [Validators.required, Validators.min(0)] 
      }),
      address: this.fb.group<AddressForm>({
        street: this.fb.control('', { nonNullable: true, validators: Validators.required }),
        city: this.fb.control('', { nonNullable: true, validators: Validators.required }),
      }),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Aqui pode salvar os dados, chamar API, etc.
      console.log('Form submitted:', this.userForm.value);
      this.isConfirmed = true;  // muda o estado para mostrar confirmação
    }
  }

  onEdit() {
    this.isConfirmed = false; // voltar para o formulário para editar
  }

  finalize() {
    // Aqui pode enviar para backend, mostrar mensagem, etc.
    alert('Formulário confirmado e enviado com sucesso!');
    this.userForm.reset();
    this.isConfirmed = false;
    
  }
}