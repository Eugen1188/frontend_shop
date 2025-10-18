import { Component, inject, Input } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input('user') profile: any; // <-- this makes `[user]` a valid input
  historyorders: any[] = []; // <-- use an array
  backend = inject(BackendService);
  constructor() {
    this.backend.getOrders().subscribe({
      next: (orders) => {
        this.backend.orders = orders.filter(
          (order) => order.user === this.profile.id
        );
        console.log(this.backend.orders);

        this.historyorders = this.backend.orders;
      },
      error: (err) => console.error('Failed to load orders:', err),
    });
  }
}
