import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.apiUrl}/api/auth`;

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getNumberofApplicants(): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/reports/numberofapplicants`
      )
      .pipe(map((response) => response.data));
  }
  getNumberofCompanies(): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/reports/getnumberofcompany`
      )
      .pipe(map((response) => response.data));
  }
  getNumberofOFW(): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/reports/getnumberofofw`
      )
      .pipe(map((response) => response.data));
  }
  getTopPaidJobs(): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        `${apiUrl}/reports/gettoppaidjobs`
      )
      .pipe(map((response) => response.data));
  }
}
