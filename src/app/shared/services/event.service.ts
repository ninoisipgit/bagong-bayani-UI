import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const apiUrl = `${environment.apiUrl}/api/auth`;
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  saveJobDetails(data: any) {
    return this.http
      .post<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/jobs`,
        data
      )
      .pipe(map((response) => response.data));
  }

  getAllJobList(userId: number): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(`${apiUrl}/jobs`)
      .pipe(map((response) => response.data));
  }
}
