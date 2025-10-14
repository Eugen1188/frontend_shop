import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import {
  Product,
  ProductImage,
  BackendService,
} from '../services/backend.service';

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
  loading = false;
  similarProducts: Product[] = [];

  constructor(
    private cartService: CartService,
    private backendService: BackendService
  ) {}

  ngOnInit() {
    if (this.product?.images?.length) {
      this.selectedImage = this.product.images[0];
    }
    this.loadSimilarProducts();
  }

loadSimilarProducts() {
  const categoryId = this.product?.category_id;
  if (!categoryId) return;

  this.backendService.getProductsByCategory(categoryId).subscribe({
    next: (products) => {
      const others = products.filter((p) => p.id !== this.product.id);
      this.similarProducts = others
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    },
    error: (err) =>
      console.error('Fehler beim Laden ähnlicher Produkte', err),
  });
}


  changeColor(img: ProductImage) {
    this.selectedImage = img;
  }

  addToCart() {
    if (!this.product) return;

    this.loading = true;

    this.cartService
      .addToCart(this.product.id, 1, this.selectedImage?.color)
      .subscribe({
        next: (item) => {
          setTimeout(() => {
            this.adding = false;
            console.log('Added to cart', item);
            this.close.emit();
            const event = new CustomEvent('openBasket');
            window.dispatchEvent(event);
          }, 1000);
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
