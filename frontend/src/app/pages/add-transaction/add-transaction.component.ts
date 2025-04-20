import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { TransactionRequest } from '../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-transaction',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css',
})
export class AddTransactionComponent {
  _transactionService = inject(TransactionService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  transaction: TransactionRequest = {
    description: '',
    amount: 0,
    type: 'income',
  };
  errorMessage: string | null = null;

  // Crear una nueva transacción
  createTransaction(transaction: TransactionRequest) {
     // Validar la transacción antes de enviarla
     if (
      !transaction ||
      !transaction.description ||
      !transaction.amount ||
      !transaction.type
    ) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    // Limpiar el mensaje de error
    this.errorMessage = null;

    this._transactionService.createTransaction(transaction).subscribe({
      next: (res) => {
        console.log('Transaction created successfully:', res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error creating transaction:', err);
        this.errorMessage =
          err.error.message ||
          'Failed to create transaction. Please try again.';
      },
    });
  }

  // Cancelar la creación de una transacción y redirigir a la página principal
  cancel() {
    this.router.navigate(['/']);
  }
}
