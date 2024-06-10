import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClassroomDto } from '../models/classroom.model';
@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private apiUrl = 'https://localhost:7115/api/classroom'; // adjust this according to your API route

  constructor(private http: HttpClient) { }

  getClassrooms(): Observable<ClassroomDto[]> {
    return this.http.get<ClassroomDto[]>(this.apiUrl);
  }

  getClassroom(id: string): Observable<ClassroomDto> {
    return this.http.get<ClassroomDto>(`${this.apiUrl}/${id}`);
  }

  addClassroom(classroom: ClassroomDto): Observable<ClassroomDto> {
    return this.http.post<ClassroomDto>(this.apiUrl, classroom);
  }

  updateClassroom(id: string, classroom: ClassroomDto): Observable<ClassroomDto> {
    return this.http.put<ClassroomDto>(`${this.apiUrl}/${id}`, classroom);
  }

  deleteClassroom(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
