import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    // canActivate: [AuthGuard], // Opcional, si tienes un AuthGuard
    children: [
      { path: 'accounts', title: 'Cuentas', component: AccountsComponent },
      {
        path: 'reports/:accountId',
        title: 'Reportes',
        component: ReportsComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'home' }, // Manejo de rutas desconocidas
];
