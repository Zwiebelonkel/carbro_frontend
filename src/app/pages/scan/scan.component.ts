import { Component } from '@angular/core';
import { ScanService } from '../../services/scan.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
})
export class ScanComponent {
  loading = false;
  data: any = null;
  error = '';

  constructor(private scanService: ScanService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.loading = true;
    this.error = '';
    this.data = null;

    this.scanService.scan(file).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Fehler bei der Analyse';
        this.loading = false;
      },
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }
}
