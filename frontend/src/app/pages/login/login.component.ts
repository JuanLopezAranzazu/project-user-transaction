import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  _userService = inject(UserService);
  _tokenService = inject(TokenService);

  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor() {}

  ngOnInit() {
    if (this._tokenService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    // Validar los campos del formulario
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.errorMessage = null;

    // Iniciar sesión del usuario
    this._userService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          this._tokenService.saveToken(res.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage =
            err.error.message || 'Login failed. Please try again.';
        },
      });
  }
}
