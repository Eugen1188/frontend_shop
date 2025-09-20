import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';

export interface OrderResponse {
  id: number;
  status: string;
}

export interface OrderItemResponse {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    category?: string;
    images: { image: string; color: string; color_code: string }[];
  };
  quantity: number;
  color?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8000/api';
  private defaultOptions = { withCredentials: true };

  private cartQuantitySubject = new BehaviorSubject<number>(0);
  cartQuantity$ = this.cartQuantitySubject.asObservable();

  private updateCartQuantity(orderId: number) {
    this.getOrderItems(orderId).subscribe((items) => {
      const total = items.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );
      this.cartQuantitySubject.next(total);
    });
  }

  getOrCreateOrder(): Observable<OrderResponse> {
    const url = `${this.baseUrl}/orders/get_or_create/`;
    return this.http
      .get<OrderResponse>(url, this.defaultOptions)
      .pipe(catchError((err) => throwError(() => err)));
  }

  addToCart(
    productId: number,
    quantity: number = 1,
    color?: string,
    size?: string
  ): Observable<OrderItemResponse> {
    return this.getOrCreateOrder().pipe(
      switchMap((order) => {
        const payload: any = { product_id: productId, quantity };

        if (color) payload.color = color;
        if (size) payload.size = size;

        const url = `${this.baseUrl}/order-items/`;
        return this.http
          .post<OrderItemResponse>(url, payload, this.defaultOptions)
          .pipe(tap(() => this.updateCartQuantity(order.id)));
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getOrderItems(orderId: number): Observable<OrderItemResponse[]> {
    const url = `${this.baseUrl}/orders/${orderId}/items/`;
    return this.http
      .get<OrderItemResponse[]>(url, this.defaultOptions)
      .pipe(catchError((err) => throwError(() => err)));
  }

  updateItemQuantity(
    itemId: number,
    quantity: number
  ): Observable<OrderItemResponse> {
    return this.getOrCreateOrder().pipe(
      switchMap((order) => {
        const url = `${this.baseUrl}/order-items/${itemId}/`;
        return this.http
          .patch<OrderItemResponse>(url, { quantity }, this.defaultOptions)
          .pipe(tap(() => this.updateCartQuantity(order.id)));
      })
    );
  }

  removeItem(itemId: number): Observable<void> {
    return this.getOrCreateOrder().pipe(
      switchMap((order) => {
        const url = `${this.baseUrl}/order-items/${itemId}/`;
        return this.http
          .delete<void>(url, this.defaultOptions)
          .pipe(tap(() => this.updateCartQuantity(order.id)));
      })
    );
  }
}
