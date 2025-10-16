import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://carbro.onrender.com/api'; // ✅ mit https & /api

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }
}
