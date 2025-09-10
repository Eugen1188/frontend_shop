import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product, ProductImage } from '../services/backend.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();

  adding = false;
  selectedImage?: ProductImage;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    if (this.product?.images?.length) {
      this.selectedImage = this.product.images[0];
    }
  }

  changeColor(img: ProductImage) {
    this.selectedImage = img;
  }

  addToCart() {
    if (!this.product) return;

    this.adding = true;
    this.cartService.addToCart(this.product.id, 1).subscribe({
      next: (item) => {
        this.adding = false;
        console.log('Added to cart', item);
      },
      error: (err) => {
        this.adding = false;
        console.error('Add to cart failed', err);
      },
    });
  }

  onClose() {
    this.close.emit();
  }
}
