import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { SharedService } from '../shared.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { BasketComponent } from "../basket/basket.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, SearchbarComponent, CommonModule, BasketComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  show = inject(SharedService);
  private cartService = inject(CartService);
  cartQuantity: number = 0;
  basketVisible: boolean = false;
  isLoggedIn(): boolean {
  return !!localStorage.getItem('access_token');
}

  ngOnInit(): void {
    this.cartService.cartQuantity$.subscribe(quantity => {
      this.cartQuantity = quantity;
    });
    this.cartService.getOrCreateOrder().subscribe(order => {
      this.cartService['updateCartQuantity'](order.id);
    });
  }

  toggleBasket() {
    this.basketVisible = !this.basketVisible;
  }

  open() {
    this.show.show = true;
  }
}
