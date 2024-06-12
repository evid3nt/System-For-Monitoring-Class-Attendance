import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TelemetryService {
    private apiUrl = 'https://localhost:7115/api/Telemetry';  // Postavi pravi URL za tvoj backend

    constructor(private http: HttpClient) { }

    getUserTelemetries(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/telemetrys/${userId}`)
    }
}
