import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'USERS';
  private readonly TOKEN_KEY = 'AUTH_TOKEN';
  private readonly TEMP_EMAIL_KEY = 'TEMP_EMAIL';
  private readonly LAST_CLEANUP_KEY = 'LAST_CLEANUP';
  private readonly ONE_DAY = 24 * 60 * 60 * 1000; // 1 dia em milissegundos

  private authSubject = new BehaviorSubject<AuthResponse | null>(null);

  constructor(private router: Router) {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
    }
    this.loadStoredAuth();
  }

  get auth$(): Observable<AuthResponse | null> {
    return this.authSubject.asObservable();
  }

  get currentUser(): Omit<User, 'password'> | null {
    return this.authSubject.value?.user || null;
  }

  get isAuthenticated(): boolean {
    return !!this.authSubject.value?.token;
  }

  get tempEmail(): string | null {
    return localStorage.getItem(this.TEMP_EMAIL_KEY);
  }

    private clearAllData(): void {
      localStorage.removeItem(this.USERS_KEY);
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.TEMP_EMAIL_KEY);
      this.authSubject.next(null);
    }

    private checkAndCleanup(): void {
      const lastCleanup = localStorage.getItem(this.LAST_CLEANUP_KEY);
      const now = new Date().getTime();
  
      if (!lastCleanup || (now - Number(lastCleanup)) > this.ONE_DAY) {
        // Limpa todos os dados
        this.clearAllData();
        
        // Atualiza timestamp da última limpeza
        localStorage.setItem(this.LAST_CLEANUP_KEY, now.toString());
        console.log('Limpeza automática realizada em:', new Date().toLocaleString());
      }
    }

    private initAutoCleanup(): void {
    this.checkAndCleanup();

    setInterval(() => {
      this.checkAndCleanup();
    }, this.ONE_DAY);
  }

  debugCleanup(): void {
    const lastCleanup = localStorage.getItem(this.LAST_CLEANUP_KEY);
    if (lastCleanup) {
      const nextCleanup = new Date(Number(lastCleanup) + this.ONE_DAY);
      console.log('Próxima limpeza programada para:', nextCleanup.toLocaleString());
    }
  }

  register(userData: Partial<User>): Observable<AuthResponse> {
    console.log('Registering user:', { ...userData, password: '***' });
    
    const users = this.getStoredUsers();
    
    if (!userData.email || !userData.password) {
      return throwError(() => new Error('Email e senha são obrigatórios'));
    }

    if (users.some(u => u.email === userData.email)) {
      return throwError(() => new Error('Email já cadastrado'));
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: userData.email,
      password: userData.password,
      name: userData.name || '',
      createdAt: new Date()
    };

    users.push(newUser);
    this.saveStoredUsers(users);

    console.log('User registered successfully');

    return this.login({ 
      email: userData.email, 
      password: userData.password 
    });
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    console.log('Attempting login for:', credentials.email);
    
    const users = this.getStoredUsers();
    const user = users.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );

    if (!user) {
      console.log('Invalid credentials');
      return throwError(() => new Error('Credenciais inválidas'));
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = this.generateToken(userWithoutPassword);
    const authResponse: AuthResponse = {
      token,
      user: userWithoutPassword
    };

    this.authSubject.next(authResponse);
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.removeItem(this.TEMP_EMAIL_KEY);

    return of(authResponse).pipe(
      delay(500),
      tap(() => this.router.navigate(['/home']))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.authSubject.next(null);
    this.router.navigate(['/auth/cadastro']);
  }

  private loadStoredAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      try {
        const user = JSON.parse(atob(token));
        this.authSubject.next({ token, user });
      } catch (error) {
        console.error('Error loading stored auth:', error);
        localStorage.removeItem(this.TOKEN_KEY);
      }
    }
  }

  getStoredUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveStoredUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  private generateToken(user: Omit<User, 'password'>): string {
    return btoa(JSON.stringify(user));
  }
}