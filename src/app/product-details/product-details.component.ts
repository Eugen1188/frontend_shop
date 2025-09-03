import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Product } from '../services/backend.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  @Input() product!: Product;

  @Output() close = new EventEmitter<void>();
}
