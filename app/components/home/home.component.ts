import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <div class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="box has-text-centered">
            <h1 class="title">
              Bem-vindo, {{ (auth$ | async)?.user?.name || 'Usuário' }}!
            </h1>
            <div class="buttons is-centered mt-5">
              <button class="button is-primary" (click)="navigateToForm()">
                Ir para o formulário
              </button>
              <button class="button is-danger" (click)="logout()">
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent {
  auth$: Observable<any>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.auth$ = this.authService.auth$;
  }

  navigateToForm() {
    this.router.navigate(['/form']);
  }

  logout() {
    this.authService.logout();
  }
}