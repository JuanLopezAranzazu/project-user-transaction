import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);

  constructor() {}

  // Obtener todas las transacciones del usuario
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/transactions`);
  }

  // Obtener transacciones por ID
  getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${environment.apiUrl}/transactions/${id}`
    );
  }

  // Crear una transacción
  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${environment.apiUrl}/transactions`,
      transaction
    );
  }

  // Actualizar una transacción
  updateTransaction(
    id: number,
    transaction: Transaction
  ): Observable<Transaction> {
    return this.http.put<Transaction>(
      `${environment.apiUrl}/transactions/${id}`,
      transaction
    );
  }

  // Eliminar una transacción
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/transactions/${id}`);
  }
}
