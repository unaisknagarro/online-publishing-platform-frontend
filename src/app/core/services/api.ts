import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class Api {
  constructor(protected http: HttpClient) { }


  get(url: string, params?: any) {
    return this.http.get(`${environment.apiUrl}${url}`, { params });
  }


  post(url: string, body: any) {
    return this.http.post(`${environment.apiUrl}${url}`, body);
  }
}