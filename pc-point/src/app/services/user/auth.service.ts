import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../../shared/interfaces/User";

const API_URL = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(API_URL + 'login', {
      username,
      password
    }, httpOptions);
  }

    register(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(API_URL + 'register', {
      username,
      email,
      password,
      confirmPassword
    }, httpOptions);
  }
}
