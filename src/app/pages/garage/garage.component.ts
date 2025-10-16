import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageService } from '../../services/garage.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {
  cars: any[] = [];

  constructor(private garageService: GarageService) { }

  ngOnInit(): void {
    this.garageService.getCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  deleteCar(id: number): void {
    this.garageService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter(car => car.id !== id);
    });
  }
}
