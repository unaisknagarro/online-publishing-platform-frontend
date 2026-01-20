import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Tag } from '../../core/services/tag';

@Component({
  selector: 'app-tags',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './tags.html',
  styleUrl: './tags.scss',
  standalone: true
})
export class Tags implements OnInit {
  tags: any[] = [];
  tagForm!: FormGroup;


  constructor(private fb: FormBuilder, private tagService: Tag, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tagForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.loadTags();
  }

  loadTags(): void {
    this.tagService.list().subscribe(res => {
      this.tags = res as any[];
    });
  }

  addTag() {
    const value = this.tagForm.value.name?.trim();

    if (!value) return;

    const exists = this.tags.some(
      t => t.name.toLowerCase() === value.toLowerCase()
    );

    if (exists) {
      this.snackBar.open('Tag already exists', 'Close', {
        duration: 2000
      });
      return;
    }

    this.tagService.create({ "name": value, "usageCount": 0 }).subscribe();

    this.tags.push({ "name": value, "usageCount": 0 } );
    this.tagForm.reset();

    this.snackBar.open('Tag added', 'Close', {
      duration: 1500
    });
  }
}
