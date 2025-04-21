import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../types';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  _userService = inject(UserService);

  user: User | null = null;
  errorMessage: string | null = null;

  ngOnInit() {
    this.getUserProfile();
  }

  // Obtener el perfil del usuario
  getUserProfile() {
    this._userService.getUser().subscribe({
      next: (res) => {
        console.log('User profile fetched successfully:', res);
        this.user = res;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.errorMessage =
          err.error.message ||
          'Failed to fetch user profile. Please try again.';
      },
    });
  }

  // Formatear la fecha de la transacción
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
}
