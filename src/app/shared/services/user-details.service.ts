import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmployerDetails } from '../models/employer-details';
import { map, Observable } from 'rxjs';
import { EmailData, JobDetails } from '../models/job-details';

const apiUrl = `${environment.apiUrl}/api/auth`;

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  constructor(private http: HttpClient) {}
  savePersonalDetails(data: any) {
    return this.http.post(`${apiUrl}/persons`, data);
  }
  updatePersonalDetails(data: any) {
    return this.http.put(`${apiUrl}/persons/${data.id}`, data);
  }

  getPersonalDetailsByUserId(userId: number): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/persons/${userId}`
      )
      .pipe(map((response) => response.data));
  }

  saveAddress(data: any) {
    return this.http.post(`${apiUrl}/addresses`, data);
  }
  updateAddress(data: any) {
    return this.http.put(`${apiUrl}/addresses/${data.id}`, data);
  }

  getAddressByUserId(userId: number): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/addresses/${userId}`
      )
      .pipe(map((response) => response.data));
  }

  saveEmploymentDetails(data: any) {
    return this.http.post(`${apiUrl}/employment`, data);
  }
  updateEmploymentDetails(data: any) {
    return this.http.put(`${apiUrl}/employment/${data.id}`, data);
  }

  getEmploymentDetailsByUserId(userId: number): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/employment/${userId}`
      )
      .pipe(map((response) => response.data));
  }

  saveUpdateEmployerDetails(data: EmployerDetails) {
    return this.http.post(`${apiUrl}/employers`, data);
  }

  updateEmployerDetails(data: EmployerDetails, tableId: number) {
    return this.http.put(`${apiUrl}/employers/${tableId}`, data);
  }
  getEmployerDetails(userId: number): Observable<EmployerDetails> {
    return this.http
      .get<{ success: boolean; message: string; data: EmployerDetails }>(
        `${apiUrl}/employers/${userId}`
      )
      .pipe(map((response) => response?.data));
  }

  saveJobDetails(data: JobDetails) {
    return this.http.post(`${apiUrl}/jobs`, data);
  }
  getEmployersList(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(`${apiUrl}/employers`)
      .pipe(
        map(response => response?.data)
      );
  }
  getOfwList(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(`${apiUrl}/persons`)
      .pipe(
        map(response => response?.data)
      );
  }

}
