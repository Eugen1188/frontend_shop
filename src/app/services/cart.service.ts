import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../environment/environment';

export interface OrderResponse {
  id: number;
  status: string;
}

export interface OrderItemResponse {
  id: number;
  product: any;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8000/api';
  private defaultOptions = { withCredentials: true };

  getOrCreateOrder(): Observable<OrderResponse> {
    const url = `${this.baseUrl}/orders/get_or_create/`;
    return this.http.get<OrderResponse>(url, this.defaultOptions).pipe(
      catchError(err => throwError(() => err))
    );
  }

  addToCart(productId: number, quantity: number = 1): Observable<OrderItemResponse> {
    return this.getOrCreateOrder().pipe(
      switchMap(order => {
        const payload = { product_id: productId, quantity };
        const url = `${this.baseUrl}/order-items/`;
        return this.http.post<OrderItemResponse>(url, payload, this.defaultOptions);
      }),
      catchError(err => throwError(() => err))
    );
  }

  getOrderItems(orderId: number): Observable<OrderItemResponse[]> {
    const url = `${this.baseUrl}/orders/${orderId}/items/`;
    return this.http.get<OrderItemResponse[]>(url, this.defaultOptions).pipe(
      catchError(err => throwError(() => err))
    );
  }

  updateItemQuantity(itemId: number, quantity: number): Observable<OrderItemResponse> {
    const url = `${this.baseUrl}/order-items/${itemId}/`;
    return this.http.patch<OrderItemResponse>(url, { quantity }, this.defaultOptions);
  }

  removeItem(itemId: number): Observable<void> {
    const url = `${this.baseUrl}/order-items/${itemId}/`;
    return this.http.delete<void>(url, this.defaultOptions);
  }
}
