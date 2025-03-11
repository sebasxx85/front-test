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

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')); 
    const foundProduct = this.productService.getProductById(this.productId);
    
    if (foundProduct) {
      this.product = foundProduct;
  
      const categoryId = this.categories.find(cat => cat.name === this.product.category.name)?.id || '';
  
    
      this.productForm.patchValue({
        title: this.product.title,
        description: this.product.description,
        price: this.product.price,
        category: categoryId  //Asignar el ID de la categoría en lugar del objeto completo
      });
    }
  }
  
  
  submitEdit() {
    if (this.productForm.valid) {
      const updatedProduct = this.productForm.value;
  
      //Buscar el objeto de categoría completo basado en el ID seleccionado
      const selectedCategory = this.categories.find(cat => cat.id === updatedProduct.category);
  
      if (selectedCategory) {
        updatedProduct.category = selectedCategory; 
      }
  
      this.productService.updateProduct(this.productId, updatedProduct);
  
      setTimeout(() => {
        this.productService.notifyProductsUpdated();
        alert('Producto actualizado con éxito 🎉');
        this.router.navigate(['/home']);
      }, 2000);
    }
  }
  
  
  
}
