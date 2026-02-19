import { Component, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../../core/services/article';
import { Comment } from '../../core/services/comment';
import { CommentModel } from '../../models/comment.model';
import { CommentThread } from '../../shared/comment-thread/comment-thread';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-article-detail',
  imports: [CommonModule, CommentThread],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetail {
  article: any;
  comments: any[] = [];
  private destroyRef = inject(DestroyRef);


  constructor(route: ActivatedRoute,
    private articleService: Article,
    private commentService: Comment) {
    const id = route.snapshot.params['id'];
    this.articleService.getById(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => this.article = res);
    this.commentService.getComments(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => this.comments = res as CommentModel[]);
  }
}