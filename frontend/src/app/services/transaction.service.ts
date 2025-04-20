import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransactionRequest } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);

  constructor() {}

  // Obtener todas las transacciones del usuario
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/transaction`);
  }

  // Obtener transacciones por ID
  getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${environment.apiUrl}/transaction/${id}`
    );
  }

  // Crear una transacción
  createTransaction(transaction: TransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${environment.apiUrl}/transaction`,
      transaction
    );
  }

  // Actualizar una transacción
  updateTransaction(
    id: number,
    transaction: TransactionRequest
  ): Observable<Transaction> {
    return this.http.put<Transaction>(
      `${environment.apiUrl}/transaction/${id}`,
      transaction
    );
  }

  // Eliminar una transacción
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/transaction/${id}`);
  }
}
