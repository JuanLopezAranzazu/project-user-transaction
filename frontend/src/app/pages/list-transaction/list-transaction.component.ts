import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../types';

@Component({
  selector: 'app-list-transaction',
  imports: [CommonModule],
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.css',
})
export class ListTransactionComponent implements OnInit {
  _transactionService = inject(TransactionService);
  router = inject(Router);

  transactions: Transaction[] = [];
  errorMessage: string | null = null;

  ngOnInit() {
    this.getTransactions();
  }

  // Obtener todas las transacciones del usuario
  getTransactions() {
    this._transactionService.getTransactions().subscribe({
      next: (res) => {
        console.log('Transactions fetched successfully:', res);
        this.transactions = res;
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
        this.errorMessage =
          err.error.message ||
          'Failed to fetch transactions. Please try again.';
      },
    });
  }

  // Navegar a la página de creación de transacciones
  createTransaction() {
    this.router.navigate(['/add-transaction']);
  }

  // Navegar a la página de edición de una transacción
  editTransaction(transactionId: number) {
    this.router.navigate(['/edit-transaction', transactionId]);
  }

  // Eliminar una transacción por su ID
  deleteTransaction(transactionId: number) {
    this._transactionService.deleteTransaction(transactionId).subscribe({
      next: (res) => {
        console.log('Transaction deleted successfully:', res);
        this.getTransactions();
      },
      error: (err) => {
        console.error('Error deleting transaction:', err);
        this.errorMessage =
          err.error.message ||
          'Failed to delete transaction. Please try again.';
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
