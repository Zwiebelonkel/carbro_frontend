import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScanService {
  private baseUrl = 'https://carbro-backend.onrender.com/api'; // ✅ Render-Link hier

  constructor(private http: HttpClient) {}

  scan(file: File): Observable<any> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(`${this.baseUrl}/scan`, fd);
  }
}
