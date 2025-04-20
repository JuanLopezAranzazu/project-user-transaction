import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY: string = 'auth_token';

  constructor() {}

  // Guardar el token en el localStorage
  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Obtener el token del localStorage
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Eliminar el token del localStorage
  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Verificar si el usuario está autenticado
  public isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined && token !== '';
  }
}
