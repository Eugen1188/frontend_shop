import { Component, inject, Injectable } from '@angular/core';
import { BackendService, Category, Product } from '../services/backend.service';
import { CommonModule } from '@angular/common';
import { ProduktPreviewComponentComponent } from '../produkt-preview-component/produkt-preview-component.component';
import { FiltersComponent } from '../filters/filters.component';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-produktliste',
  imports: [CommonModule, ProduktPreviewComponentComponent, FiltersComponent],
  templateUrl: './produktliste.component.html',
  styleUrl: './produktliste.component.scss',
})
export class ProduktlisteComponent {
  backend: BackendService = inject(BackendService);
  products: Product[] = [];
  categories: Category[] = [];
  count = 1;
  ngOnInit() {
    this.backend.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
    this.backend.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
    this.backend.loadingproducts();
  }
}
