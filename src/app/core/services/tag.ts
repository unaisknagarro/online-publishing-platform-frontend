import { Injectable } from '@angular/core';
import { Api } from './api';


@Injectable({ providedIn: 'root' })
export class Tag extends Api {
  list(params?: any) {
    return this.get('/tags', params);
  }

  getById(id: string) {
    return this.get(`/tags/${id}`);
  }


  create(data: any) {
    return this.post('/tags', data);
  }
}