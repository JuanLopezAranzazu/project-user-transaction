import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

  _tokenService = inject(TokenService);
  _userService = inject(UserService);
  router = inject(Router);

  constructor() {}

  // Cerrar sesión y redirigir a la página de inicio de sesión
  logout() {
    this._tokenService.removeToken();
    this._userService.logout();
    this.router.navigate(['/login']);
  }
}
