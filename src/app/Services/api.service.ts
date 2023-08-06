import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  public createUser(data: any) {
    return this.http.post(`${this.apiUrl}/users/add`, data);
  }

  public login(user: User) {
    return this.http.post(`${this.apiUrl}/users/login`, user);
  }
}
