import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loginUrl = 'https://localhost:7115/api/User/login'; // Postavi URL za login endpoint

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    // Napravi HTTP POST zahtjev na backend za autentifikaciju
    return this.http.post<boolean>(this.loginUrl, { email, password });
  }
}
