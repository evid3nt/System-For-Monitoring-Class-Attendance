import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7115/api/User';  // Postavi pravi URL za tvoj backend

  constructor(private http: HttpClient) { }

  register(user: UserDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  getCurrentUser(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/current`)
  }
}
