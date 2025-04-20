import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, LoginRequest, RegisterRequest, LoginResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  constructor() {}

  // Registro de un nuevo usuario
  register(user: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user/register`, user);
  }

  // Inicio de sesión de un usuario existente
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/user/login`,
      credentials
    );
  }

  // Cerrar sesión del usuario
  logout(): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/user/logout`, {});
  }

  // Obtener información del usuario autenticado
  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/me`);
  }
}
