import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  error?: string | null;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private readonly loginService: LoginService,
    private readonly loaderService: LoaderService,
    private router: Router
  ) {}

  submit() {
    this.loaderService.showLoader();
    const { username, password } = this.loginForm.controls;
    if (this.loginForm.valid) {
      this.loginService.login(username.value, password.value).subscribe({
        next: (response) => {
          this.loaderService.hideLoader();
          if (response?.access_token) {
            this.loginService.saveToken(response.access_token);
            this.router.navigate(['/accounts']);
          } else {
            this.error = 'Token no recibido';
          }
        },
        error: (error) => {
          this.loaderService.hideLoader();
          console.error('Login fallido', error);
          this.error = 'Usuario y/o password incorrectas';
        },
      });
    }
  }
}
