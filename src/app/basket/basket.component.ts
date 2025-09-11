import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CartService, OrderItemResponse } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnChanges {
  orderItems: OrderItemResponse[] = [];
  orderId: number | null = null;

  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<void>();
  
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.initCart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.loadCart();
    }
  }

  private initCart(): void {
    this.cartService.getOrCreateOrder().subscribe(order => {
      this.orderId = order.id;
    });
  }

  loadCart(): void {
    if (!this.orderId) return;
    this.cartService.getOrderItems(this.orderId).subscribe(items => {
      this.orderItems = items;
    });
  }

  close() {
    this.closed.emit();
  }

  increaseQuantity(item: OrderItemResponse) {
    if (!this.orderId) return;
    const newQuantity = item.quantity + 1;
    this.cartService.updateItemQuantity(item.id, newQuantity).subscribe(updated => {
      item.quantity = updated.quantity;
    });
  }

  decreaseQuantity(item: OrderItemResponse) {
    if (!this.orderId || item.quantity <= 1) return;
    const newQuantity = item.quantity - 1;
    this.cartService.updateItemQuantity(item.id, newQuantity).subscribe(updated => {
      item.quantity = updated.quantity;
    });
  }

  removeItem(itemId: number) {
    this.cartService.removeItem(itemId).subscribe(() => {
      this.orderItems = this.orderItems.filter(i => i.id !== itemId);
    });
  }
}
