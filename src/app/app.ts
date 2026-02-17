import { Component, OnInit , signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './shared/components/navbar';
import { SeedService } from './core/services/seed.service';
import { ListingService } from './core/services/listing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
   constructor(private seed: SeedService, private listingService: ListingService) {}

  protected readonly title = signal('RentApp');

  ngOnInit() {
    //this.seed.seedData();
    this.listingService.seedSampleData();
  }
}
