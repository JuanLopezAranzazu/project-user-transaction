import { Routes } from '@angular/router';
import { ListTransactionComponent } from './pages/list-transaction/list-transaction.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { EditTransactionComponent } from './pages/edit-transaction/edit-transaction.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MissingComponent } from './pages/missing/missing.component';

export const routes: Routes = [
  { path: '', component: ListTransactionComponent },
  { path: 'add-transaction', component: AddTransactionComponent },
  { path: 'edit-transaction/:id', component: EditTransactionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: MissingComponent },
];
