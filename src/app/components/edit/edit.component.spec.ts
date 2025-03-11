import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let productServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['getProductById', 'updateProduct', 'notifyProductsUpdated']);
    activatedRouteMock = { snapshot: { paramMap: { get: () => '1' } } };

    productServiceMock.getProductById.and.returnValue({
      id: 1,
      title: 'Test Product',
      description: 'A product for testing',
      price: 100,
      category: { id: 1, name: 'Electronics' }
    });

    await TestBed.configureTestingModule({
      imports: [EditComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with product data', () => {
    expect(component.productForm.value).toEqual({
      title: 'Test Product',
      description: 'A product for testing',
      price: 100,
      category: 1
    });
  });

  it('should update product when form is valid', () => {
    spyOn(window, 'alert');

    component.productForm.setValue({
      title: 'Updated Product',
      description: 'An updated product',
      price: 200,
      category: 2
    });

    component.submitEdit();

    expect(productServiceMock.updateProduct).toHaveBeenCalled();
    expect(productServiceMock.notifyProductsUpdated).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Producto actualizado con éxito 🎉');
  });
});
 