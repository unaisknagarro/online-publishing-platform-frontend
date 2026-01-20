import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../core/services/comment';
import { CommentModel } from '../../models/comment.model';
import { FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-thread',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule],
  templateUrl: './comment-thread.html',
  styleUrl: './comment-thread.scss',
})
export class CommentThread implements OnInit {
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
    alert(this.articleId);
    this.commentService.getComments(this.articleId).subscribe(res => {
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
    this.commentService.likeComment(commentId).subscribe(updated => {
      const idx = this.comments.findIndex(c => c._id === updated._id);
      this.comments[idx] = updated;
    });
  }
}
