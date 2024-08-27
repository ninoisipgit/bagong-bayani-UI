import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const apiUrl = `${environment.apiUrl}/api/auth`;

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {


  constructor(private http: HttpClient) {}
  saveUpdatePersonalDetails(data: any) {
    return this.http.post(`${apiUrl}/persons`, data);
  }
}
