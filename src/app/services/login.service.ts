import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/token`;
    const body = {
      username,
      password,
    };
    return this.http.post<any>(url, body);
  }

  logout() {
    this.removeToken();
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  removeToken(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
