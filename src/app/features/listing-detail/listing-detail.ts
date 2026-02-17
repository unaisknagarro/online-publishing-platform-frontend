import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../../core/services/listing';
import { CommentService } from '../../core/services/comment';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.html',
  styleUrls: ['./listing-detail.scss'],
   imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ListingDetail implements OnInit {

  post: any;
  comments: any[] = [];
  text = '';

  constructor(
    private route: ActivatedRoute,
    private listing: ListingService,
    private comment: CommentService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.post = this.listing.getById(id);
    this.comments = this.comment.get(id);
  }

  addComment() {
    this.comment.add(this.post.id, this.text);
    this.comments = this.comment.get(this.post.id);
    this.text = '';
  }
}