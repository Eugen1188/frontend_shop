import { Component, OnInit, inject } from '@angular/core';
import { BackendService, Category, Product } from '../services/backend.service';
import { CommonModule } from '@angular/common';
import { ProduktPreviewComponentComponent } from '../produkt-preview-component/produkt-preview-component.component';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-produktliste',
  imports: [CommonModule, ProduktPreviewComponentComponent, FiltersComponent],
  templateUrl: './produktliste.component.html',
  styleUrl: './produktliste.component.scss',
})
export class ProduktlisteComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  private backendService = inject(BackendService);

  pageSize = 16;
  currentPage = 0;
  loadedProducts: Product[] = [];


  ngOnInit(): void {
    this.backendService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
    this.backendService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
      this.updateProducts();
    });
  }

    updateProducts() {
    const start = this.currentPage * this.pageSize;
    this.loadedProducts = this.products.slice(start, start + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.products.length) {
      this.currentPage++;
      this.updateProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateProducts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }
}
