import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private countriesApiUrl = 'https://restcountries.com/v3.1/all';
  private localProvincesUrl = 'assets/json/province.json';  // Example JSON file path
  private localCitiesUrl = 'assets/data/cities.json';        // Example JSON file path
  private localBarangaysUrl = 'assets/data/barangays.json';  // Example JSON file path

  private apiUrl = 'https://ph-locations-api.buonzz.com/v1';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(this.countriesApiUrl);
  }

  getProvinces(): Observable<any> {
    return this.http.get(this.localProvincesUrl);
  }

  getCities(provinceId: string): Observable<any> {
    return this.http.get(`${this.localCitiesUrl}?provinceId=${provinceId}`);
  }

  getBarangays(cityId: string): Observable<any> {
    return this.http.get(`${this.localBarangaysUrl}?cityId=${cityId}`);
  }
}
