import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formData = { username: '', password: '' };
  isLoginView = true;

  loading = false;
  message = '';

  constructor(private authService: AuthService) {}

  toggleView() {
    this.isLoginView = !this.isLoginView;
    this.formData = { username: '', password: '' };
    this.message = '';
    this.loading = false;
  }

  onLogin() {
    this.loading = true;
    this.authService.login(this.formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = '✅ Erfolgreich eingeloggt';
        console.log('Login erfolgreich:', res);
      },
      error: (err) => {
        this.loading = false;
        this.message = '❌ Login fehlgeschlagen';
        console.error('Login Fehler:', err);
      },
    });
  }

  onRegister() {
    this.loading = true;
    this.authService.register(this.formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = '✅ Registrierung erfolgreich';
        console.log('Registrierung erfolgreich:', res);
      },
      error: (err) => {
        this.loading = false;
        this.message = '❌ Registrierung fehlgeschlagen';
        console.error('Registrierung Fehler:', err);
      },
    });
  }
}
