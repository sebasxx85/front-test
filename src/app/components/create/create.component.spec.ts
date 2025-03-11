import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../services/product.service';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let productServiceMock: any;

  beforeEach(async () => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['addProduct', 'notifyProductsUpdated']);

    await TestBed.configureTestingModule({
      imports: [CreateComponent, ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: ProductService, useValue: productServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
