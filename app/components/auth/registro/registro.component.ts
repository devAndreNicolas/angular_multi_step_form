import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  template: `
 <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6">
            <div class="box">
              <h1 class="title is-3 has-text-centered has-text-primary">Registro</h1>
              <form [formGroup]="form" (ngSubmit)="onSubmit()">
                <!-- Name Field -->
                <div class="field">
                  <label class="label">Nome</label>
                  <div class="control">
                    <input 
                      class="input is-rounded" 
                      type="text" 
                      formControlName="name"
                      [class.is-danger]="form.get('name')?.invalid && form.get('name')?.touched"
                    >
                  </div>
                  <p class="help is-danger" *ngIf="form.get('name')?.errors?.['required'] && form.get('name')?.touched">
                    Nome é obrigatório
                  </p>
                </div>

                <!-- Email Field -->
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input 
                      class="input is-rounded" 
                      type="email" 
                      formControlName="email"
                      [class.is-danger]="form.get('email')?.invalid && form.get('email')?.touched"
                    >
                  </div>
                  <p class="help is-danger" *ngIf="form.get('email')?.errors?.['required'] && form.get('email')?.touched">
                    Email é obrigatório
                  </p>
                  <p class="help is-danger" *ngIf="form.get('email')?.errors?.['email'] && form.get('email')?.touched">
                    Email inválido
                  </p>
                </div>

                <!-- Password Field -->
                <div class="field">
                  <label class="label">Senha</label>
                  <div class="control">
                    <input 
                      class="input is-rounded" 
                      type="password" 
                      formControlName="password"
                      [class.is-danger]="form.get('password')?.invalid && form.get('password')?.touched"
                    >
                  </div>
                  <p class="help is-danger" *ngIf="form.get('password')?.errors?.['required'] && form.get('password')?.touched">
                    Senha é obrigatória
                  </p>
                </div>

                <!-- Submit Button -->
                <div class="field">
                  <div class="control">
                    <button 
                      class="button is-primary is-fullwidth is-rounded"
                      [class.is-loading]="loading"
                      [disabled]="form.invalid || loading"
                    >
                      Registrar
                    </button>
                  </div>
                </div>

                <p class="has-text-centered mt-4">Já tem uma conta? <a (click)="gotoLogin()">Faça login</a></p>

                <!-- Error Message -->
                <p class="help is-danger has-text-centered" *ngIf="error">
                  {{ error }}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegistroComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    const storedEmail = localStorage.getItem('TEMP_EMAIL');
    if (storedEmail) {
      this.form.patchValue({ email: storedEmail });
      localStorage.removeItem('TEMP_EMAIL');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.error = '';
  
      const email = this.form.get('email')?.value;
      const users = this.authService.getStoredUsers();
      const userExists = users.some(user => user.email === email);
  
      if (userExists) {
        // Redirecionar para login com o email preenchido
        localStorage.setItem('TEMP_EMAIL', email);
        this.loading = false;
        this.router.navigate(['/auth/login']);
        return;
      }
  
      this.authService.register(this.form.value).subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.error = err;
        }
      });
    }
  }

  gotoLogin() {
    this.router.navigate(['/auth/login']);
  }
}