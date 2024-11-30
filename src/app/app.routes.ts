import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { MainComponent } from './pages/main/main.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    canActivate: [AuthGuard],
    path: 'accounts',
    title: 'Cuentas',
    component: AccountsComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'reports/:accountId',
    title: 'Reportes',
    component: ReportsComponent,
  },
  { path: '**', redirectTo: 'accounts' },
];
