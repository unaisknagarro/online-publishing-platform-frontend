import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommentService {

  get(postId: number) {
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    return comments.filter((c: any) => c.postId == postId);
  }

  add(postId: number, text: string) {
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push({ postId, text, date: new Date() });
    localStorage.setItem('comments', JSON.stringify(comments));
  }
}