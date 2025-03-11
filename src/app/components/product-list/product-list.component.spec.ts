import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, CommonModule], // Agrega el módulo común
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input products', () => {
    const mockProducts: Product[] = [
      { id: 1, title: 'Producto 1', description: 'Desc 1', price: 100, category: { id: 1, name: 'Category 1', image: '' }, images: [] },
      { id: 2, title: 'Producto 2', description: 'Desc 2', price: 200, category: { id: 2, name: 'Category 2', image: '' }, images: [] },
    ];

    component.products = mockProducts;
    fixture.detectChanges();

    expect(component.products.length).toBe(2);
  });
});
