import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  router = inject(Router);
  _userService = inject(UserService);
  _tokenService = inject(TokenService);

  fullName: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  phone: string = '';
  address: string = '';
  errorMessage: string | null = null;

  constructor() {}

  ngOnInit() {
    if (this._tokenService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    // Validar los campos del formulario
    if (
      !this.fullName ||
      !this.email ||
      !this.password ||
      !this.passwordConfirmation
    ) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.passwordConfirmation) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    this.errorMessage = null;

    // Registrar al usuario
    this._userService
      .register({
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address,
      })
      .subscribe({
        next: (res) => {
          console.log('Registration successful:', res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.errorMessage =
            err.error.message || 'Registration failed. Please try again.';
        },
      });
  }
}
