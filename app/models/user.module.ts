export interface User {
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
  password: string;
  id: string;
  createdAt: Date;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}