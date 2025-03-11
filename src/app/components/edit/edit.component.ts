import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,

  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  productForm: FormGroup;
  productId!: number;
  product!: Product;

  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Toys' }
  ];

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')); 
    const foundProduct = this.productService.getProductById(this.productId);
    
    if (foundProduct) {
      this.product = foundProduct;
      this.productForm.patchValue(this.product);
    }
  }
  
  submitEdit() {
    if (this.productForm.valid) {
      //Modificar el producto en memoria (NO en la API)
      this.productService.updateProduct(this.productId, this.productForm.value);
      alert('Producto actualizado con éxito 🎉');
      this.router.navigate(['/home']);
    }
  }
}
