import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

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
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private readonly cdr: ChangeDetectorRef) {}

  submit() {
    const { username, password } = this.form.controls;
    if (this.form.valid) {
      if (username?.value === 'mocchi' && password?.value === '123456') {
        this.error = undefined;
      } else {
        this.error = 'Usuario y/o contraseña incorrecta';
        this.cdr.detectChanges();
      }
    }
  }
}
