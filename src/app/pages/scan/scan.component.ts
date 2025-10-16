import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
})
export class ScanComponent {
  loading = false;
  error = '';
  data: any = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.loading = true;
    this.error = '';
    this.data = null;

    const formData = new FormData();
    formData.append('file', file);

    this.http
      .post('https://carbro-backend.onrender.com/api/scan', formData)
      .subscribe({
        next: (res) => {
          this.data = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Fehler bei der Analyse';
          this.loading = false;
        },
      });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }
}
