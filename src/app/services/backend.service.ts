import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category | null;
  images?: ProductImage[];
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
}

export interface ProductImage {
  id: number;
  image: string;
  color?: string;
  color_code?: string;
}

@Injectable({
  providedIn: 'root',
})

export class BackendService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/`);
  }

    getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/`);
  }

  // getProductById(id: number): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiUrl}/categories/${id}/`);
  // }

  // createProduct(product: Product): Observable<Product> {
  //   return this.http.post<Product>(`${this.apiUrl}/categories/`, product);
  // }
}
