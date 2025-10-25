import { Injectable, Input, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category | null;
  category_name?: string;
  category_id?: number;
  images?: ProductImage[];
}

export interface Order {
  id: number;
  user: {
    id: number;
    username: string;
    email?: string; // optional, if your API returns it
  } | null; // because user can be null
  shippingAddress: string;
  created_at: string; // or number if you convert timestamp
  status: string;
  items: any[]; // array of order items
  totalprice: string;
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
  subcategories?: Category[]; // ✅ recursive relationship
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
  orders: Order[] = [];
  loadedProducts: Product[] = [];
  descending = true;
  search = '';
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/`);
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/order/`);
  }

  sortprices() {
    if (this.descending) {
      this.products.sort((b, a) => b.price - a.price);
    } else {
      this.products.sort((b, a) => a.price - b.price);
    }
    this.loadedProducts = this.products.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
    this.descending = !this.descending;
  }

  sortingcategories() {
    if (this.descending) {
      this.categories.sort((b, a) => a.name.localeCompare(b.name));
      console.log(this.categories);
    } else {
      this.categories.sort((b, a) => b.name.localeCompare(a.name));
      console.log(this.categories);
    }
    this.loadedProducts = this.products.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
    this.descending = !this.descending;
  }

  loadingproducts() {
    this.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.getProducts().subscribe((data) => {
      this.products = data;
      this.loadedProducts = this.products;
    });
  }

  loadorders() {
    this.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  sortingproducts() {
    if (this.descending) {
      this.products.sort((b, a) => a.name.localeCompare(b.name));
    } else {
      this.products.sort((b, a) => b.name.localeCompare(a.name));
    }
    this.loadedProducts = this.products.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
    this.descending = !this.descending;
  }

  // getProductById(id: number): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiUrl}/categories/${id}/`);
  // }

  // createProduct(product: Product): Observable<Product> {
  //   return this.http.post<Product>(`${this.apiUrl}/categories/`, product);
  // }

  pageSize = 16;
  currentPage = 1;
  preaviousPage = 0;
  nextPage = 2;

  ngOnInit(): void {
    this.loadedproducts();
  }

  loadedproducts() {
    this.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.getProducts().subscribe((data) => {
      this.products = data;
      this.loadedProducts = this.products.slice(0, this.pageSize); // initial page
    });
  }

  changeSide(x: number) {
    this.currentPage = this.currentPage + x;
    this.preaviousPage = this.currentPage - 1;
    this.nextPage = this.currentPage + 1;
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }

  pagedProducts(): Product[] {
    return (this.loadedProducts = this.products.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    ));
  }

  searchingproducts(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search = input.value.trim();

    if (this.search === '') {
      // If search box is empty, show all products (current page)
      this.loadedProducts = this.products.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    } else {
      // Filter products by name as the user types
      const filtered = this.products.filter((product) => {
        // Convert the search term to lowercase
        const searchTerm = this.search.toLowerCase();

        // Check all properties of the product
        return Object.values(product).some((value) => {
          if (value == null) return false; // skip null/undefined
          return value.toString().toLowerCase().includes(searchTerm);
        });
      });

      // Show only the filtered products (optional: apply pagination)
      this.loadedProducts = filtered;
    }

    console.log('Displayed products:', this.loadedProducts);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/products/?category=${categoryId}`
    );
  }
}
