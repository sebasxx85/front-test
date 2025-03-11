import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';

//Importar módulos de Angular Material correctamente
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

// Pipe para truncar texto
import { TruncatePipe } from '../../pipes/truncate.pipe';

import { StatusComponent } from '../../components/status/status.component';
import { Router } from '@angular/router';
import { StatusColor } from '../../components/status/status-color';
import { StatusColorPipe } from "../../components/status/status-color.pipe";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    //LayoutComponent,
    SideMenuComponent,
    //ProductListComponent,
    //ProductTableComponent,
    StatusComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    TruncatePipe,
    StatusColorPipe
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: Product[] = [];
  terminoBusqueda: string = '';
  productosFiltrados: Product[] = [];
  inicio: number = 0;
  itemsPorPagina: number = 4; // Cantidad de tarjetas visibles

  constructor(
    private productService: ProductService,
    private loading: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Verificar si hay productos en memoria antes de llamar a la API
    const cachedProducts = this.productService.getProductsFromMemory();
  
    if (cachedProducts.length > 0) {
      console.log('Cargando productos desde memoria...');
      this.products = cachedProducts;
      this.productosFiltrados = [...this.products];
    } else {
      console.log('Cargando productos desde la API...');
      this.productService.getProducts().subscribe({
        next: (data: Product[]) => {
          this.productService.setProducts(data); // Guardar en memoria
          this.products = this.productService.getProductsFromMemory();
          this.productosFiltrados = [...this.products];
        },
        error: (err) => console.error('Error al obtener productos:', err),
      });
    }
  
    this.productService.getProductsUpdatedListener().subscribe(updatedProducts => {
      this.products = updatedProducts;
      this.productosFiltrados = [...this.products];
    });
  }
  
  

  siguiente(): void {
    if (this.inicio + this.itemsPorPagina < this.productosFiltrados.length) {
      this.inicio += this.itemsPorPagina;
    }
  }

  anterior(): void {
    if (this.inicio > 0) {
      this.inicio -= this.itemsPorPagina;
    }
  }

  filtrarProductos(termino: string): void {
    this.inicio = 0; // Reiniciar índice al filtrar
    this.productosFiltrados = this.products.filter(product =>
      product.category.name.toLowerCase().includes(termino.toLowerCase())
    );
  }

  editarProducto(product: Product) {
   // console.log('Editar producto:', product);
    this.router.navigate(['/edit', product.id]);
    
  }
  
  eliminarProducto(product: Product) {
    if (confirm(`¿Seguro que deseas eliminar "${product.title}"?`)) {
      this.productService.deleteProduct(product.id); //Eliminar en memoria
      this.productService.notifyProductsUpdated(); 
    }
  }

  getPriceStatusColor(price: number): StatusColor {
    if (price > 0 && price < 100) {
      return StatusColor.success; // Verde (Barato)
    } else if (price >= 101 && price < 500) {
      return StatusColor.warning;  //Amarillo (Medio)
    } else if (price >= 501) {
      return StatusColor.error; //Rojo (Caro)
    } else {
      return StatusColor.secondary; //Default (Si el precio es 0 o inválido)
    }
  }
  
}


