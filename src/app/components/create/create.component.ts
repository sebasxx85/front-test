import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  productForm: FormGroup;

  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Toys' },
    { id: 5, name: 'Others' }
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

  submitProduct() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: Date.now(), //Usar timestamp como ID temporal ya que no usamos API
        ...this.productForm.value,
        category: this.categories.find(cat => cat.id === this.productForm.value.category) || { id: 0, name: 'Desconocido', image: '' }, // 🔹 Asignar objeto de categoría
        images: [] 
      };

      this.productService.addProduct(newProduct);

      setTimeout(() => {
        this.productService.notifyProductsUpdated(); 
        alert('Producto creado con éxito 🎉');
        this.router.navigate(['/home']); 
      }, 200);
    }
  }
}  