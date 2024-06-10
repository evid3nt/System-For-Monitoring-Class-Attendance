import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LectureDTO } from '../models/lecture.model';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  private apiUrl = 'https://localhost:7115/api/lecture'; // Zamijenite sa stvarnom URL adresom vašeg API-ja

  constructor(private http: HttpClient) { }

  getLectures(): Observable<LectureDTO[]> {
    return this.http.get<LectureDTO[]>(this.apiUrl);
  }

  getLecturesForUser(userId: string): Observable<LectureDTO[]>{
    return this.http.get<LectureDTO[]>(`${this.apiUrl}/current/${userId}`)
  }

  getLecture(id: string): Observable<LectureDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<LectureDTO>(url);
  }

  addLecture(lecture: LectureDTO): Observable<LectureDTO> {
    return this.http.post<LectureDTO>(this.apiUrl, lecture);
  }

  updateLecture(id: string, lecture: LectureDTO): Observable<LectureDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<LectureDTO>(url, lecture);
  }

  deleteLecture(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
