import { Injectable } from '@angular/core';
import { Api } from './api';


@Injectable({ providedIn: 'root' })
export class Author extends Api {
  list() {
    return this.get('/authors');
  }
}