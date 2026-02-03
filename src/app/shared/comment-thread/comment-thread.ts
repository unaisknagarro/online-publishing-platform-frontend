import { Component, Input, OnInit, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { Comment } from '../../core/services/comment';
import { CommentModel } from '../../models/comment.model';
import { FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';  

@Component({
  selector: 'app-comment-thread',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule],
  templateUrl: './comment-thread.html',
  styleUrl: './comment-thread.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentThread implements OnInit {
  private destroyRef = inject(DestroyRef);
  @Input() comments: CommentModel[] = [];   
  @Input() articleId!: string;

  //comments: CommentModel[] = [];
  replyBoxes: Record<string, boolean> = {};
  replyControls: Record<string, FormControl> = {};

  newComment = new FormControl('');

  constructor(private commentService: Comment) { }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments(this.articleId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.comments = res;
    });
  }

  postComment(parentComment?: string) {
    const content = parentComment
      ? this.replyControls[parentComment].value
      : this.newComment.value;

    if (!content?.trim()) return;

    this.commentService
      .addComment(this.articleId, { content, parentComment })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadComments();
        if (parentComment) this.replyControls[parentComment].reset();
        else this.newComment.reset();
      });
  }

  getRootComments() {
    return this.comments.filter(c => !c.parent);
  }

  getReplies(parentId: string) {
    return this.comments.filter(c => c.parent === parentId);
  }

  toggleReply(id: string) {
    this.replyBoxes[id] = !this.replyBoxes[id];
    if (!this.replyControls[id]) {
      this.replyControls[id] = new FormControl('');
    }
  }

  

  like(commentId: string) {
    this.commentService.likeComment(commentId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(updated => {
      const idx = this.comments.findIndex(c => c._id === updated._id);
      this.comments[idx] = updated;
    });
  }
}
