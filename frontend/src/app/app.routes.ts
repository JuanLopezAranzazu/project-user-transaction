import { Routes } from '@angular/router';
import { ListTransactionComponent } from './pages/list-transaction/list-transaction.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { EditTransactionComponent } from './pages/edit-transaction/edit-transaction.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MissingComponent } from './pages/missing/missing.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListTransactionComponent,
        canActivate: [authGuard],
      },
      {
        path: 'add-transaction',
        component: AddTransactionComponent,
        canActivate: [authGuard],
      },
      {
        path: 'edit-transaction/:id',
        component: EditTransactionComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: MissingComponent },
];
