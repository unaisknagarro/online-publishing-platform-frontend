import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../../core/services/article';
import { Comment } from '../../core/services/comment';
import { CommentModel } from '../../models/comment.model';
import { CommentThread } from '../../shared/comment-thread/comment-thread';

@Component({
  selector: 'app-article-detail',
  imports: [CommonModule, CommentThread],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.scss',
  standalone: true
})
export class ArticleDetail {
  article: any;
  comments: any[] = [];


  constructor(route: ActivatedRoute,
    private articleService: Article,
    private commentService: Comment) {
    const id = route.snapshot.params['id'];
    this.articleService.getById(id).subscribe(res => this.article = res);
    this.commentService.getComments(id).subscribe(res => this.comments = res as CommentModel[]);
  }
}