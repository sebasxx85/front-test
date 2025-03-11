import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = `${environment.apiBaseURL}/products`;
  private products: Product[] = []; //
  private productsUpdated = new BehaviorSubject<Product[]>([]); 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return throwError(() => new Error('No se pudieron obtener los productos'));
      })
    );
  }
  
  setProducts(products: Product[]) {
    this.products = products;
    this.productsUpdated.next([...this.products]);
  }

  getProductsFromMemory(): Product[] {
    return this.products.length > 0 ? this.products : [];
  }

  getProductsUpdatedListener(): Observable<Product[]> {
    return this.productsUpdated.asObservable();
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  updateProduct(id: number, updatedProduct: Partial<Product>) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.productsUpdated.next([...this.products]);
    }
  }

  notifyProductsUpdated() {
    this.productsUpdated.next([...this.products]);
  }

}