import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EducationBackground } from '../models/education-background';
import { Certification } from '../models/certification';
import { Reference } from '../models/reference';

@Injectable({
  providedIn: 'root',
})
export class ResumeBuilderService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  constructor(private http: HttpClient) {}

  // Get all education records (optionally filtered by personID)
  getEducations(personID: any): Observable<EducationBackground[]> {
    let url = this.apiUrl;
    if (personID) {
      url = `${this.apiUrl}/education-backgrounds?personID=${personID}`;
    }
    return this.http.get<EducationBackground[]>(url);
  }

  // Create a new education record
  createEducation(
    education: EducationBackground
  ): Observable<EducationBackground> {
    return this.http.post<EducationBackground>(
      this.apiUrl + '/education-backgrounds',
      education
    );
  }

  // Update an existing education record
  updateEducation(
    id: number,
    education: EducationBackground
  ): Observable<EducationBackground> {
    return this.http.put<EducationBackground>(
      `${this.apiUrl}/education-backgrounds/${id}`,
      education
    );
  }

  // Delete an education record
  deleteEducation(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/education-backgrounds/${id}`);
  }

  // Get a specific education record by id
  getEducation(personID: any): Observable<EducationBackground> {
    return this.http.get<EducationBackground>(
      `${this.apiUrl}/education-backgrounds/${personID}`
    );
  }

  getCertifications(personID: any): Observable<Certification[]> {
    let url = this.apiUrl;
    if (personID) {
      url = `${this.apiUrl}/certifications?personID=${personID}`;
    }
    return this.http.get<Certification[]>(url);
  }

  // Get a single certification by ID
  getCertification(id: number): Observable<Certification> {
    return this.http.get<Certification>(`${this.apiUrl}/certifications/${id}`);
  }

  // Add a new certification
  addCertification(certification: Certification): Observable<Certification> {
    return this.http.post<Certification>(
      this.apiUrl + '/certifications',
      certification
    );
  }

  // Update a certification
  updateCertification(
    id: number,
    certification: Certification
  ): Observable<Certification> {
    return this.http.put<Certification>(
      `${this.apiUrl}/certifications/${id}`,
      certification
    );
  }

  // Delete a certification
  deleteCertification(id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/certifications/${id}`);
  }

  getReferences(personID: any): Observable<Reference[]> {
    let url = this.apiUrl;
    if (personID) {
      url = `${this.apiUrl}/references?personID=${personID}`;
    }
    return this.http.get<Reference[]>(url);
  }

  getReference(id: number): Observable<Reference> {
    return this.http.get<Reference>(`${this.apiUrl}/references/${id}`); // Single Reference
  }

  createReference(data: Reference): Observable<Reference> {
    return this.http.post<Reference>(this.apiUrl + '/references', data); // Creating new Reference
  }

  updateReference(id: number, data: Reference): Observable<Reference> {
    return this.http.put<Reference>(`${this.apiUrl}/references/${id}`, data); // Updating an existing Reference
  }

  deleteReference(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/references/${id}`); // Deleting Reference
  }
}
