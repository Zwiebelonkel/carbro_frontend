
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private baseUrl = 'https://carbro.onrender.com/api/garage';

  constructor(private http: HttpClient) { }

  addCar(car: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, car, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  getCars(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
