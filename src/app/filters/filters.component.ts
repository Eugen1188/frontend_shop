import { Component } from '@angular/core';
import { BackendService, Category, Product } from '../services/backend.service';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  constructor(private backendService: BackendService) {}

  sort() {
    this.backendService.sortingproducts();
  }

  availability() {}

  prices() {
    this.backendService.sortprices();
  }
}
