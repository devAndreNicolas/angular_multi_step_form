import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6">
            <div class="box">
              <h1 class="title is-3 has-text-centered has-text-primary">Login</h1>
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <!-- Email -->
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input 
                      class="input is-rounded" 
                      type="email" 
                      formControlName="email"
                      [class.is-danger]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                    >
                  </div>
                  <p class="help is-danger" *ngIf="loginForm.get('email')?.errors?.['required'] && loginForm.get('email')?.touched">
                    Email é obrigatório
                  </p>
                  <p class="help is-danger" *ngIf="loginForm.get('email')?.errors?.['email'] && loginForm.get('email')?.touched">
                    Email inválido
                  </p>
                </div>

                <!-- Password -->
                <div class="field">
                  <label class="label">Senha</label>
                  <div class="control">
                    <input 
                      class="input is-rounded" 
                      type="password" 
                      formControlName="password"
                      [class.is-danger]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                    >
                  </div>
                  <p class="help is-danger" *ngIf="loginForm.get('password')?.errors?.['required'] && loginForm.get('password')?.touched">
                    Senha é obrigatória
                  </p>
                </div>

                <!-- Submit Button -->
                <div class="field">
                  <div class="control">
                    <button 
                      class="button is-primary is-fullwidth is-rounded"
                      [class.is-loading]="loading"
                      [disabled]="loginForm.invalid || loading"
                    >
                      Entrar
                    </button>
                  </div>
                </div>

                <p class="has-text-centered mt-4">Não tem uma conta? <a (click)="goToRegister()">Faça seu registro</a></p>

                <!-- Error Message -->
                <p class="help is-danger has-text-centered" *ngIf="errorMessage">
                  {{ errorMessage }}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    const tempEmail = this.authService.tempEmail;
    if (tempEmail) {
      this.loginForm.patchValue({ email: tempEmail });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;
  
      const users = this.authService.getStoredUsers();
      const userExists = users.some(user => user.email === email);
  
      if (!userExists) {
        // Redirecionar para registro com o email preenchido
        localStorage.setItem('TEMP_EMAIL', email);
        this.loading = false;
        this.router.navigate(['/auth/registro']);
        return;
      }
  
      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.message || 'Erro ao fazer login';
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/registro']);
  }
}