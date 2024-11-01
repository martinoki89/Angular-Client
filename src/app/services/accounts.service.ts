import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  getAccount(name: string): Observable<any> {
    const url = `${this.apiUrl}/accounts?filter=${name}`;
    return this.http.get<any>(url, {});
  }
}
