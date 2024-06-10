import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CourseDto } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://localhost:7115/api/course'; // prilagodite ovo prema vašem API putanji

  constructor(private http: HttpClient) { }

  getCourses(): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(this.apiUrl);
  }

  getCourse(id: string): Observable<CourseDto> {
    return this.http.get<CourseDto>(`${this.apiUrl}/${id}`);
  }

  addCourse(course: CourseDto): Observable<CourseDto> {
    return this.http.post<CourseDto>(this.apiUrl, course);
  }

  updateCourse(id: string, course: CourseDto): Observable<CourseDto> {
    return this.http.put<CourseDto>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
