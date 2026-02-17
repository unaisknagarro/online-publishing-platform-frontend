import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListingService } from '../../core/services/listing';
import { AuthService } from '../../core/services/auth.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-listing-create',
  templateUrl: './listing-create.html',
  styleUrls: ['./listing-create.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioButton
  ]
})
export class ListingCreate {

  form: any;
  id!: string;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1000)]],
      furnished: [false],
      vegOnly: [false],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1000)]],
      furnished: [false],
      image: ['', Validators.required],
      vegOnly: [false],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const listing = this.listingService.getById(id);
      this.form.patchValue(listing);
    }
  }

  preview() {
    this.listingService.setDraft(this.form.value);
    this.router.navigate(['/preview']);
  }

  submit() {
    const payload = {
      ...this.form.value,
      owner: this.auth.getCurrentUser()?.email || 'guest',
      comments: []
    };

    if (this.isEdit) {
      this.listingService.update(this.id, payload);
    } else {
      this.listingService.create({
        ...payload,
        id: crypto.randomUUID()
      });
    }

    this.router.navigateByUrl('/');
  }
}