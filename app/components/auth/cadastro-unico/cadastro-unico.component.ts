import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastro-unico',
  template: `
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6">
            <div class="box">
              <h1 class="title is-3 has-text-centered has-text-primary">Cadastro</h1>
              
              <form [formGroup]="form" (ngSubmit)="onSubmit()">
                <!-- Email Field -->
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left">
                    <input 
                      class="input is-rounded" 
                      type="email" 
                      formControlName="email"
                      [class.is-danger]="form.get('email')?.invalid && form.get('email')?.touched"
                      placeholder="Digite seu email"
                    >
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                  <p class="help is-danger" *ngIf="form.get('email')?.errors?.['required'] && form.get('email')?.touched">
                    Email é obrigatório
                  </p>
                  <p class="help is-danger" *ngIf="form.get('email')?.errors?.['email'] && form.get('email')?.touched">
                    Email inválido
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
                      Continuar
                    </button>
                  </div>
                </div>

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
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CadastroUnicoComponent implements OnInit {
  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Check for temporary email in localStorage
    const tempEmail = localStorage.getItem('TEMP_EMAIL');
    if (tempEmail) {
      this.form.patchValue({ email: tempEmail });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const email = this.form.get('email')?.value;

      // Get users from localStorage to check if email exists
      const users = this.getStoredUsers();
      const emailExists = users.some(user => user.email === email);

      // Store email temporarily
      localStorage.setItem('TEMP_EMAIL', email);

      // Simulate network delay
      setTimeout(() => {
        this.loading = false;
        
        if (emailExists) {
          console.log('Email exists, redirecting to login');
          this.router.navigate(['/auth/login']);
        } else {
          console.log('New email, redirecting to register');
          this.router.navigate(['/auth/registro']);
        }
      }, 500);
    }
  }

  private getStoredUsers(): any[] {
    const users = localStorage.getItem('USERS');
    return users ? JSON.parse(users) : [];
  }
}