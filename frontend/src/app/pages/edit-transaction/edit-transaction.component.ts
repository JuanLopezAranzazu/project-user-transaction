import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { TransactionRequest } from '../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-transaction',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.css',
})
export class EditTransactionComponent implements OnInit {
  _transactionService = inject(TransactionService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  transaction: TransactionRequest | null = null;
  id!: number;
  errorMessage: string | null = null;

  ngOnInit() {
    // Recuperar el ID de la transacción de la URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.id)) {
      this.errorMessage = 'Invalid transaction ID.';
      return;
    }
    // Obtener la transacción por su ID
    this.getTransactionById(this.id);
  }

  // Obtener una transacción por su ID
  getTransactionById(transactionId: number) {
    this._transactionService.getTransaction(transactionId).subscribe({
      next: (res) => {
        console.log('Transaction fetched successfully:', res);
        this.transaction = { ...res };
      },
      error: (err) => {
        console.error('Error fetching transaction:', err);
        this.errorMessage =
          err.error.message || 'Failed to fetch transaction. Please try again.';
      },
    });
  }

  // Actualizar una transacción por su ID
  updateTransaction(transactionId: number, transaction: TransactionRequest) {
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

    this._transactionService
      .updateTransaction(transactionId, transaction)
      .subscribe({
        next: (res) => {
          console.log('Transaction updated successfully:', res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating transaction:', err);
          this.errorMessage =
            err.error.message ||
            'Failed to update transaction. Please try again.';
        },
      });
  }

  // Cancelar la edición y volver a la página principal
  cancel() {
    this.router.navigate(['/']);
  }
}
