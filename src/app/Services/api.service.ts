import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { Observable } from 'rxjs/internal/Observable';
import { ImageResponse } from '../Models/ImageResponse';

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

  uploadImage(formData: FormData) {
    return this.http.post(`${this.apiUrl}/images/upload`, formData, { responseType: 'text' });
  }

  getImages(): Observable<ImageResponse[]> {
    return this.http.get<ImageResponse[]>(`${this.apiUrl}/images`);
  }
}
