import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let productServiceMock: any;

  beforeEach(async () => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['addProduct', 'notifyProductsUpdated']);

    await TestBed.configureTestingModule({
      imports: [CreateComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: ProductService, useValue: productServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly', () => {
    expect(component.productForm.value).toEqual({
      title: '',
      description: '',
      price: '',
      category: ''
    });
  });

  it('should add product when form is valid', fakeAsync(() => {
    spyOn(window, 'alert'); // Mock para evitar alert en el test

    component.productForm.setValue({
      title: 'Test Product',
      description: 'A great product for testing',
      price: 100,
      category: 1
    });

    component.submitProduct();

    expect(productServiceMock.addProduct).toHaveBeenCalled();

    // Avanza el tiempo para que el setTimeout se ejecute
    tick(200);

    expect(productServiceMock.notifyProductsUpdated).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Producto creado con éxito 🎉');
  }));
});
