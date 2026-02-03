import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from './api';
import { CommentModel } from '../../models/comment.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
// export class Comment extends Api {
  export class Comment {
  
  constructor(private http: HttpClient) {}

  getComments(articleId: string): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${environment.apiUrl}/comments/${articleId}`);
  }

  addComment(articleId: string, data: any) {
    return this.http.post<CommentModel>(`${environment.apiUrl}/comments/${articleId}`, data);
  }

  likeComment(commentId: string) {
    return this.http.post<CommentModel>(`${environment.apiUrl}/comments/like/${commentId}`, {});
  }
}