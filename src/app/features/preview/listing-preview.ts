import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../core/services/listing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-listing-preview',
    templateUrl: './listing-preview.html',
    styleUrls: ['./listing-preview.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ]
})
export class ListingPreview implements OnInit {

    post: any;
    id!: string;
    listing: any = null;
    comment = '';

    constructor(private route: ActivatedRoute, private listingService: ListingService, private auth: AuthService, private router: Router) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;
        this.load();
    }

    load() {
        this.listing = this.listingService.getById(this.id);
    }

    submit() {
        this.listingService.add(this.post);
        this.router.navigate(['/']);
    }

    addComment() {
        if (!this.comment.trim()) return;

        this.listingService.addComment(
            this.id,
            this.comment,
            this.auth.getCurrentUser()?.email || 'guest'
        );

        this.comment = '';
        this.load();
    }
}