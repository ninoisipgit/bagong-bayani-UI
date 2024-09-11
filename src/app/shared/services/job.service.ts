import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const apiUrl = `${environment.apiUrl}/api/auth`;
@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {}
  saveJobDetails(data: any) {
    return this.http.post<{ success: boolean; message: string; data: any }>(`${apiUrl}/jobs`, data).pipe(
      map(response => response.data)
    );
  }
  updateJobDetails(data: any) {
    return this.http.put<{ success: boolean; message: string; data: any }>(`${apiUrl}/jobs/${data.id}`, data).pipe(
      map(response => {
        return response.data
      })
    );
  }

  getJobDetails(jobId: number): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(`${apiUrl}/jobs/${jobId}`)
      .pipe(
        map(response => response.data)
      );
  }

  deleteJob(jobId: number) {
    return this.http.delete(`${apiUrl}/jobs/${jobId}`);
  }

  getJobDetailsListByUserId(userId: number): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(`${apiUrl}/jobs/user/${userId}`)
      .pipe(
        map(response => response.data)
      );
  }

  getAllJobList(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(`${apiUrl}/jobs`)
      .pipe(
        map(response => response.data)
      );
  }


  applyForJob(data: any) {
    return this.http.post<{ success: boolean; message: string; data: any }>(`${apiUrl}/jobApplicant`, data).pipe(
      map(response => response.data)
    );
  }

  getJobApplicants() {
    return this.http.get<{ success: boolean; message: string; data: any }>(`${apiUrl}/jobApplicant`)
    .pipe(
      map(response => response.data)
    );
  }
}
