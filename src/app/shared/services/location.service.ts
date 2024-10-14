import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private countriesApiUrl = 'https://restcountries.com/v3.1/all';
  // private localProvincesUrl = 'assets/json/province.json';  // Example JSON file path
  // private localCitiesUrl = 'assets/data/cities.json';        // Example JSON file path
  // private localBarangaysUrl = 'assets/data/barangays.json';  // Example JSON file path

  // private apiUrl = 'https://ph-locations-api.buonzz.com/v1';

  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(this.countriesApiUrl);
  }

  getRegions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/regions`);
  }
  getProvinces(regiondID: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/provinces?regionCode=${regiondID}`);
  }

  getCities(provinceId: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/municipalities?provinceCode=${provinceId}`
    );
  }

  getBarangays(payload: any): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/barangays?cityCode=${payload.cityCode}&municipalityCode=${payload.municipalityCode}`
    );
  }
}
