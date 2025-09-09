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
  currentPage = 1;
  preaviousPage = 0;
  nextPage = 2;
  loadedProducts: Product[] = [];

  ngOnInit(): void {
    this.loadedproducts();
  }

  loadedproducts() {
    this.backendService.getCategories().subscribe((data) => {
      this.backendService.sortingproducts();
      this.categories = data;
      console.log(this.categories);
    });
    this.backendService.getProducts().subscribe((data) => {
      this.products = data;
      this.loadedProducts = this.products;
      console.log(this.products);
    });
    console.log(this.products);
  }

  changeSide(x: number) {
    this.currentPage = this.currentPage + x;
    this.preaviousPage = this.currentPage - 1;
    this.nextPage = this.currentPage + 1;
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }

  pagedProducts(): Product[] {
    return (this.loadedProducts = this.products.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    ));
  }
}
