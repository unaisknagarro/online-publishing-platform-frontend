import { Component, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Article } from '../../core/services/article';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-editor',
  //imports: [CommonModule, FormsModule, QuillModule, MatButtonModule, MatInputModule],
  imports: [CommonModule, QuillModule, FormsModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Editor {
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private articleService = inject(Article);
  private router = inject(Router);

  loading = false;

  articleForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.maxLength(300)]],
    content: ['', Validators.required],
    thumbnail: [''],
    tags: [[]],
    status: ['draft', Validators.required],
    publishAt: [null]
  });

  submit(status: 'draft' | 'published') {
    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = {
      ...this.articleForm.value,
      status,
      publishAt:
        status === 'published'
          ? new Date()
          : this.articleForm.value.publishAt
    };

    this.articleService.create(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: () => (this.loading = false)
    });
  }

  title = '';
  content = '';
}