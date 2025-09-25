import { Component, inject } from '@angular/core';
import { ProduktPreviewComponentComponent } from "../produkt-preview-component/produkt-preview-component.component";
import { BackendService, Category, Product } from '../services/backend.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-hero',
  imports: [ProduktPreviewComponentComponent, CommonModule, RouterLink],
  templateUrl: './landing-hero.component.html',
  styleUrl: './landing-hero.component.scss'
})
export class LandingHeroComponent {
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
