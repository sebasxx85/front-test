import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { SideMenuComponent } from '../side-menu/side-menu.component';

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

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  submitProduct() {
    if (this.productForm.valid) {
      console.log('Producto Creado:', this.productForm.value);
      alert('Producto creado con éxito 🎉');
      this.productForm.reset(); // Reinicia el formulario después de enviar
    }
  }
}