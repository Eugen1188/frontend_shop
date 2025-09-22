import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { CartService, OrderItemResponse } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnChanges, OnDestroy {
  orderItems: OrderItemResponse[] = [];
  orderId: number | null = null;

  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();

  private openBasketListener = () => {
    this.visible = true;
    this.loadCart();
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.initCart();
    window.addEventListener('openBasket', this.openBasketListener);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.loadCart();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('openBasket', this.openBasketListener);
  }

  private initCart(): void {
    this.cartService.getOrCreateOrder().subscribe((order) => {
      this.orderId = order.id;
    });
  }

  loadCart(): void {
    if (!this.orderId) return;
    this.cartService.getOrderItems(this.orderId).subscribe((items) => {
      this.orderItems = items;
    });
  }

  close() {
    this.visible = false;
    this.closed.emit();
  }

  increaseQuantity(item: OrderItemResponse) {
    if (!this.orderId) return;
    const newQuantity = item.quantity + 1;
    this.cartService
      .updateItemQuantity(item.id, newQuantity)
      .subscribe((updated) => {
        item.quantity = updated.quantity;
      });
  }

  decreaseQuantity(item: OrderItemResponse) {
    if (!this.orderId || item.quantity <= 1) return;
    const newQuantity = item.quantity - 1;
    this.cartService
      .updateItemQuantity(item.id, newQuantity)
      .subscribe((updated) => {
        item.quantity = updated.quantity;
      });
  }

  removeItem(itemId: number) {
    this.cartService.removeItem(itemId).subscribe(() => {
      this.orderItems = this.orderItems.filter((i) => i.id !== itemId);
    });
  }

  getImageForColor(item: OrderItemResponse): string {
    if (!item.product.images) return '';
    const img = item.product.images.find((i: any) => i.color === item.color);
    return img
      ? 'http://localhost:8000' + img.image
      : 'http://localhost:8000' + item.product.images[0].image;
  }
}
