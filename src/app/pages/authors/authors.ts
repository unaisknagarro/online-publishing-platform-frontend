import { Component, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../../core/services/author';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-authors',
  imports: [CommonModule],
  templateUrl: './authors.html',
  styleUrl: './authors.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Authors {
  authors: any[] = [];

  private destroyRef = inject(DestroyRef)


  constructor(private authorService: Author) {
    this.authorService.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => this.authors = res as any[]);
  }
}