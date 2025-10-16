import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GarageService } from '../../services/garage.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
})
export class ScanComponent {
  loading = false;
  error = '';
  data: any = null;
  hsn = '';
  isLoggedIn$!: Observable<boolean>;


  constructor(private http: HttpClient, private garageService: GarageService, private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.hsn = '';
    this.loading = true;
    this.error = '';
    this.data = null;

    const formData = new FormData();
    formData.append('file', file);

    this.http.post('https://carbro.onrender.com/api/scan', formData).subscribe({
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

  onHsnSubmit() {
    if (!this.hsn) return;

    this.loading = true;
    this.error = '';
    this.data = null;

    this.http
      .post(`https://carbro.onrender.com/api/hsn`, { hsn: this.hsn })
      .subscribe({
        next: (res) => {
          this.data = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Fehler bei der HSN-Suche';
          this.loading = false;
        },
      });
  }

  addToGarage() {
    if (!this.data) return;
  
    const car = {
      hersteller: this.data.Hersteller ?? this.data.hersteller ?? null,
      modell: this.data.Modell ?? this.data.modell ?? null,
      baujahr: this.data.Baujahr ?? this.data.baujahr ?? null,
      hubraum: this.data.Hubraum ?? this.data.hubraum ?? null,
      leistung: this.data.Leistung ?? this.data.leistung ?? null,
      kraftstoff: this.data.Kraftstoff ?? this.data.kraftstoff ?? null,
      motoröl_empfehlung: this.data.Motoröl_Empfehlung ?? this.data.motoröl_empfehlung ?? null,
      reifendruck_vorne: this.data.Reifendruck_vorne ?? this.data.reifendruck_vorne ?? null,
      reifendruck_hinten: this.data.Reifendruck_hinten ?? this.data.reifendruck_hinten ?? null,
      wert_von: this.data.Wert_von ?? this.data.wert_von ?? null,
      wert_bis: this.data.Wert_bis ?? this.data.wert_bis ?? null,
    };
  
    this.garageService.addCar(car).subscribe({
      next: () => alert('Fahrzeug zur Garage hinzugefügt!'),
      error: (err) => {
        console.error(err);
        alert('Fehler beim Hinzufügen des Fahrzeugs zur Garage.');
      }
    });
  }
  

  objectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }
}
