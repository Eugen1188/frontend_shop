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
  categories: Category[] = [];
  products: Product[] = [];
  loadedProducts: Product[] = [];

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/`);
  }

  sortprices(): void {
    // 1. Subscribe to the getProducts() Observable
    this.getProducts().subscribe((products: Product[]) => {
      // 2. This code runs only AFTER the data arrives
      this.products = products; // Assign the fetched products to the service's array
      this.products.sort((a, b) => a.price - b.price); // Now you can sort the populated array
      this.products.forEach((product) => console.log(product.price));
      console.log(this.products);
    });
  }

  loadingproducts() {
    this.getCategories().subscribe((data) => {
      this.sortingproducts();
      this.categories = data;
      console.log(this.categories);
    });
    this.getProducts().subscribe((data) => {
      this.products = data;
      this.loadedProducts = this.products;
      console.log(this.products);
    });
    console.log(this.products);
  }

  sortingproducts() {
    this.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.products.sort((a, b) => a.name.localeCompare(b.name));
      this.products.forEach((product) => console.log(product.name));
    });
  }

  // getProductById(id: number): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiUrl}/categories/${id}/`);
  // }

  // createProduct(product: Product): Observable<Product> {
  //   return this.http.post<Product>(`${this.apiUrl}/categories/`, product);
  // }
}
