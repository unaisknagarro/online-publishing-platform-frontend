import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../core/services/article';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatSelectModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})

export class Home {
  private destroyRef = inject(DestroyRef);
  articles: any[] = [];
  sort = 'latest';

  constructor(private articleService: Article) {
    this.load();
  }

  load() {
    this.articleService.list({ sort: this.sort }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {console.log('articles: ' + res); this.articles = res as any[]});
  }
}