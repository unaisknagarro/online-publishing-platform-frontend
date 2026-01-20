import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../../core/services/author';

@Component({
  selector: 'app-authors',
  imports: [CommonModule],
  templateUrl: './authors.html',
  styleUrl: './authors.scss',
  standalone: true
})
export class Authors {
  authors: any[] = [];


  constructor(private authorService: Author) {
    this.authorService.list().subscribe(res => this.authors = res as any[]);
  }
}