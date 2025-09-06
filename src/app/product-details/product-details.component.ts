import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Product, ProductImage } from '../services/backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();

  selectedImage?: ProductImage;

   ngOnInit() {
    if (this.product?.images?.length) {
      this.selectedImage = this.product.images[0];
    }
  }

  changeColor(img: ProductImage) {
    this.selectedImage = img;
  }
}
