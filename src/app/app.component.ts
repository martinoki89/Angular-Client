import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { MainComponent } from './pages/main/main.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    MainComponent,
    AccountsComponent,
    ReportsComponent,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo';
  loaderState: boolean = false;
  private loaderSubscription: Subscription | undefined;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    // Nos suscribimos a los cambios de estado del loader
    this.loaderSubscription = this.loaderService.loaderState$.subscribe({
      next: (state) => {
        this.loaderState = state;
      },
      error: (error) => {
        console.error('Error al suscribirse al estado del loader:', error); // Captura cualquier error de suscripción
      },
    });
  }

  ngOnDestroy() {
    // Asegurarnos de cancelar la suscripción cuando el componente se destruya
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }
}
