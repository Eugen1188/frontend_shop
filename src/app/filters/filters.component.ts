import { Component, inject, Inject } from '@angular/core';
import { BackendService, Category, Product } from '../services/backend.service';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  backend = inject(BackendService)

  sort() {
    this.backend.sortingproducts();
  }

  categoriessorting() {
    this.backend.sortingcategories();
  }

  prices() {
    this.backend.sortprices();
  }
}
