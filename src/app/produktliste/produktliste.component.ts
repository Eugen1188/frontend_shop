import { Component, OnInit, inject } from '@angular/core';
import { BackendService, Category, Product } from '../services/backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produktliste',
  imports: [CommonModule],
  templateUrl: './produktliste.component.html',
  styleUrl: './produktliste.component.scss',
})
export class ProduktlisteComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  private backendService = inject(BackendService);

  ngOnInit(): void {
    this.backendService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
      this.backendService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
  }
}
