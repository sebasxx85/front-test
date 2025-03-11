import { TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';

describe('EditComponent', () => {
  let component: EditComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule], // ✅ Agregado HttpClientTestingModule
      providers: [
        ProductService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }, // ✅ Mock de ActivatedRoute
        },
      ],
    }).compileComponents();

    component = TestBed.createComponent(EditComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
