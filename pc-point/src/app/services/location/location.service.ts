import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '../../shared/interfaces/Location';
import {environment} from "../../../environments/environment.prod";
import {AddLocation} from "../../shared/interfaces/AddLocation";


const API_URL = environment.baseUrl + 'location';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) { }
  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(API_URL + '/all');
  }
  addNewLocation(location: AddLocation): Observable<Location> {
    return this.http.post<Location>(API_URL + '/add', location, httpOptions);
  }
  getAllCities() {
    return this.http.get<string[]>(API_URL + '/cities');
  }
//
  getLocationsByCity(city: string) {
    const httpParams = new HttpParams().set('/city', city);
    return this.http.get<Location[]>(API_URL + '/by_city/'  + city, {
      params: httpParams
    } );
  }

  public deleteLocation(locationId: number): Observable<void> {
    return this.http.delete<void>(API_URL + `/delete/${locationId}`, httpOptions);
  }

  updateLocation(location: Location): Observable<Location> {
    return this.http.put<Location>(API_URL + '/update', location, httpOptions);
  }
}
