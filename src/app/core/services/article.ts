import { Injectable } from '@angular/core';
import { Api } from './api';


@Injectable({ providedIn: 'root' })
export class Article extends Api {
  list(params?: any) {
    return this.get('/articles', params);
  }

  getById(id: string) {
    return this.get(`/articles/${id}`);
  }


  create(data: any) {
    return this.post('/articles', data);
  }
}