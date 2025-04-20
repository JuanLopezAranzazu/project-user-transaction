// Esquema para transacciones
export interface Transaction {
  id?: number;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  userId: number;
  createdAt?: string;
}

// Esquema para usuarios
export interface User {
  id?: number;
  fullName?: string;
  email: string;
  passwordHash: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

// Esquema para inicios de sesión
export interface LoginRequest {
  email: string;
  password: string;
}

// Esquema para el registro de usuarios
export interface RegisterRequest {
  fullName?: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

// Esquema para la respuesta de inicio de sesión
export interface LoginResponse {
  token: string;
}
