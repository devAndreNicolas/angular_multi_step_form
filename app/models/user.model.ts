export interface User {
  id: string;
  email: string;
  password: string; // Usado apenas para login/registro
  name: string;
  createdAt: Date;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}