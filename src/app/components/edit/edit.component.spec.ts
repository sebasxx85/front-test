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

  beforeEach(async () => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['getProductById', 'updateProduct', 'notifyProductsUpdated']);

    // Mock para getProductById (simula que devuelve un producto)
    productServiceMock.getProductById.and.returnValue({
      id: 1,
      title: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: { id: 1, name: 'Electronics' },
    });

    await TestBed.configureTestingModule({
      imports: [EditComponent, ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
