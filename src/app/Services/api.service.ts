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

  uploadImage(formData: FormData, login: string) {
    return this.http.post(`${this.apiUrl}/images/upload/${login}`, formData, { responseType: 'text' });
  }

  getImages(login: string): Observable<ImageResponse[]> {
    return this.http.get<ImageResponse[]>(`${this.apiUrl}/images/${login}`);
  }

  deleteImage(id: string) {
    return this.http.delete(`${this.apiUrl}/images/delete/${id}`, { responseType: 'text' });
  }

  changeFilename(id: string, newFilename: string) {
    return this.http.put(`${this.apiUrl}/images/editFilename/${id}/${newFilename}`, { responseType: 'text' });
  }
}
