import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../core/services/listing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
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
export class Home implements OnInit {

  listings: any[] = [];
  filtered: any[] = [];
  favourites: any[] = [];
  search = '';

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  @ViewChild('favCarousel') favCarousel!: ElementRef<HTMLDivElement>;

  constructor(private listingService: ListingService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.listings = this.listingService.getAll();
    this.filtered = [...this.listings];
    this.favourites = this.listingService.getFavourites();
  }

  scroll(dir: 'left' | 'right') {
    const amount = 300;
    this.carousel.nativeElement.scrollLeft +=
      dir === 'left' ? -amount : amount;
  }

  scrollFav(dir: 'left' | 'right') {
    const amount = 300;
    this.favCarousel.nativeElement.scrollLeft +=
      dir === 'left' ? -amount : amount;
  }

  toggleFavourite(id: string) {
    this.listingService.toggleFavourite(id);
    this.load();
  }

  filter() {
    this.filtered = this.listings.filter(x =>
      x.location.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}