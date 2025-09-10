import { Component, OnInit } from '@angular/core';
import { CartService, OrderItemResponse } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  orderItems: OrderItemResponse[] = [];
  orderId: number | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getOrCreateOrder().subscribe(order => {
      this.orderId = order.id;
      this.cartService.getOrderItems(this.orderId!).subscribe(items => {
        this.orderItems = items; // Array direkt verwenden
      });
    });
  }
}
