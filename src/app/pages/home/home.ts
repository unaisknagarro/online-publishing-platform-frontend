import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../core/services/article';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatSelectModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})

export class Home {
  articles: any[] = [];
  sort = 'latest';

  constructor(private articleService: Article) {
    this.load();
  }

  load() {
    this.articleService.list({ sort: this.sort }).subscribe(res => {console.log('articles: ' + res); this.articles = res as any[]});
  }
}