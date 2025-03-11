import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ Simula peticiones HTTP
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ✅ Verifica que no haya peticiones sin manejar
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from API', () => {
    const dummyProducts: Product[] = [
      { id: 1, title: 'Test 1', price: 100, description: 'Desc 1', category: { id: 1, name: 'Category 1', image: '' }, images: [] },
      { id: 2, title: 'Test 2', price: 200, description: 'Desc 2', category: { id: 2, name: 'Category 2', image: '' }, images: [] },
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(`${environment.apiBaseURL}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should handle error when fetching products fails', () => {
    service.getProducts().subscribe(
      () => fail('Expected an error, but got products'),
      error => {
        expect(error.message).toBe('No se pudieron obtener los productos');
      }
    );

    const req = httpMock.expectOne(`${environment.apiBaseURL}/products`);
    req.error(new ErrorEvent('Network error'));
  });

  it('should update a product and notify changes', () => {
    const dummyProducts: Product[] = [
      { id: 1, title: 'Old Title', price: 100, description: 'Desc 1', category: { id: 1, name: 'Electronics', image: '' }, images: [] }
    ];
    service.setProducts(dummyProducts);

    service.updateProduct(1, { title: 'Updated Title' });

    const updatedProduct = service.getProductById(1);
    expect(updatedProduct?.title).toBe('Updated Title');
  });

  it('should add a product to memory and notify changes', () => {
    const newProduct: Product = { id: 3, title: 'New Product', price: 300, description: 'Desc 3', category: { id: 3, name: 'Clothing', image: '' }, images: [] };
    service.addProduct(newProduct);

    const products = service.getProductsFromMemory();
    expect(products.length).toBe(1);
    expect(products[0]).toEqual(newProduct);
  });

  it('should delete a product from memory and notify changes', () => {
    const dummyProducts: Product[] = [
      { id: 1, title: 'Test 1', price: 100, description: 'Desc 1', category: { id: 1, name: 'Electronics', image: '' }, images: [] },
      { id: 2, title: 'Test 2', price: 200, description: 'Desc 2', category: { id: 2, name: 'Furniture', image: '' }, images: [] }
    ];
    service.setProducts(dummyProducts);

    service.deleteProduct(1);
    const products = service.getProductsFromMemory();
    expect(products.length).toBe(1);
    expect(products[0].id).toBe(2);
  });

  it('should return undefined for non-existent product', () => {
    const product = service.getProductById(999); // ID inexistente
    expect(product).toBeUndefined();
  });
});
