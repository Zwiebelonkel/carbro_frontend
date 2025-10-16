
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageService } from '../../services/garage.service';

interface CarData {
  id: number;
  hersteller: string;
  modell: string;
  baujahr: number;
  hubraum: string;
  leistung: string;
  kraftstoff: string;
  motoröl_empfehlung: string;
  reifendruck_vorne: string;
  reifendruck_hinten: string;
  wert_von: string;
  wert_bis: string;
}

interface DisplayCar extends CarData {
  hubraumNum: number;
  leistungNum: number;
  wertNum: number;
  expanded: boolean;
}

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {
  cars: DisplayCar[] = [];
  maxHubraum = 1;
  maxLeistung = 1;
  maxWert = 1;

  constructor(private garageService: GarageService) { }

  private parseValue(value: any): number {
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return typeof value === 'number' ? value : 0;
  }

  ngOnInit(): void {
    this.garageService.getCars().subscribe((cars: CarData[]) => {
      this.cars = cars.map((car: CarData) => ({
        ...car,
        hubraumNum: this.parseValue(car.hubraum),
        leistungNum: this.parseValue(car.leistung),
        wertNum: this.parseValue(car.wert_von),
        expanded: false
      }));
      this.calculateMaxValues();
    });
  }

  calculateMaxValues(): void {
    if (this.cars.length > 0) {
      this.maxHubraum = Math.max(...this.cars.map(car => car.hubraumNum));
      this.maxLeistung = Math.max(...this.cars.map(car => car.leistungNum));
      this.maxWert = Math.max(...this.cars.map(car => car.wertNum));
    }

    if (this.maxHubraum === 0) this.maxHubraum = 1;
    if (this.maxLeistung === 0) this.maxLeistung = 1;
    if (this.maxWert === 0) this.maxWert = 1;
  }

  deleteCar(id: number): void {
    this.garageService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter(car => car.id !== id);
      this.calculateMaxValues();
    });
  }

  toggleCard(car: DisplayCar): void {
    car.expanded = !car.expanded;
  }
}
