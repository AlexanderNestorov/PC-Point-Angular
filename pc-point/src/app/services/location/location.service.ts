import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILocation} from '../../shared/interfaces/ILocation';

const API_URL = 'http://localhost:8080/api/location/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) { }
  getAllLocations(): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(API_URL + 'all');
  }
  addNewLocation(location: ILocation): Observable<ILocation> {
    return this.http.post<ILocation>(API_URL + 'add', location, httpOptions);
  }
  getAllCities() {
    return this.http.get<string[]>(API_URL + 'cities');
  }
//
  getLocationsByCity(city: string) {
    const httpParams = new HttpParams().set('city', city);
    return this.http.get<ILocation[]>(API_URL  + city, {
      params: httpParams
    } );
  }

  public deleteLocation(locationId: number): Observable<void> {
    return this.http.delete<void>(API_URL + `delete/${locationId}`, httpOptions);
  }

  updateLocation(location: ILocation): Observable<ILocation> {
    return this.http.put<ILocation>(API_URL + 'update', location, httpOptions);
  }
}
