import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { EmployerDetails } from '../models/employer-details';
import { map, Observable } from 'rxjs';
import { JobDetails } from '../models/job-details';

const apiUrl = `${environment.apiUrl}/api/auth`;

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {


  constructor(private http: HttpClient) {}
  saveUpdatePersonalDetails(data: any) {
    return this.http.post(`${apiUrl}/persons`, data);
  }
  saveUpdateEmployerDetails(data: EmployerDetails) {
    return this.http.post(`${apiUrl}/employers`, data);
  }
  getEmployerDetails(userId: number): Observable<EmployerDetails> {
    return this.http.get<{ success: boolean; message: string; data: EmployerDetails }>(`${apiUrl}/employers/${userId}`)
      .pipe(
        map(response => response.data)
      );
  }

  saveJobDetails(data: JobDetails) {
    return this.http.post(`${apiUrl}/jobs`, data);
  }
}
