import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  registerData = { username: '', password: '' };

  loading = false;
  message = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.loading = true;
    this.authService.login(this.loginData).subscribe({
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
    this.authService.register(this.registerData).subscribe({
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
