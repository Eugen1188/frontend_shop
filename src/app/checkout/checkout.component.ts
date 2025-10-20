import { Component, OnInit } from '@angular/core';
import { CartService, OrderItemResponse } from '../services/cart.service';
import { ProfileService } from '../profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type PaymentMethod = 'paypal' | 'creditcard' | 'googlepay' | 'applepay';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  orderItems: OrderItemResponse[] = [];
  orderId: number | null = null;
  totalPrice: number = 0;

  shippingAddress = {
    name: '',
    address: '',
    city: '',
    zip_code: ''
  };

  paymentMethod: PaymentMethod = 'paypal';

  constructor(
    private cartService: CartService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.cartService.getOrCreateOrder().subscribe(order => {
      this.orderId = order.id;
      this.loadOrderItems();
    });
  }

  loadUserData() {
    this.profileService.getProfile().subscribe({
      next: (user) => {
        this.shippingAddress.name = `${user.first_name} ${user.last_name}`;
        this.shippingAddress.address = user.address || '';
        this.shippingAddress.city = user.city || '';
        this.shippingAddress.zip_code = user.zip_code || '';
      },
      error: (err) => {
        console.log('User not logged in or error fetching profile', err);
      }
    });
  }

  loadOrderItems() {
    if (!this.orderId) return;
    this.cartService.getOrderItems(this.orderId).subscribe(items => {
      this.orderItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.orderItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  placeOrder() {
    if (!this.shippingAddress.name || !this.shippingAddress.address) {
      alert('Bitte füllen Sie alle Adressfelder aus.');
      return;
    }

    console.log('Bestellung:', {
      orderItems: this.orderItems,
      shippingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod
    });

    alert(`Bestellung erfolgreich mit ${this.paymentMethod}!`);
    this.router.navigate(['/products']);
  }
}
