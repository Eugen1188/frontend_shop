import { Component, Input } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CommonModule } from '@angular/common';
import { Category, Product } from '../services/backend.service';

@Component({
  selector: 'app-produkt-preview-component',
  imports: [ProductDetailsComponent, CommonModule],
  templateUrl: './produkt-preview-component.component.html',
  styleUrl: './produkt-preview-component.component.scss',
})
export class ProduktPreviewComponentComponent {
  @Input() product!: Product;
  @Input() category!: Category; // this comes from the outer *ngFor

  detailsVisible = false;

  openDetails() {
    this.detailsVisible = true;
  }

  closeDetails() {
    this.detailsVisible = false;
  }
}
